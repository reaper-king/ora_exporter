import sendOracleResult from "$lib/db";
import type {  RequestHandler } from "@sveltejs/kit";
export const GET : RequestHandler = async()=>{
    
    try {
         let res  = await sendOracleResult(queri)
        // await db.authenticate();
        return new Response(
            JSON.stringify(res)
        )
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return new Response(
            `Error :` + error
        )
      }

}


let queri = `
select tbl.tablespace_name,
       tbl.current_df_size,
       tbl.max_size,
       tbl.used_size,
       tbl.free_size,
       round((tbl.free_size * 100) / tbl.max_size, 2) as free_prc,
       round(((tbl.current_df_size - tbl.used_size) * 100) / tbl.current_df_size, 2) as free_prc_current_df_size
  from (SELECT data.tablespace_name as tablespace_name, (select block_size/1024||'K' from dba_tablespaces a where a.tablespace_name=data.tablespace_name) bs,
               round(maxsize.bytes / 1048576, 2) as max_size,
               round(data.bytes / 1048576, 2) as current_df_size,
               round((data.bytes  - free.bytes) / 1048576, 2) as used_size,
               round((maxsize.bytes - (data.bytes - free.bytes)) / 1048576,2) as free_size
          FROM (SELECT tablespace_name, SUM(BYTES) as bytes
                  FROM dba_data_files
                 WHERE tablespace_name NOT IN
                       (select tablespace_name
                          from dba_tablespaces
                         WHERE contents = 'UNDO')
                 GROUP BY tablespace_name) data,
               (SELECT tablespace_name, SUM(NVL(BYTES, 0)) as bytes
                  FROM dba_free_space
                 GROUP BY tablespace_name) free,
               (SELECT tablespace_name,
                       SUM(greatest(bytes, maxbytes)) as bytes
                  FROM dba_data_files
                 GROUP BY tablespace_name) maxsize
         WHERE data.tablespace_name = free.tablespace_name(+)
           AND data.tablespace_name = maxsize.tablespace_name) tbl
 order by 7 nulls first`

 let q2 = `select sysdate from dual`