import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const Sales = async () => {
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
    </div>
  );
};

export default Sales;
