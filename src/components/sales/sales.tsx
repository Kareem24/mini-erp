import { fetchSelectedProducts } from "@/lib/data-service/get-all-products";
import { fetchSelectedCustomers } from "@/lib/data-service/get-customers";
import SalesForm from "./sales-form";

const Sales = async () => {
  const products = await fetchSelectedProducts();
  const customers = await fetchSelectedCustomers();
  return (
    <div className=" ">
      <SalesForm products={products || []} customers={customers || []} />
    </div>
  );
};

export default Sales;
