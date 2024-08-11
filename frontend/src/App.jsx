import { useState, useEffect } from 'react'
import fileService from './services/file'

function App() {

  const [filesSubmitted, setFilesSubmitted] = useState([])


  const dataFetch = async()=>{
    const res = await fileService.getAll()
    if(res.length>0){setFilesSubmitted(res)}
    else if (res.length <= 0) { setFilesSubmitted([])}
  }

  useEffect(()=>{
    dataFetch()
  },[]
  )


  const handleFile = async (event) =>{
    event.preventDefault()
    //Prevent default behaviour of a browser

    const file = event.target.files[0];
    //Take the first file of the submitted

    if (file){
      const submissionDate = new Date().toISOString().slice(0, 10)
      const  fileData =   {
        name: file.name,
        size: file.size,
        date : submissionDate
      }
    //If file exists, generate a new object

    const res = await fileService.submit(fileData)
    console.log("submission response",res)
    if (res){
      const newFileList = filesSubmitted.concat(res)
      setFilesSubmitted(newFileList)
      

    }else{
      console.error("submission failed")
    }
    
    //Send a post request to the backend, await the response & add the response to the state

    }
  }


  const deleteHandler = async (id) =>{
    if(window.confirm("you sure you want to delete this file?")){
      await fileService.delete(id)
      dataFetch()
    }

    
    
  }
  return (
  
    <div className='app' >



    
    <div className="project-bar"  >
      {filesSubmitted.length>0?
      <>
      <div className="project-bar-header">Files submitted :</div>
      <ul>
        {filesSubmitted.map((f) => (
          <li className= "file"  key= {f.id}> 
            <p className='file-name'> <u>Name</u>: {f.name}</p>
            <p><u>Size</u>: {f.size /1000 /* possible to implement a switch
             statement that will change size to mb/gb etc based off file size */} kB</p>
            
            <p><u>Date</u>: {f.date}</p>
            <button onClick={() => deleteHandler (f.id)} className='delete-btn'></button>
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
      {/*invisible input element is located directly above a div with upload icon,
       making it drag and drop with no buttons or anything else*/}

    </div>
    
    </div>
  )
}

export default App
