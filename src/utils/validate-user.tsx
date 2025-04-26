import { createClient } from "@/utils/supabase/client";

export const validateUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Something went wrong ${error?.message}`);
  }

  if (!user) {
    throw new Error("Not Authenticated");
  }

  return { user };
};
