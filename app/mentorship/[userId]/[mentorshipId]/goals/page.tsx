import type { NextPage } from "next";

interface MentorshipGoalsPageProps {
  params: { userId: string; mentorshipId: string };
}

const MentorshipGoalsPage: NextPage<MentorshipGoalsPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Mentorship Goals</h1>
      <p>User ID: {params.userId}</p>
      <p>Mentorship ID: {params.mentorshipId}</p>
      {/* ... goals content ... */}
    </div>
  );
};

export default MentorshipGoalsPage;
