import type { NextPage } from 'next';

interface DashboardProfilePageProps {
  params: Promise<{ userId: string }>;
}

const DashboardProfilePage: NextPage<DashboardProfilePageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <h1>Your Profile Overview</h1>
      <p>User ID: {userId}</p>
      {/* ... summary of user's profile ... */}
    </div>
  );
};

export default DashboardProfilePage;
