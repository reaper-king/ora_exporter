import fs from "fs";

import type {  RequestHandler } from "@sveltejs/kit";
export const GET : RequestHandler = async()=>{
    
    try {
         let res  = await listFilesAsync('./queries')
        // await db.authenticate();
        return new Response(
            JSON.stringify(res.map(d=>{
             d = d.split('.')[0]
              return d
            }))
        )
      } catch (error) {
        console.error( error);
        return new Response(
            `Error :` + error
        )
      }

}









async function listFilesAsync(directoryPath:string) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}