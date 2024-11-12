import type { NextPage } from "next";

interface SuggestionsPageProps {
  params: { userId: string };
}

const SuggestionsPage: NextPage<SuggestionsPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Mentorship Suggestions</h1>
      <p>User ID: {params.userId}</p>
      {/* ... list suggestions for the user ... */}
    </div>
  );
};

export default SuggestionsPage;
