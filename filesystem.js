//Type-1 we can able to read the data
// import {readFile} from 'node:fs'
// readFile('./start.txt',(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// })


//Type-2 we can able to read the data
const fs=require('fs')
const path=require('path')
fs.readFile(path.join(__dirname, 'start.txt'),'Utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})

//this is used to handle error which is occur on process
process.on('uncaughtException',err=>{

    console.error('there was an uncaught error:',err)
    process.exit(1)
})