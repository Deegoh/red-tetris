import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import useBreakpoint from './useBreakpoint';
import { Square } from './Square';

vi.mock('./useBreakpoint.jsx', () => ({
  default: vi.fn(),
}));

describe('Square', () => {
  let innerHeightBackup;

  beforeEach(() => {
    innerHeightBackup = global.window.innerHeight;
  });

  afterEach(() => {
    vi.clearAllMocks();
    global.window.innerHeight = innerHeightBackup;
  });

  test('renders small', () => {
    useBreakpoint.mockReturnValue('xs');
    global.window.innerHeight = 1000;

    render(
      <>
        <Square ghost={true} color='T' position={1} />
        <Square ghost={true} color='U' position={2} />
        <Square ghost={true} color='.' position={3} />
      </>
    );

    expect(screen.getAllByTestId('square').length).toBe(3);
  });

  test('renders big', () => {
    useBreakpoint.mockReturnValue('md');
    global.window.innerHeight = 10;

    render(
      <>
        <Square ghost={true} color='T' position={1} mode='view' />
        <Square ghost={true} color='.' position={2} mode='view' />
      </>
    );

    expect(screen.getAllByTestId('square').length).toBe(2);
  });
});
