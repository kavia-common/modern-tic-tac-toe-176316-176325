# Modern Tic Tac Toe — Ocean Professional

This workspace contains the Vite-based frontend for a modern Tic Tac Toe game.

Frontend: `tictactoe_frontend` (Vite + React)

How to run:
- Install dependencies: npm install
- Start dev server: npm run dev
- The app will be served at port 3000 as configured (http://localhost:3000)

Features implemented:
- Modern single-page UI with header, centered 3x3 board, status area, and controls.
- Local two-player play (X and O) with alternating turns.
- Win and draw detection with winning line highlight.
- New Game/Reset control to clear state.
- Ocean Professional theme: blue (#2563EB) and amber (#F59E0B) accents, subtle shadows, rounded corners, smooth transitions.
- Responsive on mobile and desktop.
- Accessible: focusable squares, keyboard support (Tab to focus; Enter/Space to place mark), aria labels and live status updates.
- LocalStorage state persistence so the game survives refresh.

Project Structure:
- src/main.jsx — React entry point
- src/App.jsx — App shell and game logic
- src/components/Board.jsx — Board layout and keyboard handling
- src/components/Square.jsx — Individual square
- src/styles/theme.css — Theme and global styles
- index.html — App mount and metadata

Notes:
- The dev server is configured to run at port 3000 in vite.config.js (strictPort: true).
- No backend is required; this is a purely frontend game.