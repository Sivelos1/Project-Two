const buttonName = "#open_filestack"

const fileStack = require('filestack-js').init(process.env.FS_KEY);

const uploadOptions = {
    onFileUploadFinished: async file => {
        const response = await fetch('/api/media', {
            method: 'POST',
            body: file,
            headers: { 'Content-Type': 'application/json' },
          });
        if(response.ok){
            alert("File uploaded successfully!")
        }
    },
    onFileUploadFailed: async (file, error) => {
        alert("Failed to upload file.");
        console.error(error);
    }
}

const Upload = function(){
    fileStack.picker(uploadOptions).open();
}

document.querySelector(buttonName).addEventListener('submit', function(event){
    event.preventDefault();
    Upload();
})