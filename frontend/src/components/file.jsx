import fileService from "../services/file"

const File = ({file, dataFetch}) =>{

    const deleteHandler = async (id) =>{
        if(window.confirm("you sure you want to delete this file?")){
          await fileService.delete(id)
          dataFetch()
        }
      }

    return (
        <li className= "file"  key= {file.id}> 
            <p className='file-name'> <u>Name</u>: {file.name}</p>
            <p><u>Size</u>: {file.size /1000 /* possible to implement a switch
             statement that will change size to mb/gb etc based off file size */} kB</p>
            
            <p><u>Date</u>: {file.date}</p>
            <button onClick={() => deleteHandler (file.id)} className='delete-btn'></button>
          </li>
    )
}

export default File