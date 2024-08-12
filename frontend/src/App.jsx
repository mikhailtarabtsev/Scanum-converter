import { useState } from 'react';
import ProjectBar from './components/project-bar';
import Dropper from './components/dropper'



function App() {
  const [filesSubmitted, setFilesSubmitted] = useState([])

  return (
  <div className='app' >
    <ProjectBar
     filesSubmitted = {filesSubmitted}
     setFilesSubmitted = {setFilesSubmitted}
     />

    <Dropper
     filesSubmitted = {filesSubmitted}
     setFilesSubmitted = {setFilesSubmitted}
     />
  </div>
  )
}

export default App
