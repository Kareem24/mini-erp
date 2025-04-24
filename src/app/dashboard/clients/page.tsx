import { AddClientForm } from "@/components/clients/add-client-form";
import { ClientTable } from "@/components/clients/client-table";
import { ShowModal } from "@/components/form-modal";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { PlusCircle } from "lucide-react";

const ClientPage = async () => {
  const supabase = await createClient();

  const { data: clients, error } = await supabase.from("clients").select("*");
  console.log("CLIENTS", clients);
  if (error) {
    console.error("Error fetching clients:", error);
    return <div>Error fetching clients</div>;
  }

  return (
    <>
      <div className="my-6 w-full px-4 lg:px-6">
        <ShowModal
          modalTitle="Add New Client"
          modalDescription="Add a new client to the database"
          btn={
            <div className="w-full">
              <Button className="w-max ml-auto">
                <span>
                  <PlusCircle className="w-4 h-4" />
                </span>
                <span>Create</span>
              </Button>
            </div>
          }
        >
          <AddClientForm />
        </ShowModal>
      </div>
      <ClientTable data={clients} />
    </>
  );
};

export default ClientPage;
