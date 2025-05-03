"use server";

import { revalidatePath } from "next/cache";

export async function revalidateRoutePath(path = "/dashboard/products") {
  revalidatePath(path);
}
