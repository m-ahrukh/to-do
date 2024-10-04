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
      console.log('Error fetching user:', userError)
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
  useEffect(()=>{
    fetchTasks()
  }, [])

  const handleTaskAdded = () =>{
    fetchTasks(); //Refetch tasks when a new task is added
  }
  return (
    <main className=' mt-10 flex flex-col justify-center items-center '>
      <h1 className='font-bold' style={{ fontSize: '24px' }}>To Do Application</h1>
      <div className='mb-3 mx-5'>
        <h1 className='text-center m-5 font-semibold'>
          Add Task
        </h1>
        <AddTaskForm onTaskAdded={handleTaskAdded}/>
      </div>
      {loading ? <p>Loading tasks...</p> : <ShowData tasks={tasks} />}
    </main >

  );
}