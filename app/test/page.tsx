import prisma from "lib/prisma";

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
