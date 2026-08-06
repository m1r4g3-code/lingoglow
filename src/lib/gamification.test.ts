import { beforeEach, describe, expect, it } from 'vitest';
import { awardReviewXp, currentPeriodKey, levelForXp, xpForGrade } from './gamification';
import { getEarnedBadges, getMissionState, getUserProgress, setUserProgress } from './storage';
import type { UserProgress } from '../types';

// Mirrors gamification.ts's private dailyKey() so tests can construct
// "yesterday"/"two days ago" progress snapshots without exporting internals.
function dailyKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  coins: 0,
  level: 1,
  streakCurrent: 0,
  streakLongest: 0,
  lastStudyDate: null,
  totalReviews: 0,
};

describe('xpForGrade / levelForXp', () => {
  it('awards more XP for easier recall', () => {
    expect(xpForGrade('again')).toBeLessThan(xpForGrade('hard'));
    expect(xpForGrade('hard')).toBeLessThan(xpForGrade('good'));
    expect(xpForGrade('good')).toBeLessThan(xpForGrade('easy'));
  });

  it('levels up every 100 XP', () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(99)).toBe(1);
    expect(levelForXp(100)).toBe(2);
    expect(levelForXp(250)).toBe(3);
  });
});

describe('currentPeriodKey', () => {
  it('formats a daily key as YYYY-MM-DD', () => {
    expect(currentPeriodKey('daily')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('formats a weekly key as YYYY-Wnn', () => {
    expect(currentPeriodKey('weekly')).toMatch(/^\d{4}-W\d{2}$/);
  });
});

describe('awardReviewXp', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('is a no-op for guests (no userId)', () => {
    expect(awardReviewXp(null, 'good')).toEqual([]);
    expect(getUserProgress()).toEqual(DEFAULT_PROGRESS);
  });

  it('awards XP and starts a 1-day streak on the first review of the day', () => {
    const events = awardReviewXp('user-1', 'good');
    expect(events).toContainEqual({ type: 'xp', message: '+5 XP' });

    const progress = getUserProgress();
    expect(progress.xp).toBe(5);
    expect(progress.totalReviews).toBe(1);
    expect(progress.streakCurrent).toBe(1);
    expect(progress.streakLongest).toBe(1);
  });

  it('unlocks the first-review badge immediately', () => {
    const events = awardReviewXp('user-1', 'good');
    expect(events.some((e) => e.type === 'badge' && e.message.includes('First Steps'))).toBe(true);
    expect(getEarnedBadges()).toContain('first-steps');
  });

  it('fires a levelup event when a review crosses a 100-XP boundary', () => {
    setUserProgress({ ...DEFAULT_PROGRESS, xp: 95 });
    const events = awardReviewXp('user-1', 'easy'); // +8 XP -> 103
    expect(events).toContainEqual({ type: 'levelup', message: 'Level 2!' });
    expect(getUserProgress().level).toBe(2);
  });

  it('does not fire a levelup event when staying within the same level', () => {
    setUserProgress({ ...DEFAULT_PROGRESS, xp: 10 });
    const events = awardReviewXp('user-1', 'good'); // +5 XP -> 15
    expect(events.some((e) => e.type === 'levelup')).toBe(false);
  });

  it('continues the streak on consecutive days', () => {
    const yesterday = dailyKey(new Date(Date.now() - 86400000));
    setUserProgress({ ...DEFAULT_PROGRESS, streakCurrent: 2, streakLongest: 2, lastStudyDate: yesterday });
    awardReviewXp('user-1', 'good');
    const progress = getUserProgress();
    expect(progress.streakCurrent).toBe(3);
    expect(progress.streakLongest).toBe(3);
  });

  it('resets the streak after a missed day', () => {
    const twoDaysAgo = dailyKey(new Date(Date.now() - 2 * 86400000));
    setUserProgress({ ...DEFAULT_PROGRESS, streakCurrent: 5, streakLongest: 5, lastStudyDate: twoDaysAgo });
    awardReviewXp('user-1', 'good');
    const progress = getUserProgress();
    expect(progress.streakCurrent).toBe(1);
    expect(progress.streakLongest).toBe(5); // longest is a high-water mark, unaffected by a reset
  });

  it('does not double-count the streak for a second review on the same day', () => {
    awardReviewXp('user-1', 'good');
    awardReviewXp('user-1', 'good');
    expect(getUserProgress().streakCurrent).toBe(1);
  });

  it('completes a review-count mission once its target is reached', () => {
    for (let i = 0; i < 10; i++) awardReviewXp('user-1', 'good');
    const mission = getMissionState('daily-reviews-10');
    expect(mission?.completedAt).not.toBeNull();
    expect(mission?.progress).toBeGreaterThanOrEqual(10);
  });

  it('does not re-complete (or re-award) an already-completed mission', () => {
    for (let i = 0; i < 10; i++) awardReviewXp('user-1', 'good');
    const xpAfterCompletion = getUserProgress().xp;
    const events = awardReviewXp('user-1', 'good');
    expect(events.some((e) => e.type === 'mission' && e.message.includes('Warm Up'))).toBe(false);
    expect(getUserProgress().xp).toBe(xpAfterCompletion + xpForGrade('good'));
  });
});
