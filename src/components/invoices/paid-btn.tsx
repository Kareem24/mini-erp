"use client";
import { useMarkAsPaid } from "@/hooks/invoices/mark-as-paid";
import { Button } from "../ui/button";

const PaidBtn = ({ id }: { id: string }) => {
  const { mutate, isPending } = useMarkAsPaid();
  return (
    <Button
      className="w-min "
      size={"lg"}
      onClick={() => mutate(id)}
      disabled={isPending}
    >
      {isPending ? "loading..." : "Mark as Paid"}
    </Button>
  );
};

export default PaidBtn;
