import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import Layout from '../components/layout/'
import Header from '../components/header/header'
import { Blog } from "../components/sections/blog";
import { Footer } from "../components/sections/footer";
import { Achievements } from "../components/sections/achievements";
import { Post } from "../types/blog";
import { getBlogTable, getPageBlocks } from "../core/blog";
import { config } from "../config";
import { Achievement } from "../types/achievement";
import { Project } from "../types/project";
import React from "react";

interface AppProps {
    posts: Post[];
    achievements: Achievement[];
    projects: Project[];
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
    const [
        posts,
        projects,
        achievementsData,
    ] = await Promise.all([
        getBlogTable<Post>(config.notionBlogTableId),
        getBlogTable<Project>(config.notionProjectTableId),
        getBlogTable<Omit<Achievement, "blockMap">>(
            config.notionAchievementTableId
        ),

    ]);

    const achievements: Achievement[] = await Promise.all(
        achievementsData.map(async a => ({
            ...a,
            blockMap: await getPageBlocks(a.id),
        }))
    );

    return {
        props: {
            posts: posts
                .filter(post => post.published)
                .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
            achievements,
            projects: projects.filter(p => p.published),

        },
        revalidate: 10,
    };
};

export default ({ achievements, projects }: AppProps) => (
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
            <Achievements achievements={achievements} />
            <Footer />
        </Layout>

    </>
);
