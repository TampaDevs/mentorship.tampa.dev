import type { NextPage } from "next";

interface DeclinePageProps {
  params: { userId: string; suggestionId: string };
}

const DeclinePage: NextPage<DeclinePageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Decline Suggestion</h1>
      <p>User ID: {params.userId}</p>
      <p>Suggestion ID: {params.suggestionId}</p>
      {/* ... decline content ... */}
    </div>
  );
};

export default DeclinePage;
