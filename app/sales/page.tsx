import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-access/product/get-products";
import { GetSales } from "../_data-access/sale/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/sale-table-columns";

const Sales = async () => {
  const sales = await GetSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Vendas</HeaderTitle>
          <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSaleButton products={products} productOptions={productOptions} />
        </HeaderRight>
      </Header>
      <DataTable columns={saleTableColumns} data={sales} />
    </div>
  );
};

export default Sales;
