import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <>
      <header className="flex justify-start items-center">
        <div className="p-2">
          <Image
            className="dark:invert"
            src={Logo}
            alt="noie door logo"
            width={50}
            height={50}
            priority
          />
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <button className="btn btn-primary">Get Started</button>
        <Carousel />
      </main>
    </>
  );
}
