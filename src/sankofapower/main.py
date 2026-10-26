from typing import Annotated

from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from sankofapower.db import get_db

app = FastAPI()

if not app.debug:
    # in production FastAPI will serve the front-end
    # in dev mode you run both seperately.
    app.frontend("/", directory="web/build/client")


@app.get("/api/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/health")
def health(db: Annotated[Session, Depends(get_db)]):
    postgis = db.execute(text("SELECT postgis_lib_version()")).scalar_one()
    return {"status": "ok", "postgis": postgis}


@app.get("/api/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
