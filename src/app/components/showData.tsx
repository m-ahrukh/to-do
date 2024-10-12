'use client';
import React, { useEffect, useState } from 'react';
import { DataRow } from '../home/page';
import Link from 'next/link';

import { DeleteTaskForm } from './deleteTaskForm';
import { TaskCompletion } from './TaskCompletion';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

interface ShowDataProps {
  tasks: DataRow[] | undefined // Allow for undefined initially
}

const ShowData: React.FC<ShowDataProps> = ({ tasks = [] }) => { // set a default value for tasks
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);
  if (tasks.length === 0) {
    return <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>;
  }

  return (
    <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-4 shadow-md mb-5`}>
      {tasks.map((dataRow) => (
        <div key={dataRow.id} className='flex flex-col sm:flex-row gap-4 sm:gap-5 items-center border-b pb-4 mb-4'>
          <div className='flex flex-1 gap-5 w-full sm:w-1/2'>
            <p className={`${dataRow.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {dataRow.text}
            </p>
          </div>
          <div className='flex flex-row gap-2 sm:gap-4 items-center justify-end w-full sm:w-1/2'>
            <Link href={'/edit/' + dataRow.uuid}>
              <button className='bg-blue-600 font-bold text-white p-2 rounded-md'>
                <BorderColorOutlinedIcon />
              </button>
            </Link>
            <DeleteTaskForm id={dataRow.id} />
            <TaskCompletion id={dataRow.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowData;
