import { logout } from "@/actions/auth";

export default async function Home() {
  return (
    <main>
      Home page
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </main>
  );
}
