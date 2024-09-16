import Image from "next/image";

import LogoSlogan from "@/assets/logo-slogan.png";
// import Logo from "@/assets/logo.svg";
import Carousel from "@/components/Carousel";

import { Client } from "@notionhq/client";
import { blogList } from "@/utils/blog-list";

const client = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

export default async function Home() {
  const myPage = await client.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  });
  // console.log(myPage.results);

  return (
    <>
      <header className="flex justify-center items-center">
        <div className="p-2">
          <Image
            src={LogoSlogan}
            alt="noie door logo"
            width={100}
            height={100}
            priority
          />
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel />
      </main>

      {/* danh sách bài viết */}
      <section className="bg-white w-full py-24 flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
        <p className="container mx-auto max-w-lg px-4 md:px-0">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nulla
          aperiam, deleniti tempora vel nesciunt a assumenda ab eius nihil nemo
          consequuntur odit perferendis unde cum. Sit, repudiandae! Harum,
          vitae?
        </p>
        <div className="flex flex-col gap-y-4 px-4 md:px-0">
          {blogList.map((blog) => (
            <a
              key={blog.id}
              href={`/bai-viet/${blog.slug}`}
              className="link link-primary"
            >
              {blog.title}
            </a>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="bg-gray-50 w-full py-24">
        <p className="text-center">Copyright 2024 - NOIE Architecture</p>
      </footer>
    </>
  );
}
