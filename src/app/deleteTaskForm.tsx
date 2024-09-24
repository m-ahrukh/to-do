'use client';

import { supabase } from '@/utils/supabase/client';

interface DeleteTaskFormProps {
    id: number; // Accept id as a prop
}


export function DeleteTaskForm({id}:DeleteTaskFormProps) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("id: ", id)

        // const form = e.target as HTMLFormElement;
        // const formData = new FormData(form);
        // const id = formData.get('id');

        if (!id) return;

        const { error } = await supabase
            .from('todo_app')
            .delete()
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
            <button className='bg-red-600 font-bold text-white p-2 rounded-sm' type='submit'>DELETE</button>
        </form>
    );
}
