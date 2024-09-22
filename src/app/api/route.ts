import dbConnect, { pool } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

dbConnect()

export async function GET() {
    const data = await pool.query("SELECT * FROM todo_app ORDER BY id ASC")
    const result = data.rows
    return NextResponse.json({
        result
    })    
}

export async function POST(data: string) {
    try{
        const randomString = crypto.randomUUID(); 
        const newNote = await pool.query("INSERT INTO todo_app(text, uuid) VALUES ($1, $2) RETURNING *", [data, randomString])
        const result = newNote.rows[0]
        return NextResponse.json({
            result
        })
    }
    catch(err){
        console.log("Error ", err)
        return NextResponse.json({ error: err });
    }
}

export async function PATCH(note: string, uuid:any) {
    try{
        const updatedTask = await pool.query("UPDATE todo_app SET text = $1 WHERE uuid = $2 RETURNING *", [note, uuid])
        const result = updatedTask.rows[0]
        return NextResponse.json({
            result
        })
    }
    catch(err){
        console.log("Error ", err)
        return NextResponse.json({ error: err });
    }
}

export async function DELETE(id: number) {
    try {
        const taskToBeDeleted = await pool.query('DELETE FROM todo_app WHERE id = $1', [id])
        return NextResponse.json({
            taskToBeDeleted
        })
      }
      catch (err) {
        console.log("Error ", err)
        return NextResponse.json({ error: err });
      }
}