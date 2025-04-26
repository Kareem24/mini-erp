import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DeleteModalProps {
  children: React.ReactNode;
  modalTitle: string;
  modalDescription: string;
  id: string;
  open: boolean;
  isPending: boolean;
  handleDelete: (id: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({
  children,
  modalTitle,
  modalDescription,
  open,
  id,
  isPending,
  setOpen,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-500 text-white px-4 py-2 rounded"
          variant={"destructive"}
          size={"sm"}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={isPending}
          >
            {isPending ? "Deleting" : " Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
