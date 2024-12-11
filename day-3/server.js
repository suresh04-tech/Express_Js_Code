import { error } from 'console';
import http from 'http' 
import fs from 'fs/promises'
import url from 'url';
import path from 'path';

const __filename=url.fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
 
const PORT=7000;

const server=http.createServer(async(req,res)=>{

    try{
       if(req.method==='GET'){
          let filepath;
        if(req.url==='/'){
             filepath=path.join(__dirname,'public','index.html');
           }else if(req.url==='/about'){
             filepath=path.join(__dirname,'public','about.html')
           }else{
               res.writeHead(404,{'content-type':'text/html'})
               res.end('<h1>Error Not Founded<h1>');
           }
           const data=await fs.readFile(filepath)
           res.setHeader('content-type','text/html')
           res.write(data);
           res.end()
       }
       else{
        throw new error('Method not allowed');
       }
   
    }
    catch{
        res.writeHead(500,{'content-type':'text/plain'})
        res.end('Server Not Founded');
    }
    
   
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})