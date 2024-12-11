// how to write in file
const fs=require('fs')
const path=require('path')

// fs.writeFile(path.join(__dirname,'sub.txt'),'hello this is msg from node',(err)=>{
//     if(err) throw err;
//     console.log('writecomplete');
// })


//how to update a file

fs.appendFile(path.join(__dirname,'sub.txt'),'\n\n thanking you',(err)=>{
    if(err) throw err;
    console.log("append success");
})

//How to rename the file
fs.rename(path.join(__dirname,'sub.txt'), path.join(__dirname,'rename.txt'),(err)=>{
    if(err) throw err;
    console.log('rename success')
})