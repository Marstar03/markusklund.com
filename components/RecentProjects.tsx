"use client";

import React from "react";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { projects } from "@/data";
import Image from "next/image";

const RecentProjects = () => {
  const projectCards = projects.map(({ id, title, des, img, iconLists, link }) => (
    <a key={id} href={link} target="_blank" rel="noopener noreferrer" className="h-[36rem] w-[36rem] flex items-center justify-center cursor-pointer">
      <BackgroundGradient className="rounded-[22px] w-full h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col">
        <div className="relative flex items-center justify-center w-full h-[22rem] overflow-hidden rounded-2xl bg-[#13162d] mb-6">
          <Image
            src={img}
            alt={title}
            height={350}
            width={350}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="font-bold lg:text-2xl md:text-xl text-lg text-center mb-4">{title}</h1>
        <p className="lg:text-lg lg:font-normal font-light text-sm text-center flex-grow flex items-center justify-center min-h-[4rem]">{des}</p>
        <div className="flex items-center justify-between mt-auto mb-3">
          <div className="flex items-center space-x-2 flex-wrap">
            {iconLists.map((icon) => (
              <div
                key={icon}
                className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
              >
                <img src={icon} alt={icon} className="p-2" />
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </a>
  ));

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of {" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <Carousel items={projectCards} />
    </div>
  );
};

export default RecentProjects;
