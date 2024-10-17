import { cookies } from "next/headers";
import { get } from "../utils/customFetch";
import { User } from "@fiverr/shared";
import { sleep } from "../utils";

export async function getUser(): Promise<User | null> {
  try {
    const userSession = await get<User>("/auth/session", {
      isCookie: cookies().toString(),
    });
    return userSession;
  } catch (error) {
    return null;
  }
}
