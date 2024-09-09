import Image from "next/image";

import LogoSlogan from "@/assets/logo-slogan.png";
// import Logo from "@/assets/logo.svg";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <>
      <header className="flex justify-center items-center">
        <div className="p-2">
          <Image
            className="dark:invert"
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
    </>
  );
}
