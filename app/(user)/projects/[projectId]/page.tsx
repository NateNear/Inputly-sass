import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Download, Filter, Search, MessageSquare, TrendingUp, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeedbacks } from '@/index';
import Link from 'next/link';
import { Code2 } from 'lucide-react';

type PageProps = Promise<{
  projectId: number;
}>;

const FeedbacksPage = async({ params }: { params: PageProps }) => {
  const { projectId } = await params;
  const feedbacks = await getFeedbacks(projectId);
  
  if(feedbacks.length === 0) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="w-full max-w-3xl transform transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <MessageSquare className="h-12 w-12 text-indigo-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No feedback yet</h3>
              <p className="mt-4 text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                Start collecting valuable insights from your users. Your feedback will appear here once users start responding.
              </p>
              <Link
                href={`/instructions/${projectId}`}
                className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md"
              >
                <Code2 size={20} />
                <span className="font-medium">Get Widget Code</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgRating = feedbacks.reduce((acc, curr) => acc + (curr.stars ?? 0), 0) / feedbacks.length; 

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center backdrop-blur-sm bg-white/70 p-6 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-black bg-clip-text">
            Feedback Dashboard
          </h1>
          <div className="flex items-center space-x-4">
          <Link
              href={`/insights/${projectId}`}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-md"
            >
              <TrendingUp size={18} />
              <span className="font-medium">View Insights</span>
            </Link>

            <Link
              href={`/instructions/${projectId}`}
              className="flex items-center space-x-2 px-5 py-2.5 border-2 border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              <Code2 size={18} />
              <span className="font-medium">Widget Code</span>
            </Link>
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-md">
              <Download size={18} />
              <span className="font-medium">Export Data</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transform transition-all hover:scale-105 duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Responses</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{feedbacks.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-inner">
                  <MessageSquare className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all hover:scale-105 duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Rating</p>
                  <div className="flex items-center mt-2">
                    <span className="text-4xl font-bold text-gray-900 mr-3">{avgRating.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < Math.round(avgRating)
                              ? 'text-yellow-400 fill-yellow-400 drop-shadow-md'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-inner">
                  <TrendingUp className="h-7 w-7 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all hover:scale-105 duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Latest Response</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    Invalid Date
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-inner">
                  <Calendar className="h-7 w-7 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg bg-white/80 backdrop-blur-sm border-0">
          <CardHeader className="border-b border-gray-100 bg-white/50 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <CardTitle className="text-2xl font-bold bg-clip-text text-black">
                Feedback Responses
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                  <Filter size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbacks.map((feedback, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner">
                            <span className="text-sm font-medium text-indigo-600">
                              {feedback.email ? feedback.email[0].toUpperCase() : ''}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{feedback.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xl">{feedback.feedback}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < (feedback.stars ?? 0)
                                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 bg-white/50 border-t border-gray-100 space-y-4 md:space-y-0">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{feedbacks.length}</span> results
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1">
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1">
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbacksPage;