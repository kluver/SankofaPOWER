from fastapi import FastAPI

app = FastAPI()

if not app.debug:
    # in production FastAPI will serve the front-end
    # in dev mode you run both seperately.
    app.frontend("/", directory="web/build/client")


@app.get("/api/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
