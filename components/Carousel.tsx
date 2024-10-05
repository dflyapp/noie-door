"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

import Door1 from "@/assets/door1.webp";
import BoxCanvas from "./BoxCanvas";

import Cover1 from "@/assets/cover/cover1.jpg";
import Cover2 from "@/assets/cover/cover2.jpg";
import Cover3 from "@/assets/cover/cover3.jpg";

const Model = [
  {
    id: 1,
    name: "An toàn sử dụng",
    cover: {
      src: Cover1,
    },
  },
  {
    id: 2,
    name: "Bảo hành 2 năm",
    cover: {
      src: Cover2,
    },
  },
  {
    id: 3,
    name: "Độ bền tuyệt đối",
    cover: {
      src: Cover3,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="flex flex-wrap items-center my-8 w-full justify-center overflow-hidden">
        <section className="w-full md:w-fit pr-12 lg:pr-0">
          <div className="relative w-full md:w-[800px] h-[300px] md:h-[500px]">
            <button
              className="absolute -right-12 w-24 h-24 bg-gray-100 rounded-full z-10"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => swipeToImage(1)}
            >
              →
            </button>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={imageCount}
                style={{
                  backgroundImage: `url(${Model[activeImageIndex].cover.src.src})`,
                  // backgroundColor: Model[activeImageIndex].cover.src,
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

        <section className="p-4 ml-12">
          <h1 className="text-left text-4xl mt-2">
            {Model[activeImageIndex].name}
          </h1>
          <p className="my-2">Sức mạnh của thép, giá trị của bền vững.</p>

          {/* <div className="w-full justify-start flex gap-x-4 my-4">
            <button onClick={() => swipeToImage(-1)}>←</button>
            <Link
              className="hover:opacity-70 text-prbred underline"
              href={`/work/${activeImageIndex + 1}`}
            >
              xem dự án
            </Link>
            <button onClick={() => swipeToImage(1)}>→</button>
          </div> */}
          <div className="flex justify-start gap-x-2">
            {Model.map((image, i) => (
              <div
                key={image.id}
                onClick={() => skipToImage(image.id - 1)}
                className={`relative h-[120px] w-[90px] cursor-pointer bg-center ${
                  image.id === activeImageIndex + 1
                    ? "border-4 border-primary"
                    : null
                }`}
                style={{
                  backgroundImage: `url(${Model[i].cover.src.src})`,
                  // backgroundPosition: "cover"
                }}
              />
            ))}
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              setIsModalOpen(true);
              const modal = document?.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
                modal.onclose = () => {
                  setIsModalOpen(false);
                };
              }
            }}
          >
            Xem mô hình 3D
          </button>
          <dialog id="my_modal_1" className="modal">
            {isModalOpen && (
              <div className="modal-box">
                <h3 className="font-bold text-lg">Xem mô hình 3D Cửa!</h3>
                <p className="py-4">Nhấn ESC hoặc nút Đóng bên dưới để thoát</p>
                <BoxCanvas />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Đóng</button>
                  </form>
                </div>
              </div>
            )}
          </dialog>
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
              <p className="mt-4">
                Được chế tạo từ thép, một loại hợp kim gồm sắt và cacbon, cùng
                với các thành phần khác để tăng cường độ bền và độ cứng. Cửa
                thép được sử dụng rộng rãi trong các công trình xây dựng, từ nhà
                ở, văn phòng, nhà máy đến các khu vực công cộng như trường học
                và bệnh viện.
              </p>
            </div>
            <Image src={Door1} alt="Door 1" width={200} height={500} />
          </div>
          <div className="p-8 w-full lg:w-1/2 overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Chi tiết</th>
                  <th>Tính năng</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>Kích thước</td>
                  <td>220 cm x 100 cm</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>Bề dày</td>
                  <td>67 cm</td>
                </tr>
                <tr>
                  <td>Chất liệu</td>
                  <td>Thép phủ sơn tĩnh điện</td>
                </tr>
                <tr>
                  <td>Lõi cửa</td>
                  <td>Giấy tổ ong (honey comb paper)</td>
                </tr>
                <tr>
                  <td>Ron</td>
                  <td>Cao su xung quanh chống ồn</td>
                </tr>
                <tr>
                  <td>Chống cháy</td>
                  <td>Lên đến 90 phút (tùy dòng)</td>
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
        <h6 className="my-4">
          So sánh tổng thể các tính năng của từng loại cửa
        </h6>
        <p className="px-4 md:px-0">
          Chào mừng bạn đến với phần so sánh chi tiết cửa thép và các loại cửa
          đối thủ! Nếu bạn đang băn khoăn không biết chọn loại cửa nào phù hợp
          nhất cho ngôi nhà của mình, thì bạn đã đến đúng nơi rồi. Chúng tôi sẽ
          cùng bạn khám phá những ưu và nhược điểm của từng loại cửa, từ độ bền,
          tính an toàn cho đến tính thẩm mỹ và giá cả. Hãy cùng đi vào chi tiết
          để tìm ra lựa chọn hoàn hảo nhất cho ngôi nhà của bạn!
        </p>
        <div className="overflow-x-auto">
          <table className="table mt-12">
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
                <td className="text-center">x</td>
                <td></td>
                <td></td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Kháng thấm</td>
                <td className="text-center">x</td>
                <td className="text-center">x</td>
                <td></td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>Chống trày xước</td>
                <td className="text-center">x</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* danh sách sp */}
      <section className="bg-gray-50 w-full py-24 flex flex-col items-center gap-y-4">
        <h2 className="text-2xl font-bold text-center">Danh sách sản phẩm</h2>
        <p className="container mx-auto max-w-lg px-4 md:px-0 text-center">
          Coming Soon!
        </p>
        {/* <img src={Products1.src} alt="Products 1" /> */}
      </section>
    </>
  );
};

export default App;
