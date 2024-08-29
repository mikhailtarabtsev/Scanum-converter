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

init_db()
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
    conn = sqlite3.connect('files.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM files')
    files = cursor.fetchall()
    conn.close()
    files_list = [{"id": file[0], "name": file[1], "size": file[2], "date": file[3], "file": file[4]} for file in files]
    print(files_list)
    a=db2dict()
    # return files_list

@app.get("/delete/{file_id}")
async def delete_file():    
    pass

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

def db2dict():
    conn = sqlite3.connect('files.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM files')
    files = cursor.fetchall()
    conn.close()
    files_list = [{"id": file[0], "name": file[1], "size": file[2], "date": file[3], "file": file[4]} for file in files]
    print(files_list)
    return files_list

def dir2db(files_dir):
    print (f'Пишем папку {files_dir} в базу')
    conn = sqlite3.connect('files.db')
    cursor = conn.cursor()
    for file_path in files_dir.iterdir():
        print(file_path)
        if file_path.is_file():
            file_id = str(uuid.uuid4())
            file_name = file_path.name
            file_size = file_path.stat().st_size
            file_date = datetime.fromtimestamp(file_path.stat().st_mtime).strftime('%Y-%m-%d')
            cursor.execute('''
                INSERT INTO files (id, name, size, date) VALUES (?, ?, ?, ?)
            ''', (file_id, file_name, file_size, file_date))
    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
    dir2db(UPLOAD_DIR)
    # import uvicorn
    # uvicorn.run(app, host="0.0.0.0", port=3000)