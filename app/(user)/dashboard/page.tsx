import React from 'react';
import { Label } from '@/components/ui/label';
import { CreateProject } from "@/components/createProject";
import { ProjectList } from '@/components/projectList';

async function Dashboard() {
  // const users = await db.select().from(projects) 
  // console.log("db detrails", users)
  return (
    <div className="flex flex-col justify-center">
      <div className='flex justify-center'>
      <Label className="font-sans text-gray-900 mt-9 text-xl lg:text-3xl flex items-center">
        Your Projects
        <div className="ml-2">
        <CreateProject variant="circle" icon="circle-plus" />
        </div>
      </Label>
      </div>
    
      <div className=' flex justify-center pt-5'>
        <ProjectList/>
      </div>
    </div>
  );
}

export default Dashboard;