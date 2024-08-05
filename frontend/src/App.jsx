import { useState } from 'react'

function App() {

  const [filesSubmitted, setFilesSubmitted] = useState(null)

  const handleFile = (event) =>{
    event.preventDefault()
    // prevent default behaviour of a browser
    const file = event.target.files[0];
    //Take the first file of the submitted
    if (file){
      const  fileData =   {
        name: file.name,
        size: file.size,
      }
    //if file exists, generate a new object
      if(filesSubmitted){
        const newFileList = filesSubmitted.concat(fileData)
        setFilesSubmitted(newFileList)
      }
      //if previous files have been submitted, add iut to the state
      else if (!filesSubmitted){
        const files = []
        const newFileList = files.concat(fileData)
        setFilesSubmitted(newFileList)
      }
      //else create an empty array and push the new file data inside
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
