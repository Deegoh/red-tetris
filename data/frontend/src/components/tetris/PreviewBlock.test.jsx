import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PreviewBlock } from './PreviewBlock';

describe('PreviewBlock', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders', () => {
    const fakeTetro = [
      ['.', '.', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['.', 'T', '.', '.'],
      ['.', '.', '.', '.'],
    ];

    render(<PreviewBlock tetromino={fakeTetro}>Preview</PreviewBlock>);

    expect(screen.getAllByTestId('square').length).toBe(16);
  });

  test('renders empty', () => {
    const fakeTetro = [];

    render(<PreviewBlock tetromino={fakeTetro}>Preview</PreviewBlock>);

    expect(screen.getAllByTestId('square').length).toBe(16);
  });

  test('renders undefined', () => {
    render(<PreviewBlock tetromino={undefined}>Preview</PreviewBlock>);

    expect(screen.queryByTestId('square')).toBeNull();
  });
});
