# SankofaPOWER web app

The React frontend, built with [React Router](https://reactrouter.com/) in SPA mode (`ssr: false`), Vite and Tailwind CSS.

- `app/routes.ts` lists the pages; each page lives in `app/routes/`.
- In development, Vite forwards `/api` requests to the FastAPI backend (see `vite.config.ts`).
- In production, `npm run build` writes static files to `build/client/`, and FastAPI serves them. There is no separate Node server.

See the main [README](../README.md) for how to run everything with Docker.

## Commands

- `npm run dev`: dev server with hot reload at <http://localhost:5173>
- `npm run build`: production build
- `npm run typecheck`: generate route types and run TypeScript
