import type { NextPage } from "next";

interface MentorshipChatPageProps {
  params: { userId: string; mentorshipId: string };
}

const MentorshipChatPage: NextPage<MentorshipChatPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Mentorship Chat</h1>
      <p>User ID: {params.userId}</p>
      <p>Mentorship ID: {params.mentorshipId}</p>
      {/* ... chat content ... */}
    </div>
  );
};

export default MentorshipChatPage;
