'use server'
import { AddTaskForm } from '../components/AddTaskForm';
import ShowData from '../components/showData';

export interface DataRow {
  id: number;
  text: string;
  uuid: string;
}

export default async function MainPage() {
  return (
    <main className=' mt-10 flex flex-col justify-center items-center '>
      <h1 className='font-bold' style={{ fontSize: '24px' }}>To Do Application</h1>
      <div className='mb-3 mx-5'>
        <h1 className='text-center m-5 font-semibold'>
          Add Task
        </h1>
        <AddTaskForm />
      </div>
      <ShowData/>
    </main >

  );
}