"use client"

import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { Sale } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import SalesTableDropdownMenu from "./table-dropdown-menu";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
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
            <SalesTableDropdownMenu sale={sale} />
        ),
    },
];