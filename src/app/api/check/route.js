
export async function GET(req) {
  await fetch(process.env.URL_1);

  return new Response(JSON.stringify({ message: 'Hello from App Router API!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}