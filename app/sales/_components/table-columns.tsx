"use client"

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-access/product/get-products";

interface SaleTableColumn extends SaleDto {
    products: ProductDto[]
    productOptions: ComboboxOption[]
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
    {
        accessorKey: "productNames",
        header: "Produtos",
    },
    {
        accessorKey: "totalProducts",
        header: "Quantidade de produtos",
    },
    {
        header: "Valor total",
        cell: ({
            row: {
                original: { totalAmount }
            }
        }) => formatCurrency(totalAmount),
    },
    {
        header: "Data",
        cell: ({
            row: {
                original: { date },
            }
        }) => new Date( date ).toLocaleDateString(),
    },
    {
        header: "Ações",
        cell: ({ row: { original: sale } }) => (
            <SalesTableDropdownMenu sale={sale}
                products={sale.products}
                productOptions={sale.productOptions}
            />
        ),
    },
];