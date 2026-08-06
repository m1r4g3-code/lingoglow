import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ToastProvider, useToast } from './ToastContext';

function wrapper({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

describe('ToastContext', () => {
  it('pushError adds an error-typed toast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => result.current.pushError('sync failed'));

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({ type: 'error', message: 'sync failed' });
  });

  it('pushEvents and pushError can coexist as separate toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.pushEvents([{ type: 'xp', message: '+5 XP' }]);
      result.current.pushError('sync failed');
    });

    expect(result.current.toasts.map((t) => t.type).sort()).toEqual(['error', 'xp']);
  });
});
