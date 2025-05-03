import { revalidateRoutePath } from "@/actions/revalidate-route";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

const markAsPaid = async (invoiceId: string) => {
  const supabase = await createClient();
  return await supabase
    .from("invoices")
    .update({ status: "Paid" })
    .eq("id", invoiceId);
};

export const useMarkAsPaid = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: markAsPaid,
    onSuccess: (data) => {
      revalidateRoutePath("/dashboard/invoices/[invoiceId]");
    },
    onError: (error) => {
      console.error("Error marking invoice as paid", error);
    },
  });
  return { mutate, isPending };
};
