// src/app/components/ShowData.tsx
'use client';  // Use client directive for useEffect and localStorage access.

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

import Link from 'next/link';
import { DeleteTaskForm } from './deleteTaskForm';

interface DataRow {
  id: number;
  text: string;
  uuid: string;
}

export default function ShowData() {
  const [tasks, setTasks] = useState<DataRow[]>([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Retrieve theme from local storage.
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Fetch data from Supabase.
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('todo_app')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else {
        setTasks(data || []);
      }
    };

    fetchData();
  }, []);

  if (tasks.length === 0) {
    return <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>;
  }

  return (
    <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-4 shadow-md`}>
      {tasks.map((dataRow) => (
        <div key={dataRow.id} className='flex flex-row gap-5 items-center'>
          <div className='flex flex-row gap-5 w-1/2 my-4'>
            <p>{dataRow.text}</p>
          </div>
          <div className='w-1/2 flex flex-row gap-5 items-center justify-end'>
            <Link href={'/edit/' + dataRow.uuid}>
              <button className='bg-cyan-600 font-bold text-white p-2 rounded-sm'>
                <img src='/updateTask.png' alt='UPDATE' width={27} height={27} />
              </button>
            </Link>
            <DeleteTaskForm id={dataRow.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
