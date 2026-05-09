import { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { customers, invoices, revenue } from '@/app/lib/placeholder-data';
import { formatCurrency } from '@/app/lib/utils';

const latestInvoices = [
  invoices[5],
  invoices[3],
  invoices[4],
  invoices[7],
  invoices[1],
  invoices[0],
  invoices[11],
  invoices[9],
].map((invoice) => {
  const customer = customers.find(({ id }) => id === invoice.customer_id);

  return {
    id: invoice.id,
    name: customer?.name ?? 'Unknown Customer',
    email: customer?.email ?? 'unknown@example.com',
    image_url: customer?.image_url ?? '/customers/evil-rabbit.png',
    amount: formatCurrency(invoice.amount),
  };
});

const totalPaidInvoices = formatCurrency(
  invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((total, invoice) => total + invoice.amount, 0),
);

const totalPendingInvoices = formatCurrency(
  invoices
    .filter((invoice) => invoice.status === 'pending')
    .reduce((total, invoice) => total + invoice.amount, 0),
);

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-8 text-2xl md:text-3xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={invoices.length} type="invoices" />
        <Card title="Total Customers" value={customers.length} type="customers" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
