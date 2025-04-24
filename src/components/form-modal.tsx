import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface FormModalProps {
  children: React.ReactNode;
  form: React.ReactNode;
  modalTitle?: string;
  modalDescription?: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function FormModal({
  children,
  form,
  modalDescription,
  modalTitle,
  open,
  setOpen,
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
          {modalDescription && (
            <DialogDescription>{modalDescription}</DialogDescription>
          )}
        </DialogHeader>
        <div>{form}</div>
      </DialogContent>
    </Dialog>
  );
}
