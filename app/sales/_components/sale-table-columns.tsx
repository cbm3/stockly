"use client";

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const saleTableColumns: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
  },
  {
    header: "Valor Total",
    cell:({row: {original: {totalAmount}}}) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell:({row: {original: {date}}}) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "actions",
    header: "Ação",
    //cell: (row) => <TableDropDownMenu product={row.row.original} />,
  },
];