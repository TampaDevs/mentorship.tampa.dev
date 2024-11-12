import type { NextPage } from 'next';

interface SuggestionsPageProps {
  params: Promise<{ userId: string }>;
}

const SuggestionsPage: NextPage<SuggestionsPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <h1>Mentorship Suggestions</h1>
      <p>User ID: {userId}</p>
      {/* ... list suggestions for the user ... */}
    </div>
  );
};

export default SuggestionsPage;
