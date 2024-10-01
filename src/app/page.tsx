'use server'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { AddTaskForm } from './components/AddTaskForm';
import { DeleteTaskForm } from './components/deleteTaskForm';
import ShowData from './components/showData';

export interface DataRow {
  id: number;
  text: string;
  uuid: string;
}

export default async function Home({ theme }: { theme: string }) {

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

{/* Show Data */}
      <ShowData/>
    </main >
  );
}