import React from "react";
import clsx from "clsx";
import { Lahza as LahzaData  } from "../../types/lahza";
import Link from "next/link";
import styles from "./blog.module.css"
import { toNotionImageUrl } from "../../core/notion";





export const Lahza: React.FC<
  LahzaData & {
    featured?: boolean;
    className?: string;
  }
> = ({ title, preview, images, featured, slug, className }) => (
  <Link href={`/lahzalar/[lahzalarSlug]`} as={`/lahzalar/${slug}`}>
    <a
      aria-label={`${title} - Project`}
      className={clsx(
        "focus group border bg-white rounded-md overflow-hidden flex flex-col",
        "transform transition-transform ease-in-out duration-100 hover:border-gray-400",
        featured && "shadow-sm hover:-translate-y-1 focus:-translate-y-1",
        className
      )}
    >
      {featured && (
        <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
          {images && images[0] && (
            <img
              className={clsx("absolute w-full h-full object-cover")}
              src={toNotionImageUrl(images[0].url)}
              alt={title}
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4 pb-0">
          <div className="font-semibold text-gray-800 group-hover:text-gray-700">
            {title}
          </div>
          <div className="text-s"/>
          <div className={clsx(!featured && "text-sm", "text-gray-700")}>
            {preview}
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export const Lahzalar: React.FC<{
  lahza: LahzaData[];
  preview?: boolean;
}> = ({ lahza, preview }) => (
  <div className="container  ">
      <div className="m-auto max-w-3xl pb-8">
    <h1 className="text-4xl font-bold">Lahzalar</h1>
                <div className="text-2xl ">Okumaya değer yazılar</div></div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {lahza.slice(0, preview ? 6 : undefined).map(p => (
        <Lahza key={p.id} featured {...p} />
      ))}
    </div>
    {preview && (
      <div >
        {lahza.slice(8, 8).map(p => (
          <Lahza key={p.id} className="hidden md:flex" {...p} />
        ))}
        <div className="flex flex-col items-center justify-center text-center py-4">
          <div className="text-lg font-bold text-gray-800">
            Want to see more?
          </div>
          <div className="text-gray-600">Explore more of my work</div>
          <Link href={"/lahzalar"}>
            <a className="mt-3 bg-gray-800 hover:bg-gray-700 text-gray-100 py-1 px-6 rounded-md">
              Hepsini Gör
            </a>
          </Link>
        </div>
      </div>
    )}
  </div>
);