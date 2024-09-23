import dbConnect, { pool } from "@/utils/dbConnect";
import { redirect } from "next/navigation";

export default async function Edit({ params }: { params: { id: string } }) {

  dbConnect()
  const id = params.id

  if (!id) {
    return <p>Invalid task!</p>;  // Handle invalid task scenario
  }

  const data = await pool.query("select * from todo_app todo where uuid = $1 ", [id])
  const res = data.rows[0]
 
  // const response = await GET(id)
  // const responseData = await NextResponse.json({res});

  if (!res) {
    return null;
  }

  // onsole.log("response Data: ", responseData)
  const result = res;

  async function editTask(data: FormData) {
    'use server'
    const note = data.get('note')?.valueOf()

    if (note) {
      // await PATCH({ note, id })
      await pool.query("UPDATE todo_app SET text = $1 WHERE uuid = $2 RETURNING *", [note, id])
      redirect('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='m-5 justify-center items-center'>
        <h1 className='text-center mb-3 mx-5 font-semibold'>
          Edit Task
        </h1>
        <form action={editTask} className='flex flex-col justify-center items-center'>
          <input type='text' name='note' id='note' placeholder='Add Note'
            defaultValue={result.text}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] mb-6' required />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}