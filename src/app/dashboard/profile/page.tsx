import type { NextPage } from 'next';

interface DashboardProfilePageProps {
  params: Promise<{ order: 'asc' | 'desc' }>;
}

const DashboardProfilePage: NextPage<DashboardProfilePageProps> = async ({}) => {
  return (
    <div>
      <h1>Your Profile Overview</h1>
      {/* ... summary of user's profile ... */}
    </div>
  );
};

export default DashboardProfilePage;
