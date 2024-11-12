import type { NextPage } from 'next';

interface MentorshipsPageProps {
  params: Promise<{ userId: string }>;
}

const MentorshipsPage: NextPage<MentorshipsPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <h1>Your Mentorships</h1>
      <p>User ID: {userId}</p>
      {/* ... list of active mentorships ... */}
    </div>
  );
};

export default MentorshipsPage;
