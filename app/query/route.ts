import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  return sql`
    SELECT DISTINCT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666
    ORDER BY customers.name ASC;
  `;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({ error: 'Failed to query the database.' }, { status: 500 });
  }
}
