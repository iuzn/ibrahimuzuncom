import React from "react";
import clsx from "clsx";
import { Project as ProjectData  } from "../../types/project";
import Link from "next/link";
import styles from "./blog.module.css"
import { toNotionImageUrl } from "../../core/notion";




export const Project: React.FC<
    ProjectData & {
    featured?: boolean;
    className?: string;
}
    > = ({ title, preview, video, featured, slug,images }) => (
    <div className={styles.post}>

        {featured && (
            <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">

                <iframe
                    className={clsx("absolute w-full h-full object-cover")}
                    src={video} frameBorder="0" />


            </div>
        )}

        <div className="flex flex-1 flex-col justify-between ">
            <div className="p-4 pb-10 ">
                <div className="font-semibold text-xl pb-2">
                    {title}
                </div>
                <div className={clsx(!featured && "text-sm")}>
                    {preview}
                </div>
            </div>
        </div>

        {
            !featured && (
                <img
                    className={clsx("rounded-br-large absolute w-full h-full object-cover")}
                    src={toNotionImageUrl(images[0].url)}
                    alt={title}
                />
            )
        }
        <Link href={`/[projectSlug]`} as={`/${slug}`}>
            <a
                aria-label={`${title} - Project`}

            >


                {
                    featured && (
                        <footer className={styles.footer}>Okumaya devam et</footer>
                    )
                }
                {
                    !featured && (
                        <footer className={styles.footer}>Oku</footer>
                    )
                }


            </a>
        </Link>

    </div>

);

export const Blog: React.FC<{
    projects: ProjectData[];
    preview?: boolean;
}> = ({ projects, preview }) => (
    <div>

        <div className="grid grid-cols-1 ">
            {projects.slice(0, preview ? 1 : undefined).map(p => (
                <Project key={p.id} featured {...p} />
            ))}
        </div>
        <div className="container pb-8">
            <div className="m-auto max-w-3xl">
                <h1 className="text-4xl font-bold">Blog</h1>
                <div className="text-2xl ">Okumaya değer yazılar</div>
            </div></div>
        {preview && (
            <div className="md:grid mt-4 grid-cols-2 sm:grid-cols-4 gap-4 ">
                {projects.slice(1, 5).map(p => (
                    <Project key={p.id} className="hidden md:flex" {...p} />
                ))}

            </div>
        )}
    </div>
);
