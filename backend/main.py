from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import sqlite3
from datetime import datetime
import uuid

app = FastAPI()

app.mount("/static", StaticFiles(directory="backend/dist"), name="static")

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_dict = file2dict(file)
    file2db(file_dict)
    file_location = UPLOAD_DIR / file.filename
    with file_location.open("wb") as f:
        f.write(await file.read())
    return file_dict

@app.options("/upload/")
async def options_upload():
    return {"allow": ["POST", "OPTIONS"]}

@app.get("/")
async def read_root():
    return FileResponse("backend/dist/index.html")

# @app.get("/", response_class=HTMLResponse)
# async def read_root():
#     index_file = Path("backend/dist/index.html")
#     # index_file = Path("frontend_sketch/index.html")
#     if not index_file.exists():
#         return HTMLResponse(content="Index file not found", status_code=404)
#     return HTMLResponse(content=index_file.read_text(), status_code=200)

@app.get("/files/")
async def list_files():
    pass

@app.get("/delete/{file_id}")
async def delete_file():    
    pass


# {
#     "id": "5beb",
#     "name": "delete-button-svgrepo-com.png",
#     "size": 11258,
#     "date": "2024-08-11",
#     "file": {}
# }

def init_db():
    conn = sqlite3.connect('files.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS files (
            id TEXT PRIMARY KEY,
            name TEXT,
            size INTEGER,
            date TEXT,
            file BLOB
        )
    ''')
    conn.commit()
    conn.close()

async def file2db(file_dict):
    conn = sqlite3.connect('files.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO files (id, name, size, date, file)
        VALUES (?, ?, ?, ?, ?)
    ''', (file_dict['id'], file_dict['name'], file_dict['size'], file_dict['date'], file_dict['file']))
    conn.commit()
    conn.close()

def file2dict(file):
    return {
        "id": str(uuid.uuid4()),
        "name": file.filename,
        "size": len(file.file.read()),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "file": file.file.read()
    }

if __name__ == "__main__":
    init_db()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)