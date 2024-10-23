import { auth, signOut } from "@/auth";

export default async function Coach() {
  const session = await auth()

  
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button>sign out</button>
      </form>

      {JSON.stringify(session)}
    </>
  );
}
