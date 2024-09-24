import dbConnect, { pool } from "@/utils/dbConnect";
// import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";
import { DataRow } from "../page";

dbConnect()

// export async function GET() {
//     // const data = await pool.query("SELECT * FROM todo_app ORDER BY id ASC")
//     // const result = data.rows
//     // return NextResponse.json({
//     //     result
//     // })   
//     const { data, error } = await supabase
//         .from('todo_app')
//         .select('*')
//         .order('id', { ascending: true });

//     if (error) {
//         throw error;
//     }

//     return data;
// }

// export async function GET(): Promise<DataRow[]> {
//     const { data, error } = await supabase
//         .from('todo_app')
//         .select('*')
//         .order('id', { ascending: true });

//     if (error) {
//         console.error("Error fetching data from Supabase: ", error);
//         throw error;
//     }

//     if (!data || data.length === 0) {
//         console.warn("No data found in todo_app table.");
//       } else {
//         console.log("Fetched Data: ", data);
//       }
    
//     return data as DataRow[];
// }

// export async function POST(data: string) {
//     try{
//         const randomString = crypto.randomUUID();
//         const newNote = await pool.query("INSERT INTO todo_app(text, uuid) VALUES ($1, $2) RETURNING *", [data, randomString])
//         const result = newNote.rows[0]
//         return NextResponse.json({
//             result
//         })
//     }
//     catch(err){
//         console.log("Error ", err)
//         return NextResponse.json({ error: err });
//     }
// }

// export async function PATCH(note: string, uuid:string) {
//     try{
//         const updatedTask = await pool.query("UPDATE todo_app SET text = $1 WHERE uuid = $2 RETURNING *", [note, uuid])
//         const result = updatedTask.rows[0]
//         return NextResponse.json({
//             result
//         })
//     }
//     catch(err){
//         console.log("Error ", err)
//         return NextResponse.json({ error: err });
//     }
// }

// export async function PATCH({ note, id }: { note: string; id: string; }) {
//     try{
//         // const body = await request.json();
//         // const { note, id } = body;
//         const updatedTask = await pool.query("UPDATE todo_app SET text = $1 WHERE uuid = $2 RETURNING *", [note, id])
//         const result = updatedTask.rows[0]
//         return NextResponse.json({
//             result
//         })
//     }
//     catch(err){
//         console.log("Error ", err)
//         return NextResponse.json({ error: err });
//     }
// }

// export async function DELETE(id: number) {
//     try {
//         const taskToBeDeleted = await pool.query('DELETE FROM todo_app WHERE id = $1', [id])
//         return NextResponse.json({
//             taskToBeDeleted
//         })
//       }
//       catch (err) {
//         console.log("Error ", err)
//         return NextResponse.json({ error: err });
//       }
// }