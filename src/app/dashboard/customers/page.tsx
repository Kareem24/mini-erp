import { getCustomers } from "@/api/get-customers";
import CustomerForm from "@/components/customers/customer-form";
import DeleteCustomer from "@/components/customers/delete-customer";
import { FormModal } from "@/components/form-modal";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

const CustomerPage = async ({ searchParams }) => {
  const params = await searchParams;

  const filter = {
    search: params.search || "",
  };
  const { data, error } = await getCustomers(filter);

  if (error) {
    console.error("Error fetching customers:", error.message);
    return (
      <div className="p-6">{`Error fetching customers ${error.message}`}</div>
    );
  }

  if (!data || (data.length === 0 && !filter.search)) {
    return (
      <div className="p-6 mx-auto text-center">
        <p className="capitalize font-semibold">No customers found</p>
        <p>Add a customer</p>

        <FormModal
          form={<CustomerForm />}
          modalTitle="Add Customer"
          modalDescription="Add New Customer To The list"
        >
          <Button className="flex items-center gap-2 mt-4">
            <span>
              <PlusCircle />
            </span>
            <span className="text-sm">Add Customer</span>
          </Button>
        </FormModal>
      </div>
    );
  }
  return (
    <div className="p-4  md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Customers ({data.length})</h1>
          <SearchInput />
        </div>
        <div className="flex items-center gap-2">
          {/* <FilterProduct /> */}
          <FormModal
            form={<CustomerForm />}
            modalDescription="Add New Customer To The list"
            modalTitle="Add Customer"
          >
            <Button className="flex items-center gap-2">
              <span>
                <PlusCircle />
              </span>
              <span className="hidden md:block">Add Customer</span>
            </Button>
          </FormModal>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Phone</TableHead>
            <TableHead className="text-left">Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.full_name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell className="text-right space-x-2">
                <FormModal
                  form={<CustomerForm id={customer.id} data={customer} />}
                  modalDescription="
                  Edit Customer Details"
                  modalTitle="Edit customer"
                >
                  <Button variant={"outline"} size="sm">
                    Edit
                  </Button>
                </FormModal>
                <DeleteCustomer customerId={customer.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerPage;
