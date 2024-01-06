import oracledb from 'oracledb';
import 'dotenv/config';

const { CONNECTION_STRING , DB_PASS ,DB_USER  , INSTANT_CLIENT } = process.env

let result


try {
    oracledb.initOracleClient({libDir: INSTANT_CLIENT});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    //process.exit(1);
  }

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



export default async function sendOracleResult(queri:string) {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : DB_USER,
      password      : DB_PASS,
      connectString : CONNECTION_STRING
    });

    result = await connection.execute(
      queri,
    );
    return result.rows
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  return result
}
