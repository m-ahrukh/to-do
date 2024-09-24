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
    <div className="min-h-screen flex items-center justify-center">
      <div className='m-5 justify-center items-center'>
        <h1 className='text-center mb-3 mx-5 font-semibold'>
          Edit Task
        </h1>
        <form action={editTask} className='flex flex-col justify-center items-center'>
          <input type='text' name='note' id='note' placeholder='Add Note'
            defaultValue={task.text}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] mb-6' required />
          <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}