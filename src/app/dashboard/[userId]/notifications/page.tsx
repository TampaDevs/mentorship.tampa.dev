import type { NextPage } from "next";

interface NotificationsPageProps {
  params: { userId: string };
}

const NotificationsPage: NextPage<NotificationsPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Your Notifications</h1>
      <p>User ID: {params.userId}</p>
      {/* ... display notifications ... */}
    </div>
  );
};

export default NotificationsPage;
