import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { type NextRequest } from "next/server";
import { type User } from "../payload-types";

export async function getServerSideUser(
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) {
  const token = cookies.get("payload-token")?.value;

  const currentUser = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  const { user } = (await currentUser.json()) as { user: User };

  return { user };
}
