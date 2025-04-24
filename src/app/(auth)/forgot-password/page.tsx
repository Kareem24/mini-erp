import { forgotPasswordAction } from "@/aciton";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
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
import Link from "next/link";

const ForgetPasswordPage = async (props: {
  searchParams: Promise<Message>;
}) => {
  const searchParams = await props.searchParams;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                <p className="text-sm text-secondary-foreground">
                  Already have an account?{" "}
                  <Link className="text-primary underline" href="/login">
                    Sign in
                  </Link>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={forgotPasswordAction}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      name="email"
                    />
                  </div>

                  <SubmitButton formAction={forgotPasswordAction}>
                    Reset Password
                  </SubmitButton>
                  <FormMessage message={searchParams} />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
