import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
          type: 'success',
          expiring: false,
          open: true,
        },
        {
          id: '2',
          text: 'test2',
          type: 'error',
          expiring: false,
          open: true,
        },
        {
          id: '3',
          text: 'test3',
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

    expect(screen.getAllByTestId('notification').length).toBe(2);
  });
});
