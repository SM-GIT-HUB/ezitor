import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server"

async function Home() {
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      Home
      <SignInButton/>
      <SignOutButton/>
    </div>
  )
}

export default Home