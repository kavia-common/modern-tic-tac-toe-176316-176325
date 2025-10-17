import React from 'react';

// Minimal inline SVG icons matching Ocean Professional theme
function KnightIcon({ title = 'Knight', color = 'currentColor' }) {
  // Simple stylized knight silhouette (inline SVG path)
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      role="img"
    >
      <title>{title}</title>
      <path
        d="M6 20h12v-2.5c0-1.7-1.3-3-3-3h-1.4l1.3-3.2c.2-.5.1-1.1-.3-1.5l-3-3c-.4-.4-1-.5-1.5-.3L6 8.6V7c0-.6.4-1 1-1h3l2-2-1.2-1.2C10.2 1.2 7 2.9 7 5.5V7l-1.8.9C4.5 8.3 4 9.1 4 9.9v1.1c0 .7.4 1.4 1 1.8l2 .9V20Z"
        fill={color}
      />
      <path d="M8 20v-3.5c0-.8.7-1.5 1.5-1.5H12" fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

function QueenIcon({ title = 'Queen', color = 'currentColor' }) {
  // Simple stylized queen crown silhouette (inline SVG path)
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      role="img"
    >
      <title>{title}</title>
      <path
        d="M6 18h12l-1.2-6-2.6 2-2.2-5-2.2 5-2.6-2L6 18Z"
        fill={color}
      />
      <circle cx="5" cy="7" r="1.2" fill={color} />
      <circle cx="12" cy="5.5" r="1.2" fill={color} />
      <circle cx="19" cy="7" r="1.2" fill={color} />
      <rect x="7" y="19" width="10" height="2" rx="0.8" fill={color} />
    </svg>
  );
}

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

  const isEmpty = value == null;
  const iconTitle = value === 'X' ? 'Knight' : value === 'O' ? 'Queen' : '';
  const ariaLabel = isEmpty
    ? `Square ${index + 1}, empty`
    : `Square ${index + 1}, ${iconTitle}`;

  // Choose colors that fit theme: placed marks use neutral/darker; winning squares get accent
  const baseColor = isWinning
    ? 'var(--color-secondary)'
    : value === 'X'
      ? 'var(--color-text)'
      : value === 'O'
        ? '#374151'
        : 'currentColor';

  const accentColor = value === 'X' ? 'var(--color-primary)' : 'var(--color-secondary)';

  const iconColor = isWinning ? 'var(--color-secondary)' : baseColor;

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
      {/* Screen-reader only fallback text to preserve meaning if SVG not announced */}
      <span className="sr-only">{isEmpty ? '' : (value === 'X' ? 'Knight' : 'Queen')}</span>

      <span className="mark" aria-hidden="true">
        {value === 'X' && <KnightIcon title="Knight" color={iconColor} />}
        {value === 'O' && <QueenIcon title="Queen" color={iconColor} />}
      </span>

      {/* Subtle active hint for empty square hover: ghosted current player icon via CSS in Board context if needed */}
    </button>
  );
}
