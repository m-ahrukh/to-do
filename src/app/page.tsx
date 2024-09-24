'use server'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { AddTaskForm } from './AddTaskForm';
import { DeleteTaskForm } from './DeleteTaskForm';

export interface DataRow {
  id: number;
  text: string;
  uuid: string;
}

export default async function Home() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: tasks, error } = await supabase
    .from('todo_app')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching data from Supabase: ", error);
    return <p>Error loading tasks</p>;
  }

  console.log("tasks ", tasks)
  const noTasksMessage = (
    <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>
  );

  return (

    <main className=' mt-10 flex flex-col justify-center items-center '>
      <h1 className='font-bold' style={{ fontSize: '24px' }}>To Do Application</h1>
      <div className='mb-3 mx-5'>
        <h1 className='text-center m-5 font-semibold'>
          Add Task
        </h1>
        <AddTaskForm />
      </div>

      {tasks.length === 0 ? noTasksMessage : (
        tasks.map((dataRow: DataRow) => (
          <div key={dataRow.id} className='flex flex-row mt-4'>
            <div className='flex flex-row gap-5 w-1/2 my-4'>
              <p>{dataRow.text}</p>
            </div>
            <div className='w-1/2 flex flex-row gap-5 my-2'>
              <Link href={'/edit/' + dataRow.uuid}>
                <button className='bg-cyan-600 font-bold text-white p-2 rounded-sm'>UPDATE</button>
              </Link>
              <DeleteTaskForm id={dataRow.id} />
            </div>
          </div>
        ))
      )
      }
    </main >
  );
}