import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/api";

export default async function Home() {
  const user: User | null = await currentUser();

  
  return (
    <>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
