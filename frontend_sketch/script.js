document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);

    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('result').textContent = 'Error: ' + data.error;
        } else {
            document.getElementById('result').innerHTML = 'File uploaded successfully: <a href="http://127.0.0.1:5000/uploads/' + data.filename + '">' + data.filename + '</a>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error uploading file';
    });
});
