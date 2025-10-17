import React, { useEffect, useMemo, useState } from 'react';
import Board from './components/Board.jsx';

// Small inline SVGs used in status/labels as well
function KnightMini({ title = 'Knight', color = 'currentColor' }) {
  return (
    <svg
      className="icon inline-icon"
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
function QueenMini({ title = 'Queen', color = 'currentColor' }) {
  return (
    <svg
      className="icon inline-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      role="img"
    >
      <title>{title}</title>
      <path d="M6 18h12l-1.2-6-2.6 2-2.2-5-2.2 5-2.6-2L6 18Z" fill={color} />
      <circle cx="5" cy="7" r="1.2" fill={color} />
      <circle cx="12" cy="5.5" r="1.2" fill={color} />
      <circle cx="19" cy="7" r="1.2" fill={color} />
      <rect x="7" y="19" width="10" height="2" rx="0.8" fill={color} />
    </svg>
  );
}

// Utility to check for winner and winning line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

const STORAGE_KEY = 'ttt:state:v1';

// PUBLIC_INTERFACE
export default function App() {
  /** Main app component for the Tic Tac Toe game.
   * Renders header, status message, board, and controls.
   * Handles game state, win/draw detection, keyboard accessibility, and persistence.
   */

  // Load initial state from localStorage for persistence
  const loadInitialState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (
        Array.isArray(parsed.board) &&
        parsed.board.length === 9 &&
        (parsed.currentPlayer === 'X' || parsed.currentPlayer === 'O')
      ) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  };

  const persisted = loadInitialState();

  const [board, setBoard] = useState(persisted?.board ?? Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(persisted?.currentPlayer ?? 'X');
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState(persisted?.winningLine ?? []);
  const [winner, setWinner] = useState(persisted?.winner ?? null);
  const [isDraw, setIsDraw] = useState(persisted?.isDraw ?? false);

  // Compute game state when board changes
  useEffect(() => {
    const { winner: w, line } = calculateWinner(board);
    const full = board.every((sq) => sq !== null);
    if (w) {
      setWinner(w);
      setWinningLine(line);
      setGameOver(true);
      setIsDraw(false);
    } else if (full) {
      setIsDraw(true);
      setGameOver(true);
      setWinner(null);
      setWinningLine([]);
    } else {
      setWinner(null);
      setWinningLine([]);
      setGameOver(false);
      setIsDraw(false);
    }
  }, [board]);

  // Persist to localStorage
  useEffect(() => {
    try {
      const payload = {
        board,
        currentPlayer,
        winner,
        winningLine,
        isDraw,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [board, currentPlayer, winner, winningLine, isDraw]);

  // PUBLIC_INTERFACE
  const handleMove = (index) => {
    /** Handles a move at the given index if valid (empty and not game over) */
    if (gameOver || board[index]) return;
    setBoard((prev) => {
      const next = [...prev];
      next[index] = currentPlayer;
      return next;
    });
    setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    /** Resets the game to initial state. */
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
    setGameOver(false);
  };

  const statusNode = useMemo(() => {
    if (winner) {
      return (
        <>
          <span className="sr-only">Player {winner} wins!</span>
          <span className="status-icon" aria-hidden="true">
            {winner === 'X' ? <KnightMini color="var(--color-primary)" /> : <QueenMini color="var(--color-primary)" />}
          </span>
          <span> Player {winner} wins!</span>
        </>
      );
    }
    if (isDraw) {
      return <>It's a draw!</>;
    }
    return (
      <>
        <span className="sr-only">Player {currentPlayer}'s turn</span>
        <span className="status-icon" aria-hidden="true">
          {currentPlayer === 'X' ? (
            <KnightMini color="var(--color-primary)" />
          ) : (
            <QueenMini color="var(--color-primary)" />
          )}
        </span>
        <span> Player {currentPlayer}'s turn</span>
      </>
    );
  }, [winner, isDraw, currentPlayer]);

  return (
    <div className="app-root">
      <header className="app-header" role="banner" aria-label="Game Header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true">◎</div>
            <h1 className="brand-title">Tic Tac Toe</h1>
          </div>
          <div className="brand-sub">
            <span className="badge">Ocean Professional</span>
          </div>
        </div>
      </header>

      <main className="app-main" role="main">
        <section className="game-card" aria-label="Tic Tac Toe Game">
          <div className="status-row" aria-live="polite">
            <p className={`status ${winner ? 'status-win' : isDraw ? 'status-draw' : ''}`}>
              {statusNode}
            </p>
            {winningLine.length > 0 && (
              <p className="status-sub">
                Winning line: {winningLine.join(' - ')}{' '}
                <span className="status-icon" aria-hidden="true" title="Winning mark">
                  {winner === 'X' ? <KnightMini color="var(--color-secondary)" /> : <QueenMini color="var(--color-secondary)" />}
                </span>
              </p>
            )}
          </div>

          <Board
            squares={board}
            onMove={handleMove}
            disabled={gameOver}
            winningLine={winningLine}
          />

          <div className="controls">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleReset}
              aria-label="Start a new game"
            >
              New Game
            </button>
          </div>

          <div className="help-text" role="note">
            <p>Tip: Use Tab to focus a square and Enter/Space to place your mark.</p>
          </div>
        </section>
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>
          Built with Vite + React · Theme: <span className="text-accent">Ocean Professional</span>
        </p>
      </footer>
    </div>
  );
}
