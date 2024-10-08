import { Client } from "@notionhq/client";
import { NotionRenderer } from "@notion-render/client";
import { blogList } from "@/utils/blog-list";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const title = blogList.find((blog) => blog.slug === params.slug)?.title;
  const description = blogList.find(
    (blog) => blog.slug === params.slug
  )?.description;
  return {
    title,
    description,
  };
}

const client = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

export default async function Page({ params }: { params: { slug: string } }) {
  const block_id = blogList.find((blog) => blog.slug === params.slug)?.id || "";

  const { results } = await client.blocks.children.list({
    block_id,
  });
  const renderer = new NotionRenderer();
  const html = await renderer.render(...(results as any));

  return (
    <>
      <main className="container px-2 md:px-0 max-w-lg mx-auto py-24 blog-post">
        <Link className="text-sm underline text-primary" href="/">
          Trang chủ
        </Link>
        <h1 className="text-2xl font-bold">
          {blogList.find((blog) => blog.slug === params.slug)?.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </main>
      {/* footer */}
      <footer className="bg-gray-50 w-full py-24">
        <p className="text-center">Copyright 2024 - NOIE Architecture</p>
      </footer>
    </>
  );
}
