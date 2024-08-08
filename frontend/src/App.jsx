import { useState, useEffect } from 'react'
import fileService from './services/file'

function App() {

  const [filesSubmitted, setFilesSubmitted] = useState(null)

  useEffect( ()=>{
    
    const res = fileService.getAll()
    if(res){setFilesSubmitted(res)}
    else if (!res){ setFilesSubmitted([])}
    
  },[]
  )
  const handleFile = (event) =>{
    event.preventDefault()
    //Prevent default behaviour of a browser

    const file = event.target.files[0];
    //Take the first file of the submitted

    if (file){
      const  fileData =   {
        name: file.name,
        size: file.size,
        data: JSON.stringify(file),
        date : new Date
      }
    //If file exists, generate a new object

    const res = fileService.submit(fileData)
    const newFileList = filesSubmitted.concat(res.data)
    setFilesSubmitted(newFileList)
    //Send a post request to the backend, await the response & add the response to the state

    }
  }

  return (
  
    <div className='app' >



    
    <div className="project-bar"  >
      {filesSubmitted?
      <>
      <div className="project-bar-header">Files submitted :</div>
      <ul>
        {filesSubmitted.map((file, index) => (
          <li className= "file"  key= {index}> 
            <p className='file-name'> <u>Name</u>: {file.name}</p>
            <p><u>Size</u>: {file.size /1000} kB</p>
            </li>))
        }
      </ul>
      {/* loops through the array of submitted files and renders the file data 
      if the files have been submitted*/}
      </>
      :<p>Try submitting a file</p>}
      {/*otherwise returns a prompt to submit a new file*/}
    </div>
    <div className= "dropper">
      <input
        className='file-input' 
        type='file'
        onChange={handleFile}
        />

    </div>
    
    </div>
  )
}

export default App
