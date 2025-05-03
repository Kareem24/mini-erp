import { revalidateRoutePath } from "@/actions/revalidate-route";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

const deleteCustomer = async (id: string) => {
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

  return await supabase.from("customers").delete().eq("id", id);
};

export const useDeleteCustomer = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      console.log("Customer Deleted successfully");
      revalidateRoutePath("/dashboard/customers");
    },
  });

  return { mutate, isPending };
};
