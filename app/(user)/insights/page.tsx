import FeedbackInsights from '@/components/feebackInsights';

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <FeedbackInsights projectId={27} />
    </div>
  );
}