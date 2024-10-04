// 'use client';

// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabase/client';

// import Link from 'next/link';
// import { DeleteTaskForm } from './deleteTaskForm';
// import { TaskCompletion } from './TaskCompletion';
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// interface DataRow {
//     id: number;
//     text: string;
//     uuid: string;
//     status: string;
// }

// export default function ShowData() {
//     const [tasks, setTasks] = useState<DataRow[]>([]);
//     const [theme, setTheme] = useState('light');

//     useEffect(() => {
//         const savedTheme = localStorage.getItem('theme') || 'light';
//         setTheme(savedTheme);

//         const fetchData = async () => {
//             const { data, error } = await supabase
//                 .from('todo_app')
//                 .select('*')
//                 .neq('status', 'deleted')
//                 .order('id', { ascending: true });

//             if (error) {
//                 console.error('Error fetching data from Supabase:', error);
//             } else {
//                 setTasks(data || []);
//             }
//         };

//         fetchData();
//     }, []);

//     if (tasks.length === 0) {
//         return <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>;
//     }

//     return (
//         <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-4 shadow-md`}>
//             {tasks.map((dataRow) => (
//                 <div key={dataRow.id} className='flex flex-row gap-5 items-center'>
//                     <div className='flex flex-row gap-5 w-1/2 my-4'>
//                         <p className={`${dataRow.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
//                             {dataRow.text}
//                         </p>
//                     </div>
//                     <div className='w-1/2 flex flex-row gap-5 items-center justify-end'>
//                         <Link href={'/edit/' + dataRow.uuid}>
//                             <button className='bg-blue-700 font-bold text-white p-2 rounded-sm'>
//                                 <BorderColorOutlinedIcon />
//                             </button>
//                         </Link>
//                         <DeleteTaskForm id={dataRow.id} />
//                         <TaskCompletion id={dataRow.id} />
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }


'use client';
import React, { useEffect, useState } from 'react';
import { DataRow } from '../home/page';
import Link from 'next/link';

import { DeleteTaskForm } from './deleteTaskForm';
import { TaskCompletion } from './TaskCompletion';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

interface ShowDataProps{
  tasks: DataRow[] | undefined // Allow for undefined initially
}

const ShowData: React.FC<ShowDataProps> = ({tasks = []}) => { // set a default value for tasks
  const [theme, setTheme] = useState('light');

      if (tasks.length === 0) {
        return <p className='text-center text-gray-500 mt-5'>Phew, there is nothing to do</p>;
    }

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

  }, []);

  return (
    <div className={`border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-4 shadow-md`}>
      {tasks.map((dataRow) => (
        <div key={dataRow.id} className='flex flex-row gap-5 items-center'>
          <div className='flex flex-row gap-5 w-1/2 my-4'>
            <p className={`${dataRow.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {dataRow.text}
            </p>
          </div>
          <div className='w-1/2 flex flex-row gap-5 items-center justify-end'>
            <Link href={'/edit/' + dataRow.uuid}>
              <button className='bg-blue-700 font-bold text-white p-2 rounded-sm'>
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
