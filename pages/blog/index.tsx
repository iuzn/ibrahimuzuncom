import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import { Blog } from "../../components/sections/blog";
import { Footer } from "../../components/sections/footer";
import { Project } from "../../types/project";
import { getBlogTable } from "../../core/blog";
import { config } from "../../config";
import Header from "../../components/header/header";
import React from "react";
import Layout from "../../components/layout"

interface AppProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const projects = await getBlogTable<Project>(config.notionProjectTableId);

  return {
    props: {
      projects: projects.filter(post => post.published),
    },
    revalidate: 10,
  };
};


export default ({ projects }: AppProps) => (
    <>
        <NextSeo
            title={"Blog"}
            titleTemplate={"%s"}
            description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim.
"
        />

        <Layout>
            <Header />
            <Blog projects={projects} />
            <Footer />
        </Layout>

    </>
);
