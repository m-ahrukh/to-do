import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Edit({ params }: { params: { id: string } }) {

  const id = params.id
  if (!id) {
    return <p>Invalid task!</p>;  
  }

  const { data: task, error } = await supabase
    .from('todo_app')
    .select('*')
    .eq('uuid', id)
    .single()

    if (error || !task) {
      console.error("Error fetching task:", error);
      return <p>Invalid task or task not found!</p>;
    }

  async function editTask(data: FormData) {
    'use server'
    const note = data.get('note')?.valueOf()

    if (note) {
      const { error } = await supabase
        .from('todo_app')
        .update({ text: note })  
        .eq('uuid', id);         

      if (error) {
        console.error("Error updating task:", error);
        return;
      }

      redirect('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className='w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg'>
        <h1 className='text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white'>
          Edit Task
        </h1>
        <form action={editTask} className='flex flex-col space-y-4'>
          <input 
          type='text' 
          name='note' 
          id='note' 
          placeholder='Add Note'
            defaultValue={task.text}
            className='shadow-sm border rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white' required />
          <button 
          type='submit' 
          className='bg-orange-500 text-white font-bold p-3 rounded-md hover:bg-red-600 transition-colors'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}