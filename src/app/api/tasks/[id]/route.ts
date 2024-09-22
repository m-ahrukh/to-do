import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(uuid: any) {
    const data = await pool.query("select * from todo_app todo where uuid = $1 ", [uuid])
    const result = data.rows[0]
    return NextResponse.json({
        result
    })
}