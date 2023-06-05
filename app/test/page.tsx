import prisma from "lib/prisma";
import { Metadata } from "next";

export const revalidate = 3600; // revalidate every hour

export const metadata: Metadata = {
  title: 'Test Page for Next.js',
};

async function getData() {
  const res = await prisma.post.findMany();
  return res;
}

export default async function Page() {
  const data = await getData();
  console.log(data);

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
      <h1>Hello, Next.js!</h1>
      {data.map((e) => (
        <>
          <h1>{e.title}</h1>
          <p>{e.content}</p>
        </>
      ))}
    </>
  );
}
