import { describe, expect, it } from 'vitest';
import { isDifficult, isDue, masteryScore, newCardState, nextState } from './srs';
import type { SrsState } from '../types';

describe('newCardState', () => {
  it('starts with zero reps, default ease, and an immediate due date', () => {
    const state = newCardState();
    expect(state.reps).toBe(0);
    expect(state.interval).toBe(0);
    expect(state.ease).toBe(2.5);
    expect(isDue(state)).toBe(true);
  });
});

describe('isDue', () => {
  it('treats an undefined state as due (new card)', () => {
    expect(isDue(undefined)).toBe(true);
  });

  it('is due once the due date has passed', () => {
    const past: SrsState = { interval: 1, ease: 2.5, reps: 1, dueDate: new Date(Date.now() - 1000).toISOString() };
    expect(isDue(past)).toBe(true);
  });

  it('is not due while the due date is in the future', () => {
    const future: SrsState = { interval: 3, ease: 2.5, reps: 2, dueDate: new Date(Date.now() + 86400000).toISOString() };
    expect(isDue(future)).toBe(false);
  });
});

describe('nextState', () => {
  it('grading a new card "good" sets reps=1 and a 1-day interval', () => {
    const result = nextState(undefined, 'good');
    expect(result.reps).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.ease).toBe(2.5);
  });

  it('grading "good" twice in a row sets a 3-day interval on the second rep', () => {
    const first = nextState(undefined, 'good');
    const second = nextState(first, 'good');
    expect(second.reps).toBe(2);
    expect(second.interval).toBe(3);
  });

  it('grading "good" a third time multiplies interval by ease', () => {
    const first = nextState(undefined, 'good');
    const second = nextState(first, 'good');
    const third = nextState(second, 'good');
    expect(third.reps).toBe(3);
    expect(third.interval).toBe(Math.round(second.interval * second.ease));
  });

  it('grading "again" resets reps and interval to 0 and lowers ease', () => {
    const learned: SrsState = { interval: 6, ease: 2.5, reps: 3, dueDate: new Date().toISOString() };
    const result = nextState(learned, 'again');
    expect(result.reps).toBe(0);
    expect(result.interval).toBe(0);
    expect(result.ease).toBe(2.3);
  });

  it('never lowers ease below the 1.3 floor', () => {
    const brittle: SrsState = { interval: 1, ease: 1.35, reps: 1, dueDate: new Date().toISOString() };
    const result = nextState(brittle, 'again');
    expect(result.ease).toBe(1.3);
  });

  it('"hard" increases reps but lowers ease less than "again"', () => {
    const card: SrsState = { interval: 3, ease: 2.5, reps: 2, dueDate: new Date().toISOString() };
    const result = nextState(card, 'hard');
    expect(result.reps).toBe(3);
    expect(result.ease).toBe(2.35);
  });

  it('"easy" increases ease', () => {
    const card: SrsState = { interval: 3, ease: 2.5, reps: 2, dueDate: new Date().toISOString() };
    const result = nextState(card, 'easy');
    expect(result.ease).toBeCloseTo(2.65);
  });

  it('preserves the isFavorite flag across grading', () => {
    const favorite: SrsState = { interval: 1, ease: 2.5, reps: 1, dueDate: new Date().toISOString(), isFavorite: true };
    const result = nextState(favorite, 'good');
    expect(result.isFavorite).toBe(true);
  });
});

describe('masteryScore', () => {
  it('is 0 for an undefined state', () => {
    expect(masteryScore(undefined)).toBe(0);
  });

  it('is 0 for a brand-new card', () => {
    expect(masteryScore(newCardState())).toBe(0);
  });

  it('clamps at 100 for a well-reviewed card', () => {
    const mastered: SrsState = { interval: 200, ease: 2.5, reps: 50, dueDate: new Date().toISOString() };
    expect(masteryScore(mastered)).toBe(100);
  });

  it('increases with more reps and longer interval', () => {
    const early: SrsState = { interval: 1, ease: 2.5, reps: 1, dueDate: new Date().toISOString() };
    const later: SrsState = { interval: 10, ease: 2.5, reps: 4, dueDate: new Date().toISOString() };
    expect(masteryScore(later)).toBeGreaterThan(masteryScore(early));
  });
});

describe('isDifficult', () => {
  it('is false for an undefined state', () => {
    expect(isDifficult(undefined)).toBe(false);
  });

  it('is false for a never-reviewed card', () => {
    expect(isDifficult(newCardState())).toBe(false);
  });

  it('is true once ease has dropped to the 2.0 threshold after review', () => {
    const struggling: SrsState = { interval: 0, ease: 2.0, reps: 3, dueDate: new Date().toISOString() };
    expect(isDifficult(struggling)).toBe(true);
  });

  it('is false when ease is still above the threshold', () => {
    const fine: SrsState = { interval: 3, ease: 2.4, reps: 2, dueDate: new Date().toISOString() };
    expect(isDifficult(fine)).toBe(false);
  });
});
