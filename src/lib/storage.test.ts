import { beforeEach, describe, expect, it, vi } from 'vitest';

const { fromMock } = vi.hoisted(() => ({ fromMock: vi.fn() }));
vi.mock('./supabaseClient', () => ({ supabase: { from: fromMock } }));

import {
  addEarnedBadge,
  claimLocalProgress,
  getAllCardStates,
  getCardState,
  getEarnedBadges,
  getMissionState,
  getTheme,
  getUserProgress,
  hasLocalProgress,
  hydrateFromSupabase,
  setCardState,
  setMissionState,
  setSyncErrorHandler,
  setSyncUserId,
  setTheme,
  setUserProgress,
  subscribeProgress,
  toggleFavorite,
} from './storage';
import type { SrsState, UserProgress } from '../types';

const CARD: SrsState = { interval: 3, ease: 2.5, reps: 2, dueDate: new Date().toISOString(), isFavorite: false };

describe('storage (guest, no Supabase sync)', () => {
  beforeEach(() => {
    localStorage.clear();
    setSyncUserId(null);
    fromMock.mockClear();
  });

  it('round-trips SRS card state through localStorage', () => {
    expect(getCardState('card-1')).toBeUndefined();
    setCardState('card-1', CARD);
    expect(getCardState('card-1')).toEqual(CARD);
  });

  it('does not touch Supabase when no user is signed in', () => {
    setCardState('card-1', CARD);
    expect(fromMock).not.toHaveBeenCalled();
  });

  it('toggleFavorite flips the flag, creating a fresh card state if none exists', () => {
    const toggled = toggleFavorite('new-card');
    expect(toggled.isFavorite).toBe(true);
    expect(toggled.reps).toBe(0); // came from newCardState(), not a stale card

    const toggledBack = toggleFavorite('new-card');
    expect(toggledBack.isFavorite).toBe(false);
  });

  it('hasLocalProgress reflects whether any card state has been saved', () => {
    expect(hasLocalProgress()).toBe(false);
    setCardState('card-1', CARD);
    expect(hasLocalProgress()).toBe(true);
  });

  it('getAllCardStates returns every saved card keyed by id', () => {
    setCardState('card-1', CARD);
    setCardState('card-2', { ...CARD, reps: 5 });
    const all = getAllCardStates();
    expect(Object.keys(all).sort()).toEqual(['card-1', 'card-2']);
  });

  it('getUserProgress returns sensible defaults when nothing is stored', () => {
    expect(getUserProgress()).toEqual({
      xp: 0,
      coins: 0,
      level: 1,
      streakCurrent: 0,
      streakLongest: 0,
      lastStudyDate: null,
      totalReviews: 0,
    });
  });

  it('setUserProgress persists and round-trips', () => {
    const progress: UserProgress = {
      xp: 42,
      coins: 3,
      level: 1,
      streakCurrent: 1,
      streakLongest: 1,
      lastStudyDate: '2026-01-01',
      totalReviews: 4,
    };
    setUserProgress(progress);
    expect(getUserProgress()).toEqual(progress);
  });

  it('setUserProgress notifies subscribed listeners', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeProgress(listener);
    setUserProgress({ xp: 1, coins: 0, level: 1, streakCurrent: 0, streakLongest: 0, lastStudyDate: null, totalReviews: 0 });
    expect(listener).toHaveBeenCalledOnce();
    unsubscribe();
    setUserProgress({ xp: 2, coins: 0, level: 1, streakCurrent: 0, streakLongest: 0, lastStudyDate: null, totalReviews: 0 });
    expect(listener).toHaveBeenCalledOnce(); // not called again after unsubscribe
  });

  it('round-trips mission state', () => {
    expect(getMissionState('daily-reviews-10')).toBeUndefined();
    setMissionState('daily-reviews-10', { progress: 4, periodKey: '2026-08-06', completedAt: null });
    expect(getMissionState('daily-reviews-10')).toEqual({ progress: 4, periodKey: '2026-08-06', completedAt: null });
  });

  it('round-trips earned badges and de-duplicates', () => {
    expect(getEarnedBadges()).toEqual([]);
    addEarnedBadge('first-steps');
    addEarnedBadge('first-steps'); // idempotent
    expect(getEarnedBadges()).toEqual(['first-steps']);
  });

  it('round-trips the theme preference', () => {
    expect(getTheme()).toBeNull();
    setTheme('dark');
    expect(getTheme()).toBe('dark');
  });
});

