import type { NextPage } from "next";

interface AcceptPageProps {
  params: { userId: string; suggestionId: string };
}

const AcceptPage: NextPage<AcceptPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Accept Suggestion</h1>
      <p>User ID: {params.userId}</p>
      <p>Suggestion ID: {params.suggestionId}</p>
      {/* ... accept content ... */}
    </div>
  );
};

export default AcceptPage;
