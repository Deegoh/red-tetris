import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';

import { NotificationsContainer } from './NotificationsContainer';

import { useNotification } from 'src/app/notifications';
vi.mock('src/app/notifications');

describe('NotificationContainer', () => {
  let removeNotifMock;

  beforeEach(() => {
    removeNotifMock = vi.fn();
    useNotification.mockReturnValue({
      notifications: [
        {
          id: '1',
          text: 'test',
          type: 'question',
          expiring: false,
          open: true,
        },
        {
          id: '2',
          text: 'test2',
          type: 'info',
          expiring: false,
          open: true,
        },
        {
          id: '3',
          text: 'test3',
          type: 'success',
          expiring: false,
          open: true,
        },
        {
          id: '4',
          text: 'test4',
          type: 'warning',
          expiring: false,
          open: true,
        },
        {
          id: '5',
          text: 'test5',
          type: 'error',
          expiring: false,
          open: true,
        },
        {
          id: '6',
          text: 'test6',
          type: 'error',
          expiring: false,
          open: false,
        },
      ],
      removeNotif: removeNotifMock,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders', () => {
    render(<NotificationsContainer />);

    expect(screen.getAllByTestId('notification').length).toBe(5);

    const oneNotif = screen.queryAllByTestId('notification')[0];
    const deleteButton = oneNotif.querySelector('button');

    act(() => {
      fireEvent.click(deleteButton);
    });
  });
});
