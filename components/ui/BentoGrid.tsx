'use client'

import { cn } from "@/utils/cn";
import { useState } from "react";
import MagicButton from "./MagicButton";
import { IoCopyOutline, IoDownloadOutline } from "react-icons/io5";
import ErrorBanner from "./ErrorBanner";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {

  const [copied, setCopied] = useState(false);

  const [downloaded, setDownloaded] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('markus.klund@hotmail.com');

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  const handleDownload = async () => {
    const response = await fetch("/CV_Markus_Klund.pdf");
    if (!response.ok) {
      setError("An error occurred while downloading the file. Please try again.");
      return;
    }

    const link = document.createElement("a");
    link.href = "/CV_Markus_Klund.pdf";
    link.download = "CV_Markus_Klund.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 5000);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        background: 'rgb(2,0,36)',
        backgroundColor: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(86,86,139,1) 46%, rgba(0,212,255,1) 100%)',
      }}
    >

      <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
            {img && (
                <img
                    src={img}
                    alt={img}
                    className={cn(imgClassName, 'object-cover, object-center')}
                />
            )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
            {spareImg && (
                <img 
                    src={spareImg}
                    alt={spareImg}
                    className={'object-cover, object-center w-full h-full'}
                />
            )}
        </div>

        <div className={cn(
          titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10'
        )}>
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>
        {id === 1 && (
          <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:.right-2">
            <div className="flex flex-col gap-3 lg:gap-8">
              {['React.js', 'Next.js', '.NET'].map((item) => (
                <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                  {item}
                </span>
              ))}

              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
            </div>

            <div className="flex flex-col gap-3 lg:gap-8">
              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
              {['Docker', 'MongoDB', 'Kafka'].map((item) => (
                <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                  {item}
                </span>
              ))}
            </div>

          </div>
        )}

        {id === 3 && (
          <div className="mt-5 relative">
            <MagicButton 
              title={copied ? 'Email copied' : 'Copy my email'}
              icon={<IoCopyOutline />}
              position="left"
              otherClasses="!bg-[#161a31]"
              handleClick={handleCopy}
            />
          </div>
        )}

        {id === 4 && (
          <div className="mt-5 relative">
            <MagicButton 
              title={downloaded ? 'CV downloaded' : 'Download my CV'}
              icon={<IoDownloadOutline />}
              position="left"
              otherClasses="!bg-[#161a31]"
              handleClick={handleDownload}
            />
          </div>
        )}

        </div>
      </div>
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
    </div>
  );
};
