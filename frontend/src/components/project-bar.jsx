import File from "./file";
import { useEffect } from "react";
import fileService from "../services/file"

const ProjectBar = ({filesSubmitted, setFilesSubmitted})=>{

    const dataFetch = async()=>{
      const res = await fileService.getAll()
      if(res.length>0){setFilesSubmitted(res)}
      else if (res.length <= 0) { setFilesSubmitted([])}
    }
  

    useEffect(()=>{
      dataFetch()
    }
    )
  
    return (
        <div className="project-bar"  >
        {filesSubmitted.length>0?
        <>
        <div className="project-bar-header">Files submitted :</div>
        <ul>
          {filesSubmitted.map((f) => (
            <File key={f.id} file = {f} dataFetch = {dataFetch} />
            ))
          }
        </ul>
        {/* loops through the array of submitted files and renders the file data 
        if the files have been submitted*/}
        </>
        :<p className="project-bar-header">Try submitting a file</p>}
        {/*otherwise returns a prompt to submit a new file*/}
      </div>
    )
}

export default ProjectBar