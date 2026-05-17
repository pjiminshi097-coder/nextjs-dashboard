'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="inline-flex gap-2 items-center">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex gap-1">
        {pageNumbers.map((page) => (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            isActive={currentPage === page}
          />
        ))}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number;
  href: string;
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border rounded-md',
    {
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100 border-gray-200': !isActive,
    },
  );

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
    },
  );

  return isDisabled ? (
    <div className={className}>
      {direction === 'left' ? (
        <ArrowLeftIcon className="h-4 w-4" />
      ) : (
        <ArrowRightIcon className="h-4 w-4" />
      )}
    </div>
  ) : (
    <Link href={href} className={className}>
      {direction === 'left' ? (
        <ArrowLeftIcon className="h-4 w-4" />
      ) : (
        <ArrowRightIcon className="h-4 w-4" />
      )}
    </Link>
  );
}
