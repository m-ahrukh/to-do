'use client';

import { supabase } from '@/utils/supabase/client';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import React from 'react';

interface CompleteTaskFormProps {
    id: number;
}

export function TaskCompletion({ id }: CompleteTaskFormProps) {

    const handleToggleStatus = async () => {
        if (!id) return;

        const { data, error: fetchError } = await supabase
            .from('todo_app')
            .select('status')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching current task status:', fetchError);
            return;
        }

        const newStatus = data?.status === 'completed' ? 'added' : 'completed';

        const { error: updateError } = await supabase
            .from('todo_app')
            .update({ status: newStatus })
            .eq('id', id);

        if (updateError) {
            console.error('Error updating task status:', updateError);
            return;
        }

        window.location.reload(); 
    }


    return (
        <button 
            className='bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto' 
            onClick={handleToggleStatus} 
            type='button'
            aria-label="Mark Task as Completed">
                <TaskOutlinedIcon className="w-5 h-5"/></button>
    );
}