describe('storage (Supabase sync merge/conflict logic)', () => {
  beforeEach(() => {
    localStorage.clear();
    setSyncUserId('user-1');
    fromMock.mockReset();
    // Harmless default so incidental background syncCardState() calls made
    // while seeding local state (before a test sets up its real scenario)
    // don't crash on `.from(...)` returning undefined.
    fromMock.mockReturnValue({
      select: () => ({ eq: () => Promise.resolve({ data: [], error: null }) }),
      upsert: () => Promise.resolve({ error: null }),
    });
  });

  it('hydrateFromSupabase merges remote rows in, remote winning over an existing local card', () => {
    setCardState('card-1', { interval: 1, ease: 2.5, reps: 1, dueDate: '2026-01-01T00:00:00.000Z', isFavorite: false });
    setCardState('card-2', { interval: 9, ease: 2.5, reps: 4, dueDate: '2026-02-01T00:00:00.000Z', isFavorite: true });
    fromMock.mockClear(); // ignore the sync calls setCardState just made

    fromMock.mockReturnValue({
      select: () => ({
        eq: () =>
          Promise.resolve({
            data: [
              { card_id: 'card-1', interval: 6, ease: 2.1, reps: 3, due_date: '2026-03-01T00:00:00.000Z', is_favorite: true, updated_at: '' },
            ],
            error: null,
          }),
      }),
    });

    return hydrateFromSupabase('user-1').then(() => {
      const merged = getAllCardStates();
      // remote wins for card-1
      expect(merged['card-1']).toEqual({ interval: 6, ease: 2.1, reps: 3, dueDate: '2026-03-01T00:00:00.000Z', isFavorite: true });
      // untouched local-only card-2 survives the merge
      expect(merged['card-2'].reps).toBe(4);
    });
  });

  it('claimLocalProgress uploads every locally-tracked card and returns the count', () => {
    setCardState('card-1', CARD);
    setCardState('card-2', CARD);
    let upsertArgs: unknown[] = [];
    fromMock.mockReturnValue({
      upsert: (...args: unknown[]) => {
        upsertArgs = args;
        return Promise.resolve({ error: null });
      },
    });

    return claimLocalProgress('user-1').then((count) => {
      expect(count).toBe(2);
      expect(upsertArgs[1]).toMatchObject({ onConflict: 'user_id,card_id', ignoreDuplicates: true });
    });
  });

  it('claimLocalProgress is a no-op (and skips the network call) when there is nothing local to claim', () => {
    return claimLocalProgress('user-1').then((count) => {
      expect(count).toBe(0);
      expect(fromMock).not.toHaveBeenCalled();
    });
  });

  it('reports a user-facing message through the sync-error handler when a background upsert fails', async () => {
    const onError = vi.fn();
    setSyncErrorHandler(onError);
    fromMock.mockReturnValue({
      upsert: () => Promise.resolve({ error: { message: 'network down' } }),
    });

    setCardState('card-1', CARD);
    await new Promise((resolve) => setTimeout(resolve, 0)); // flush the un-awaited upsert().then()

    expect(onError).toHaveBeenCalledWith(expect.stringContaining("couldn't sync"));
    setSyncErrorHandler(null);
  });

  it('does not report anything when the handler is unset', async () => {
    setSyncErrorHandler(null);
    fromMock.mockReturnValue({
      upsert: () => Promise.resolve({ error: { message: 'network down' } }),
    });

    // Should not throw even with no handler registered.
    setCardState('card-1', CARD);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
