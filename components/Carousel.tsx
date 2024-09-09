"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Door1 from "@/assets/door1.webp";
import Products1 from "@/assets/products1.png";

const Model = [
  {
    id: 1,
    name: "An toàn sử dụng",
    cover: {
      src: "red",
    },
  },
  {
    id: 2,
    name: "Bảo hành 2 năm",
    cover: {
      src: "green",
    },
  },
  {
    id: 3,
    name: "Độ bền tuyệt đối",
    cover: {
      src: "blue",
    },
  },
];

// getting from https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/wrap.ts
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const App = () => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const activeImageIndex = wrap(0, Model.length, imageCount);

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId: number) => {
    const changeDirection = imageId > activeImageIndex ? 1 : -1;
    setImageCount([imageId, changeDirection]);
  };

  return (
    <>
      <div className="flex flex-wrap gap-8 items-center my-8 w-full justify-center">
        <section>
          <div className="relative w-[800px] h-[300px] md:h-[500px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={imageCount}
                style={{
                  // backgroundImage: `url(${Model[activeImageIndex].cover.src})`,
                  backgroundColor: Model[activeImageIndex].cover.src,
                }}
                custom={direction}
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                transition={sliderTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                className="absolute h-full w-full hover:cursor-grab bg-cover bg-no-repeat bg-center will-change-transform"
              />
            </AnimatePresence>
          </div>
        </section>

        <section>
          <h1 className="text-left text-4xl mt-2">
            {Model[activeImageIndex].name}
          </h1>

          <div className="w-full justify-start flex gap-x-4 my-4">
            <button onClick={() => swipeToImage(-1)}>←</button>
            <Link
              className="hover:opacity-70 text-prbred underline"
              href={`/work/${activeImageIndex + 1}`}
            >
              view project
            </Link>
            <button onClick={() => swipeToImage(1)}>→</button>
          </div>
          <div className="flex justify-center gap-x-2">
            {Model.map((image) => (
              <div
                key={image.id}
                onClick={() => skipToImage(image.id - 1)}
                className="relative h-[120px] w-[90px] cursor-pointer"
                style={{
                  backgroundColor: image.cover.src,
                }}
              >
                {/* <img
                  className={`absolute top-0 left-0 h-12 md:h-full w-full object-cover ${
                    image.id === activeImageIndex + 1
                      ? "border-4 border-prbred"
                      : null
                  }`}
                  src={image.cover.src}
                  alt="Cover"
                /> */}
              </div>
            ))}
          </div>
          <h1>Cover slider thumbnails</h1>
          <button className="btn btn-primary mt-4">View 3D Render</button>
        </section>
      </div>

      {/* product information */}
      <section className="bg-gray-50 w-full py-24">
        <div className="container mx-auto flex flex-wrap py-12">
          <div className="p-8 w-full lg:w-1/2 flex flex-col sm:flex-row gap-y-4 items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Thông tin sản phẩm cửa thép
              </h2>
              <h6 className="mt-4">
                Được chế tạo từ thép, một loại hợp kim gồm sắt và cacbon, cùng
                với các thành phần khác để tăng cường độ bền và độ cứng. Cửa
                thép được sử dụng rộng rãi trong các công trình xây dựng, từ nhà
                ở, văn phòng, nhà máy đến các khu vực công cộng như trường học
                và bệnh viện.
              </h6>
            </div>
            <Image src={Door1} alt="Door 1" width={200} height={500} />
          </div>
          <div className="p-8 w-full lg:w-1/2 overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Chi tiết</th>
                  <th>Tính năng</th>
                  <th>Công dụng</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* so sánh cửa thép với cửa nhựa compozit */}

      {/* so sánh cửa thép với cửa nhôm xingfa */}

      {/* so sánh cửa thép với cửa gỗ */}

      {/* so sánh */}
      <div className="mx-auto container max-w-lg my-24 px-4 md:px-0">
        <h2 className="text-2xl font-bold text-center">So sánh với đối thủ</h2>
        <p className="my-4">So sánh tổng thể các tính năng của từng loại cửa</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, nihil
          hic, cum ipsam deserunt laborum repellat harum debitis mollitia,
          obcaecati molestias numquam! Incidunt omnis ratione adipisci tenetur
          vero sequi blanditiis?
        </p>
        <table className="table mt-12 overflow-x-auto ">
          {/* head */}
          <thead>
            <tr>
              <th>Tính năng</th>
              <th>Cửa thép</th>
              <th>Cửa nhựa compozit</th>
              <th>Cửa nhôm xingfa</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Chất liệu</td>
              <td>x</td>
              <td></td>
              <td></td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Kháng thấm</td>
              <td>x</td>
              <td></td>
              <td></td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Chống trày xước</td>
              <td>x</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* danh sách sp */}
      <section className="bg-gray-50 w-full py-24 flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-bold text-center">Danh sách sản phẩm</h2>
        <img src={Products1.src} alt="Products 1" />
      </section>

      {/* danh sách bài viết */}
      <section className="bg-white w-full py-24 flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-bold text-center">Danh sách bài viết</h2>
        <div className="flex flex-col gap-y-4 px-4 md:px-0">
          <a className="link link-primary">
            Ưu Điểm Nổi Bật của Cửa Thép So Với Cửa Gỗ Truyền Thống
          </a>
          <a className="link link-primary">
            Làm Thế Nào Để Chọn Cửa Thép Phù Hợp Cho Ngôi Nhà Của Bạn?
          </a>
          <a className="link link-primary">
            Tại Sao Cửa Thép Là Lựa Chọn Hàng Đầu Cho An Ninh Gia Đình?
          </a>
          <a className="link link-primary">
            Cách Bảo Dưỡng và Vệ Sinh Cửa Thép Để Luôn Bền Đẹp
          </a>
          <a className="link link-primary">
            Xu Hướng Mới Nhất Trong Thiết Kế Cửa Thép Hiện Đại
          </a>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-gray-50 w-full py-24">
        <p className="text-center">Copyright 2024 - NOIE Architecture</p>
      </footer>
    </>
  );
};

export default App;
