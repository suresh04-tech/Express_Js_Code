//How to do async and await in node

const fspromises=require('fs')
const path=require('path')
const file =async()=>{
    try{
        const data=await fspromises.readFile(path.join(__dirname),'start.txt')
        console.log(data.toString());
    }
    catch(err){                                 
        console.error(err);
    }
}
file()

