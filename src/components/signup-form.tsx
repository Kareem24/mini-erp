import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SignupFormProps {
  message?: string;
}

export async function signup(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const origin = headers().get("origin") || "http://localhost:3000";

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // and handle errors properly
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    redirect("/signup?message=missing email or password");
  }

  const { error } = await supabase.auth.signUp({
    ...data,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    redirect("/signup?message=unable to create account");
  }

  redirect(
    `/confirm?message=check your email ${data.email} for confirmation link`
  );
}

export function SignupForm({ message }: SignupFormProps) {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            {message ? message : "Enter your email below to Sign up an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Do you have an account?{" "}
              <Link href="login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
