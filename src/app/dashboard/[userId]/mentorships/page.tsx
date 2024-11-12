import type { NextPage } from "next";

interface MentorshipsPageProps {
  params: { userId: string };
}

const MentorshipsPage: NextPage<MentorshipsPageProps> = async ({ params }) => {
  const { userId } = params;

  return (
    <div>
      <h1>Your Mentorships</h1>
      <p>User ID: {userId}</p>
      {/* ... list of active mentorships ... */}
    </div>
  );
};

export default MentorshipsPage;
