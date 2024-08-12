from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_location = UPLOAD_DIR / file.filename
    with file_location.open("wb") as f:
        f.write(await file.read())
    return {"info": f"File '{file.filename}' saved at '{file_location}'"}

@app.get("/", response_class=HTMLResponse)
async def read_root():
    index_file = Path("frontend_sketch/index.html")
    if not index_file.exists():
        return HTMLResponse(content="Index file not found", status_code=404)
    return HTMLResponse(content=index_file.read_text(), status_code=200)

@app.get("/files/")

@app.get("/delete/{file_id}")

# {
#     "id": "5beb",
#     "name": "delete-button-svgrepo-com.png",
#     "size": 11258,
#     "date": "2024-08-11",
#     "file": {}
# }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)