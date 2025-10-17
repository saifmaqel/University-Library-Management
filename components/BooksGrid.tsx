"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  ICellRendererParams
} from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Link from "next/link";

ModuleRegistry.registerModules([AllCommunityModule]);

interface BooksGridProps {
  books: Book[];
}

export default function BooksGrid({ books }: BooksGridProps) {
  const colDefs: ColDef<Book>[] = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "author", headerName: "Author", flex: 1.5 },
    { field: "genre", headerName: "Genre", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "totalCopies", headerName: "Total Copies", flex: 1 },
    { field: "availableCopies", headerName: "Available Copies", flex: 1 },
    {
      field: "createdAt",
      headerName: "Added On",
      flex: 1,
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleDateString() : ""
    },
    {
      headerName: "Actions",
      field: "id",
      flex: 1,
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Link
            href={`/books/${params.value}`}
            className="text-[var(--primary-admin)] hover:underline"
          >
            View
          </Link>
        );
      }
    }
  ];

  return (
    <div className="ag-theme-quartz w-full flex-1">
      <AgGridReact
        theme={themeQuartz}
        rowData={books}
        columnDefs={colDefs}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        animateRows
      />
    </div>
  );
}
