import type { NextPage } from "next";

interface MentorshipDetailsPageProps {
  params: { userId: string; mentorshipId: string };
}

const MentorshipDetailsPage: NextPage<MentorshipDetailsPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Mentorship Details</h1>
      <p>User ID: {params.userId}</p>
      <p>Mentorship ID: {params.mentorshipId}</p>
      {/* ... details content ... */}
    </div>
  );
};

export default MentorshipDetailsPage;
