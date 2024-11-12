import type { NextPage } from 'next';

interface NotificationsPageProps {
  params: Promise<{ userId: string }>;
}

const NotificationsPage: NextPage<NotificationsPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <h1>Your Notifications</h1>
      <p>User ID: {userId}</p>
      {/* ... display notifications ... */}
    </div>
  );
};

export default NotificationsPage;
