"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import Link from "next/link";

const Model = [
  {
    id: 1,
    name: "Model 1",
    cover: {
      src: "red",
    },
  },
  {
    id: 2,
    name: "Model 2",
    cover: {
      src: "green",
    },
  },
  {
    id: 3,
    name: "Model 3",
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
      <div className="flex flex-wrap items-center mx-8">
        <section>
          <div className="relative w-full md:w-[800px] h-[300px] md:h-[500px] overflow-hidden">
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

          <p className="text-center text-4xl mt-2">
            {Model[activeImageIndex].name}
          </p>

          <div className="w-full justify-center flex gap-x-4 my-4">
            <button onClick={() => swipeToImage(-1)}>←</button>
            <Link
              className="hover:opacity-70 text-prbred underline"
              href={`/work/${activeImageIndex + 1}`}
            >
              view project
            </Link>
            <button onClick={() => swipeToImage(1)}>→</button>
          </div>
        </section>

        <div className="flex justify-center gap-x-2 border-2 border-primary">
          {Model.map((image) => (
            <div
              key={image.id}
              onClick={() => skipToImage(image.id - 1)}
              className="relative h-[120px] w-[90px]"
            >
              <img
                className={`absolute top-0 left-0 h-12 md:h-full w-full object-cover ${
                  image.id === activeImageIndex + 1
                    ? "border-4 border-prbred"
                    : null
                }`}
                src={image.cover.src}
                alt="Cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
