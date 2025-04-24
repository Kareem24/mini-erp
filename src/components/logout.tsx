"use client";

import { signOutAction } from "@/aciton";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={"outline"}>
        Logout
      </Button>
    </form>
  );
}
