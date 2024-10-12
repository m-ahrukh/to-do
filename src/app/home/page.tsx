'use client'
import { useEffect, useState } from 'react';
import { AddTaskForm } from '../components/AddTaskForm';
import ShowData from '../components/showData';
import { supabase } from '@/utils/supabase/client';

export interface DataRow {
  id: number;
  text: string;
  uuid: string;
  status: string;
}

export default function MainPage() {
  const [tasks, setTasks] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async ()=>{
    const {data:userResponse, error:userError} = await supabase.auth.getUser();
    if (userError){
      console.error('Error fetching user:', userError)
      return
    }

    if(!userResponse?.user){
      alert('You must be logged in to view your task.')
      return
    }

    const userId = userResponse.user.id
    const {data, error} = await supabase
    .from('todo_app')
    .select('*')
    .neq('status','deleted')
    .eq('user_id', userId)
    .order('id', {ascending: true})

    if (error){
      console.log('Error fetching tasks:', error)
    }
    else{
      setTasks(data || []);
    }
    setLoading(false)
  }

  // Always call useEffect on component mount
  useEffect(() => {
    fetchTasks();
  }, []);  // This useEffect should not be inside any condition or conditional return

  const handleTaskAdded = () =>{
    fetchTasks(); //Refetch tasks when a new task is added
  }
  return (
    <main className='mt-10 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8'>
      <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-center mb-6'>To Do Application</h1>
      <div className='w-full max-w-sm sm:max-w-md lg:max-w-lg mb-5'>
        <h2 className='text-center text-lg sm:text-xl mb-5 font-semibold'>
          Add Task
        </h2>
        <AddTaskForm onTaskAdded={handleTaskAdded}/>
      </div>
      {loading ? <p className='text-gray-500 text-center'>Loading tasks...</p> : <ShowData tasks={tasks} />}
    </main >
  );
}