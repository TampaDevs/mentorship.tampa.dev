import type { NextPage } from "next";

interface SettingsPageProps {
  params: { userId: string };
}

const SettingsPage: NextPage<SettingsPageProps> = async ({ params }) => {
  return (
    <div>
      <h1>Settings</h1>
      <p>User ID: {params.userId}</p>
      {/* ... settings content ... */}
    </div>
  );
};

export default SettingsPage;
