import fileService from "../services/file"

const Dropper = ({filesSubmitted, setFilesSubmitted}) =>{

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
            date : submissionDate,
            file: file
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

    return(
        <div className= "dropper">
      <input
        className='file-input' 
        type='file'
        onChange={handleFile}
        />
      {/*invisible input element is located directly above a div with upload icon,
       making it drag and drop with no buttons or anything else*/}
    </div>


    )




}

export default Dropper

