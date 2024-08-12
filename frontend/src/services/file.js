/* eslint-disable no-undef */
import axios from "axios"

const getUrl = "/files/"
const postUrl = "/upload/"
const deleteUrl = "/delete/"

// necessary backend endpoints will be declared here or in the .env

const baseUrl = "http://localhost:3000"

//base url to which all the endpoints lead

const getAll = async  () =>{
    try {const res = await axios.get(`${baseUrl}${getUrl}`)
    //send get request to the db endpoint
    return res.data}

    catch(err){
        console.log("get error:", err.name, err.message)}
        return null
}



const sendFile = async (jsonFile)=>{
    try{
        const res = await axios.post(`${baseUrl}${postUrl}`,jsonFile)
        //send post request to the submit endpoint
    return res.data
    }
    catch (err){
        console.log("post error:",err.name, err.message)
        return null
    }
    
}

const deleteFile = async (id) => {

    const res = await axios.delete(`${baseUrl}${deleteUrl}/${id}`)
    // send delete request to the post endpoint to delete a file with a requested id
    return res.data
}

export default  {

    submit : sendFile,
    getAll : getAll,
    delete: deleteFile

}