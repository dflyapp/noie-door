import Image from "next/image";

import LogoSlogan from "@/assets/logo-slogan.png";
// import Logo from "@/assets/logo.svg";
import Carousel from "@/components/Carousel";

import { blogList } from "@/utils/blog-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noie Door - Trang chủ",
  description: "Sức mạnh của thép, giá trị của bền vững.",
};

export default async function Home() {
  return (
    <>
      <header className="flex justify-center items-center">
        <div className="p-8 flex flex-col items-center">
          <Image
            src={LogoSlogan}
            alt="noie door logo"
            width={100}
            height={100}
            priority
          />
          <strong>NOIEDOOR</strong>
          <span>Cửa thép bền vững</span>
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel />
      </main>

      {/* danh sách bài viết */}
      <section className="bg-white w-full py-24 flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
        <p className="container mx-auto max-w-lg px-4 md:px-0">
          Tại blog của chúng tôi, bạn sẽ tìm thấy đủ mọi loại bí kíp, từ cách
          lắp đặt cửa thép một cách dễ dàng (không cần là thợ chuyên nghiệp!)
          cho đến cách bảo trì để cửa luôn mới và hoạt động mượt mà. Bạn có biết
          cách làm sạch cửa thép sao cho không bị gỉ sét không? Hay bạn muốn
          biết cách chọn mua cửa thép chất lượng mà không bị “hớ”? Tất cả sẽ có
          trong những bài viết sắp tới.
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
