import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const skills = await api.skill.getSkills();

  return (
    <HydrateClient>
      <div className="py-5">
        <h1 className="text-2xl font-black">Home</h1>
        <div className="divide-y">
          {skills ? (
            skills.map((skill, idx) => {
              return (
                <div key={idx} className="py-3">
                  <h2>{skill.name}</h2>
                  <p className="text-sm text-neutral-500">Slug: {skill.slug}</p>
                </div>
              );
            })
          ) : (
            <p>No users</p>
          )}
        </div>
      </div>
    </HydrateClient>
  );
}
