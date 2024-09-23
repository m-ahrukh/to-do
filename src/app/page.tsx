import Link from 'next/link'
import { GET} from "./api/route";
import { redirect } from 'next/navigation'
import { AddTaskForm } from './AddTaskForm';
import { pool } from '@/utils/dbConnect';

interface DataRow {
  id: number;
  text: string;
  uuid: string;
}

export default async function Home() {

  const response = await GET()
  const responseData = await response.json()
  if (!responseData) {
    return null
  }
  const result: DataRow[] = responseData.result || []

  //Insert Query
  async function addTask(data: FormData) {
    'use server'
    const note = data.get("note")?.toString();

    // await POST(note)
    const randomString = crypto.randomUUID();
    await pool.query("INSERT INTO todo_app(text, uuid) VALUES ($1, $2) RETURNING *", [note, randomString])

    redirect('/')
  }

  //Delete Query
  async function deleteTask(data: FormData) {
    'use server'
    const id = data.get('id')?.valueOf()
    // await DELETE(id)
    await pool.query('DELETE FROM todo_app WHERE id = $1', [id])
    redirect('/')
  }

  return (
    <>
      <main className=' mt-10 flex flex-col justify-center items-center '>
        <h1 className='font-bold' style={{ fontSize: '24px' }}>To Do Application</h1>
        <div className='mb-3 mx-5'>
          <h1 className='text-center m-5 font-semibold'>
            Add Task
          </h1>
          <AddTaskForm onSubmit={addTask} />
        </div>

        {result.length === 0 ? (
          <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>
        ) : (
          result.map((dataRow: DataRow) => {

            return (
              <div key={dataRow.id} className='flex flex-row mt-4'>
                <div className='flex flex-row gap-5 w-1/2 my-4'>
                  <p>{dataRow.text}</p>
                </div>
                <div className='w-1/2 flex flex-row gap-5 my-2'>
                  <Link href={'/edit/' + dataRow.uuid}>
                    <button className='bg-cyan-600 font-bold text-white p-2 rounded-sm'>UPDATE</button>
                  </Link>
                  <form action={deleteTask}>
                    <input type='text' name="id" value={dataRow.id} hidden />
                    <button className='bg-red-600 font-bold text-white p-2 rounded-sm' type='submit'>DELETE</button>
                  </form>
                </div>
              </div>
            )
          })
        )
        }
      </main>
    </>
  );
}