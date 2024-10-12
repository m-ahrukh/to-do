//responsiveness pending
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
    <form onSubmit={handleSubmit}>
      <input type='text' name="id" value={id} hidden />

      <button className='bg-red-600 font-bold text-white p-2 rounded-sm' type='submit'><DeleteForeverOutlinedIcon /></button>
    </form>
  );
}
