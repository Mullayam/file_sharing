import { PreSqlClient } from "@enjoys/presql"
export const presql = new PreSqlClient({
  pre_user: "allshoho_user", //db username
  pre_password: "Mullayam@123", // dbpassword
  pre_host: "localhost", //db host // 103.98.62.201 live host
  pre_database: "allshoho_filestack", //database name
  pre_port: 3306,
  showConnErrors: true, //optional field show connection log ,default false
  resultLogs: true, //optional field ,show results in console,default false
  tableJoiner: "_", // optional field, change only table joiner are different from _

}); 
