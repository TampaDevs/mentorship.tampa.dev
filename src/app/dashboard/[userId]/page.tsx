interface DashboardHomePageProps {
  params: { userId: string };
}

export default function DashboardHomePage({ params }: DashboardHomePageProps) {
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>User ID: {params.userId}</p>
      {/* ... dashboard content ... */}
    </div>
  );
}
