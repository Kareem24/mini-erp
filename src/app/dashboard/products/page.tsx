import DeleteModal from "@/components/delete-modal";
import EmptyProduct from "@/components/empty-product";
import { FormModal } from "@/components/form-modal";
import AddProductForm from "@/components/products/add-product-form";
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
import { createClient } from "@/utils/supabase/server";

const ProductPage = async () => {
  const supabase = await createClient();
  // Fetch products from the database

  const { data, error } = await supabase.from("products").select("*");

  const products = data as Products[];

  if (error) {
    console.error("Error fetching products:", error.message);
    return (
      <div className="p-6">{`Error fetching products ${error.message}`}</div>
    );
  }

  return (
    <div>
      {products.length < 1 ? (
        <EmptyProduct />
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Products</h1>
            <FormModal
              form={<AddProductForm />}
              modalDescription="Add New Product To The list"
              modalTitle="Add Product"
            >
              <Button>Add Product</Button>
            </FormModal>
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
                    <DeleteModal productId={product.id}>Delete</DeleteModal>
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
