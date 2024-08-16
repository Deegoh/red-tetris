import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useBreakpoint from 'src/components/tetris/useBreakpoint';

describe('useBreakpoint', () => {
  let innerHeightBackup;

  beforeEach(() => {
    innerHeightBackup = global.window.innerHeight;
  });

  afterEach(() => {
    vi.clearAllMocks();
    global.window.innerHeight = innerHeightBackup;
  });

  test('test sizes', async () => {
    const { result } = renderHook(() => useBreakpoint());

    global.window.innerWidth = 1600;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('2xl');

    global.window.innerWidth = 1300;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('xl');

    global.window.innerWidth = 1100;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('lg');

    global.window.innerWidth = 800;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('md');

    global.window.innerWidth = 700;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('sm');

    global.window.innerWidth = 500;
    await act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe('xs');
  });
});
