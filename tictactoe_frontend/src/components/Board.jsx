import React, { useCallback } from 'react';
import Square from './Square.jsx';

// PUBLIC_INTERFACE
export default function Board({ squares, onMove, disabled, winningLine = [] }) {
  /** Renders a 3x3 board of squares.
   * Props:
   * - squares: array of 9 cells, values 'X' | 'O' | null
   * - onMove: function(index) to place a mark
   * - disabled: boolean if moves are disabled (game over)
   * - winningLine: array of indexes that form the winning combination to highlight
   */

  const handleKeyDown = useCallback(
    (index, e) => {
      if (disabled) return;
      // Enter or Space to make move
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onMove(index);
      }
    },
    [onMove, disabled]
  );

  return (
    <div
      className={`board ${disabled ? 'board-disabled' : ''}`}
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-disabled={disabled ? 'true' : 'false'}
    >
      {squares.map((value, idx) => {
        const isWinning = winningLine.includes(idx);
        return (
          <Square
            key={idx}
            index={idx}
            value={value}
            disabled={disabled || Boolean(value)}
            isWinning={isWinning}
            onClick={() => onMove(idx)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
          />
        );
      })}
    </div>
  );
}
