import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Download, Filter, Search } from 'lucide-react';
import { getFeedbacks } from '@/index';

const FeedbacksPage = async({ params }: { params: { projectId: number } }) => {
  const { projectId } = await params;
  const feedbacks = await getFeedbacks(projectId);
  
  if(feedbacks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No feedbacks yet</h3>
              <p className="mt-2 text-gray-500">Start collecting valuable insights from your users.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgRating = feedbacks.reduce((acc, curr) => acc + curr.stars, 0) / feedbacks.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">Total Responses</div>
              <div className="text-2xl font-bold mt-2">{feedbacks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">Average Rating</div>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold mr-2">{avgRating.toFixed(1)}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.round(avgRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">Latest Response</div>
              <div className="text-2xl font-bold mt-2">
                {new Date(feedbacks[0].created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="border-b bg-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Feedback Responses</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Filter size={16} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Download size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {feedbacks.map((feedback, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{feedback.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{feedback.feedback}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < feedback.stars
                                  ? 'text-yellow-400 fill-yellow-400'
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

            <div className="flex items-center justify-between px-6 py-4 bg-white border-t">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{feedbacks.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
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