import React from 'react';
import { ProjectList } from '@/components/projectList';
import { SubscribeBtn } from '@/app/(user)/payments/subscribe-btn';
import { monthlyPlanId } from '@/lib/payments';
import { Boxes } from 'lucide-react';

const Dashboard = async () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Boxes className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
            <SubscribeBtn price={monthlyPlanId} />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="h-1 w-32 bg-indigo-600 rounded"></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
        <div className="space-y-6">
          <ProjectList />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">Active Projects</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">12</span>
            <span className="ml-2 text-sm text-gray-500">projects</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">Storage Used</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">64%</span>
            <span className="ml-2 text-sm text-gray-500">of 1TB</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">Subscription</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">Pro</span>
            <span className="ml-2 text-sm text-gray-500">plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;