import type { NextPage } from "next";

interface MatchingSuggestionsPageProps {
  params: { userId: string };
}

const MatchingSuggestionsPage: NextPage<MatchingSuggestionsPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Matching Suggestions</h1>
      <p>User ID: {params.userId}</p>
      {/* ... suggestions content ... */}
    </div>
  );
};

export default MatchingSuggestionsPage;
