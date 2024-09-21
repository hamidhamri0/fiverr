import { cookies } from "next/headers";
import { get } from "../utils/customFetch";
import { User } from "@/stores/UserInfoStore";

export async function getUser(): Promise<User | null> {
  try {
    const userSession = await get<User>("/auth/session", {
      isCookie: cookies().toString(),
    });
    return userSession;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
