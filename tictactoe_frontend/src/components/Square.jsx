import React from 'react';

// PUBLIC_INTERFACE
export default function Square({ index, value, disabled, isWinning, onClick, onKeyDown }) {
  /** A single square button in the board grid.
   * Props:
   * - index: number 0..8
   * - value: 'X' | 'O' | null
   * - disabled: boolean to prevent interaction
   * - isWinning: boolean to highlight when part of the winning line
   * - onClick: click handler
   * - onKeyDown: keyboard handler
   */

  const ariaLabel = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={`square ${value ? `square-${value.toLowerCase()}` : ''} ${isWinning ? 'square-win' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      role="gridcell"
      tabIndex={0}
    >
      <span className="mark" aria-hidden="true">{value}</span>
    </button>
  );
}
