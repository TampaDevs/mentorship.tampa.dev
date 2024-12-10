import type { NextPage } from 'next';

interface SuggestionsPageProps {
  params: Promise<{ order: 'asc' | 'desc' }>;
}

const SuggestionsPage: NextPage<SuggestionsPageProps> = async ({}) => {
  return (
    <div>
      <h1>Mentorship Suggestions</h1>

      {/* ... list suggestions for the user ... */}
    </div>
  );
};

export default SuggestionsPage;
