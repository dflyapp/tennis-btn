import prisma from "lib/prisma";

async function getData() {
  const res = await prisma.post.findMany();
  return res;
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
      <h1>Hello, Next.js!</h1>
    </>
  );
}
