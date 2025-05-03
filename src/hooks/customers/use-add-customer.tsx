import { revalidateRoutePath } from "@/actions/revalidate-route";
import { CustomerFormValue } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { validateUser } from "../../utils/validate-user";

const addCustomer = async (customerData: CustomerFormValue) => {
  const supabase = createClient();
  const { user } = await validateUser();

  return await supabase
    .from("customers")
    .insert([{ ...customerData, user_id: user.id }])
    .select();
};

export const useAddCustomer = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addCustomer,
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
