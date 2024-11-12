import type { NextPage } from "next";

interface MentorshipStatusPageProps {
  params: { userId: string; mentorshipId: string };
}

const MentorshipStatusPage: NextPage<MentorshipStatusPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Mentorship Status</h1>
      <p>User ID: {params.userId}</p>
      <p>Mentorship ID: {params.mentorshipId}</p>
      {/* ... status content ... */}
    </div>
  );
};

export default MentorshipStatusPage;
