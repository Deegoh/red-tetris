import {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { NotificationProvider, useNotification } from 'src/app/notifications';

beforeAll(() => {
  //   global.console.log = vi.fn();
  //   global.console.info = vi.fn();
  //   global.console.warning = vi.fn();
  global.console.error = vi.fn();
});

afterAll(() => {
  //   global.console.log.mockRestore();
  //   global.console.info.mockRestore();
  //   global.console.warning.mockRestore();
  global.console.error.mockRestore();
});

describe('notifications', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test('should fail', async () => {
    try {
      renderHook(useNotification);
    } catch (error) {
      expect(error).toEqual(
        new Error('useNotification must be used within a NotificationProvider')
      );
    }
  });

  test('should test notif', async () => {
    const wrapper = ({ children }) => (
      <NotificationProvider>{children}</NotificationProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    expect(result.current.notifications.length).toBe(0);

    await act(() => {
      result.current.addNotif('text1', 'success');
    });
    expect(result.current.notifications.length).toBe(1);

    await act(() => {
      result.current.addNotif('text2', 'info');
      result.current.addNotif('text3', 'question');
      result.current.addNotif('text4', 'warning');
      result.current.addNotif('text5', 'error');
    });
    expect(result.current.notifications.length).toBe(5);

    await act(() => {
      result.current.addNotif('text6', 'plop', false);
    });
    expect(result.current.notifications.length).toBe(5);

    await act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.notifications.length).toBe(1);
  });
});
