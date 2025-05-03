import { revalidateRoutePath } from "@/actions/revalidate-route";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

const deleteProduct = async (id: string) => {
  const supabase = createClient();
  return await supabase.from("products").delete().eq("id", id);
};

export const useDeleteProduct = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: ({ data }) => {
      revalidateRoutePath();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isPending };
};
