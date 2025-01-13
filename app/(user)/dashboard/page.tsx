import React from 'react';
import { ProjectList } from '@/components/projectList';
import { Boxes } from 'lucide-react';

const Dashboard = async () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="ml-4 flex items-center space-x-3">
            <Boxes className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* <CreateProject 
              variant="default" 
              icon="plus"
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Project
            </CreateProject> */}
            {/* <SubscribeBtn price={monthlyPlanId} /> */}
          </div>
        </div>
        
        <div className="mt-4 ml-4">
          <div className="h-1 w-32 bg-indigo-600 rounded"></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
        <div className="space-y-6">
          <ProjectList />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;