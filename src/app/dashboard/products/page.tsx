import { getProducts } from "@/api/get-all-products";
import DeleteModal from "@/components/delete-modal";
import EmptyProduct from "@/components/products/empty-product";
import FilterProduct from "@/components/products/filter-product";
import { FormModal } from "@/components/form-modal";
import AddProductForm from "@/components/products/add-product-form";
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
import { Products } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import DeleteProduct from "@/components/products/delete-product";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const filter = {
    search: searchParams.search || "",
    query: searchParams.query || "",
  };

  const { data, error } = await getProducts(filter);

  const products = data as Products[];

  console.log(data);

  if (error) {
    console.error("Error fetching products:", error.message);
    return (
      <div className="p-6">{`Error fetching products ${error.message}`}</div>
    );
  }

  return (
    <div>
      {products.length < 1 && !filter.search && !filter.query ? (
        <EmptyProduct />
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">
                Products({products.length})
              </h1>
              <SearchInput />
            </div>
            <div className="flex items-center gap-2">
              <FilterProduct />
              <FormModal
                form={<AddProductForm />}
                modalDescription="Add New Product To The list"
                modalTitle="Add Product"
              >
                <Button className="flex items-center gap-2">
                  <span>
                    <PlusCircle />
                  </span>
                  <span className="hidden md:block">Add Product</span>
                </Button>
              </FormModal>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price (₦)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {Number(product.price).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={product.stock === 0 ? "text-red-500" : ""}
                  >
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    {new Date(product.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <FormModal
                      form={<AddProductForm id={product.id} data={product} />}
                    >
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </FormModal>
                    <DeleteProduct productId={product.id}>Delete</DeleteProduct>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
