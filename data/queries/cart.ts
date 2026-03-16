import { cookies } from "next/headers";
import { delay } from "@/data/db";

export async function getCartCount(): Promise<number> {
  await delay(500);
  const cookieStore = await cookies();
  return parseInt(cookieStore.get("cart-count")?.value ?? "0", 10);
}
