'use client';

import { supabase } from '@/utils/supabase/client';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface DeleteTaskFormProps {
  id: number;
}

export function DeleteTaskForm({ id }: DeleteTaskFormProps) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    const { error } = await supabase
      .from('todo_app')
      .update({ status: 'deleted' })
      .eq('id', id);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="inline">
      <input type='text' name="id" value={id} hidden />
      <button type='submit' className='bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto'><DeleteForeverOutlinedIcon className="w-5 h-5"/></button>
    </form>
  );
}
