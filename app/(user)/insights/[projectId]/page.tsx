import { getFeedbacks } from '@/index';
import FeedbackAnalysisClient from '@/components/feedbackAnalysisComponent';

type PageProps = Promise<{
  projectId: string
}>;


export default async function ProjectPage({ params }: { params: PageProps }) {
  const { projectId } = await params;
  const feedbacks = await getFeedbacks(Number(projectId));
const first10Feedbacks = feedbacks.slice(0, 10).map(feedback => ({
  feedback: feedback.feedback || '',
  stars: feedback.stars || 0
}));
return (
  console.log(projectId),
  <div>
  
   <FeedbackAnalysisClient initialFeedbacks={first10Feedbacks} />
  </div>
);
}