import type { NextPage } from 'next';

interface DashboardHomePageProps {
  params: Promise<{ userId: string }>;
}

const DashboardHomePage: NextPage<DashboardHomePageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>User ID: {userId}</p>
      {/* ... dashboard content ... */}
    </div>
  );
};

export default DashboardHomePage;
