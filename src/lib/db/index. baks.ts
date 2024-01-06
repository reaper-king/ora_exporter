import { Sequelize } from "sequelize";
// import oracledb from 'oracledb';

export const db = new Sequelize('CLONE', 'exporter', 'Apps#1234', {
    host: '10.3.104.56',
    dialect:  'oracle' ,
    port:1531
  });
  
// export const db = new Sequelize(  'oracle://APPS:Apps#1234@10.3.104.56:1531/CLONE' );


// var conString = "(DESCRIPTION= (ADDRESS=(PROTOCOL=tcp)(HOST=10.3.104.56)(PORT=1531)) (CONNECT_DATA= (SERVICE_NAME=CLONE)))";


// export const db = new Sequelize({
//   dialect: 'oracle',
//   username: 'apps',
//   password: 'Apps#1234',
//   dialectOptions: {
//     connectString:conString
//   }
// });

// export const db = new Sequelize(  'oracle://APPS:Apps#1234@10.3.104.56:1531/CLONE' );