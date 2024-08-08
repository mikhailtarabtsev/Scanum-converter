/* eslint-disable no-undef */
import axios from "axios"

const getUrl = import.meta.env.VITE_DB_ENDPOINT
const postUrl = import.meta.env.VITE_SUBMIT_ENDPOINT
const port = import.meta.env.VITE_PORT || 3000

// necessary backend endpoints will be declared here or in the .env

const baseUrl = `http://localhost:${port}`

//base url to which all the endpoints lead

const getAll = async  () =>{
    try {const res = await axios.get(`${baseUrl}/${getUrl}`)
    //send get request to the db endpoint
    console.log("it works")
    return res.data}

    catch(err){
        console.log("it is fucked",err.name, err.message)}
}



const sendFile = async (jsonFile)=>{
    try{
        const res = await axios.post(`${baseUrl}/${postUrl}`,jsonFile)
        //send post request to the submit endpoint
        console.log("it works")
    return res.data
    }
    catch (err){
        console.log("it is fucked:",err.name, err.message)
    }
    
}

export default  {

    submit : sendFile,
    getAll : getAll,

}