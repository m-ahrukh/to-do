'use client';

import { supabase } from '@/utils/supabase/client';

export function AddTaskForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const note = formData.get('note');

    console.log("note: ", note)

    if (!note) return;

      const randomString = crypto.randomUUID();
      const { error } = await supabase
        .from('todo_app')
        .insert([{ text: note, uuid: randomString }])
      if (error) {
        console.error('Error inserting data:', error)
        return
      }

      form.reset();
      window.location.reload();
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        name="note"
        placeholder="Add a task"
        className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%] mb-6"
        required
      />
      <button type="submit" className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">
        Submit
      </button>
    </form>
  );
}
