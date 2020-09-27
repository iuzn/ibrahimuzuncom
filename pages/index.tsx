import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import Layout from '../components/layout/'
import Header from '../components/header/header'
import { Blog } from "../components/sections/blog";
import { Footer } from "../components/sections/footer";
import { getBlogTable, getPageBlocks } from "../core/blog";
import { config } from "../config";
import { Proje } from "../types/proje";
import { BlogPost } from "../types/blog";
import React from "react";
import {Projeler} from "../components/sections/projeler";
import {Lahzalar} from "../components/sections/lahzalar";
import {Lahza} from "../types/lahza";


interface AppProps {
    blogpost: BlogPost[];
    projeler: Proje[];
    lahza: Lahza[];
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
    const [
        blogpost,
        lahza,
        projelerData,
    ] = await Promise.all([
        getBlogTable<BlogPost>(config.notionBlogTableId),
        getBlogTable<Lahza>(config.notionLahzaTableId),
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
            projeler,
            blogpost: blogpost.filter(p => p.published),
            lahza: lahza.filter(p => p.published),

        },
        revalidate: 10,
    };
};

export default ({ projeler, blogpost, lahza }: AppProps) => (
    <>
        <NextSeo
            title={"İbrahim Uzun - İlelebet Muhabbet"}
            titleTemplate={"%s"}
            description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim."
        />

        <Layout>
            <Header />
            <Blog blogpost={blogpost} preview />
            <Projeler projeler={projeler} />
            <Lahzalar lahza={lahza} preview />
            <Footer />
        </Layout>

    </>
);
