import { Suspense } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import InvoicesTable from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchInvoicesPages } from '@/app/lib/data';
import Link from 'next/link';
import Search from '@/app/ui/search';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          href="/dashboard/invoices/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Create Invoice
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>

      <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}