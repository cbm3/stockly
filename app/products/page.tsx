import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/create-product-button";
import { productTableColumns } from "./_components/table-columns";

const ProductsPage = async () => {
  //const response = await fetch("http://localhost:3000/api/products")
  //const products = await response.json();
  const products = await getProducts();
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Produtos</HeaderTitle>
          <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <AddProductButton />
        </HeaderRight>
      </Header>
      <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
    </div>
  );
};

export default ProductsPage;