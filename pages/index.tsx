import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import Layout from '../components/layout/'
import Header from '../components/header/header'
import { Blog } from "../components/sections/blog";
import { Footer } from "../components/sections/footer";
import { Post } from "../types/blog";
import { getBlogTable, getPageBlocks } from "../core/blog";
import { config } from "../config";
import { Proje } from "../types/proje";
import { Project } from "../types/project";
import React from "react";
import {Projeler} from "../components/sections/projeler";


interface AppProps {
    posts: Post[];
    projeler: Proje[];
    projects: Project[];
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
    const [
        posts,
        projects,
        projelerData,
    ] = await Promise.all([
        getBlogTable<Post>(config.notionBlogTableId),
        getBlogTable<Project>(config.notionProjectTableId),
        getBlogTable<Omit<Proje, "blockMap">>(
            config.notionProjeTableId
        ),

    ]);

    const projeler: Proje[] = await Promise.all(
        projelerData.map(async a => ({
            ...a,
            blockMap: await getPageBlocks(a.id),
        }))
    );

    return {
        props: {
            posts: posts
                .filter(post => post.published)
                .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
            projeler,
            projects: projects.filter(p => p.published),

        },
        revalidate: 10,
    };
};

export default ({ projeler, projects }: AppProps) => (
    <>
        {

        }
        <NextSeo
            title={"İbrahim Uzun - İlelebet Muhabbet"}
            titleTemplate={"%s"}
            description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim."
        />

        <Layout>
            <Header />
            <Blog projects={projects} preview />
            <Projeler projeler={projeler} />
            <Footer />
        </Layout>

    </>
);
