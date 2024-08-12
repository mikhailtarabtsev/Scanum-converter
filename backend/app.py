from flask import Flask, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from pathlib import Path

app = Flask(__name__, static_folder='../frontend_sketch', static_url_path='')

UPLOAD_FOLDER = Path('../uploads')
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
app.config['UPLOAD_FOLDER'] = str(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    if '.' in filename:
        file_extension = filename.rsplit('.', 1)[1].lower()        
        if file_extension in ALLOWED_EXTENSIONS:
            print("Норм расширение", file_extension, filename)
            return True
    return False

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(UPLOAD_FOLDER / filename)
        return jsonify({'filename': filename}), 200
    return jsonify({'error': 'File not allowed'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
