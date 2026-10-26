# SankofaPOWER

## Basic todo list

Tech stack stuff:

- [x] uv
- [x] fastapi (at the basic quick-start level)
- [x] react router (at the basic quick-start level)
- [x] docker
- [x] devcontainer
- [x] dev database (postgis)

Write a better readme.


## Project layout

```
docs/requirements.pdf      Product requirements (April 2026)
src/sankofapower/          FastAPI backend
  main.py                    API routes
  db.py                      Database connection
migrations/                Alembic database migrations
web/                       React frontend (see web/README.md)
docker-compose.yml         Dev stack: database, API, web app
Dockerfile                 Production image
.devcontainer/             VS Code dev container (reuses docker-compose.yml)
```

## Running it for development

You need [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
The database is Postgres with PostGIS (for distance and radius queries).

### Option A: Docker Compose (any editor)

```sh
docker compose up
```

- Web app: <http://localhost:5173>
- API: <http://localhost:8000/api/> (health check: <http://localhost:8000/api/health>)
- API docs: <http://localhost:8000/docs>

Both the API and the web app reload when you save a file. Database migrations run when the API starts.
Stop everything with `Ctrl+C` or `docker compose down`. Add `-v` to also wipe the database.

### Option B: Dev container (VS Code)

1. Install the **Dev Containers** extension in VS Code.
2. Open this folder and choose **Reopen in Container** (or run "Dev Containers: Reopen in Container").
3. In the container's terminals:
   1. `uv run fastapi dev`
   2. `cd web` then `npm run dev`
4. Visit <http://localhost:5173>

Run only one of these setups at a time. They share the same database container.

### Database migrations

Migrations live in `migrations/` and are managed with Alembic:

- Apply: `uv run alembic upgrade head`
- Create one after changing models: `uv run alembic revision --autogenerate -m "describe the change"`

With Docker Compose, run these inside the API container, e.g. `docker compose exec api uv run alembic upgrade head`.

### Production image

```sh
docker build -t sankofapower .
docker run -p 8000:8000 -e DATABASE_URL=... sankofapower
```

This builds the React app and serves it from FastAPI at <http://localhost:8000>.
