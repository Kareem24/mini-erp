import { revalidateRoutePath } from "@/actions/revalidate-route";
import { CustomerFormValue } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { validateUser } from "@/utils/validate-user";
import { useMutation } from "@tanstack/react-query";

const editCustomer = async ({
  customerData,
  id,
}: {
  customerData: CustomerFormValue;
  id: string;
}) => {
  const supabase = createClient();
  const { user } = await validateUser();

  return await supabase
    .from("customers")
    .update({ ...customerData, user_id: user.id })
    .eq("id", id)
    .select();
};

export const useEditCustomer = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: editCustomer,
    onSuccess: () => {
      revalidateRoutePath("/dashboard/customers");
      console.log("customer added successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { mutate, isPending };
};
