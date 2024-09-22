import {Pool} from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projects',
    password: 'secret',
    port: 5432
})

export default async function dbConnect() {
    await pool.connect((err, client, release) =>{
        if (err){
            return console.log("Error in connection", err.stack)
        }
        client?.query("select * from todo_app", (err,result)=>{
            release()
            if (err){
                return console.log("Error in query execution", err.stack)
            }
            console.log("Connected to database", result.rows)
        })
    })
}