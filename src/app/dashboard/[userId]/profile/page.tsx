import type { NextPage } from "next";

interface DashboardProfilePageProps {
  params: { userId: string };
}

const DashboardProfilePage: NextPage<DashboardProfilePageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Your Profile Overview</h1>
      <p>User ID: {params.userId}</p>
      {/* ... summary of user's profile ... */}
    </div>
  );
};

export default DashboardProfilePage;
