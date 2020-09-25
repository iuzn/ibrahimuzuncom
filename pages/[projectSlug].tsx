import * as React from "react";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { config } from "../config";
import Layout from "../components/layout"
import { getBlogTable, getPageBlocks, getPageViews } from "../core/blog";
import { dateFormatter } from "../core/utils";
import { Project } from "../types/project";
import { GetStaticProps, GetStaticPaths } from "next";
import { Footer } from "../components/sections/footer";
import { toNotionImageUrl } from "../core/notion";
import Header from "../components/header/header";
import Loading from "../components/loading";

interface PostProps {
  blocks: BlockMapType;
  post: Project;
  morePosts: Project[];
  postViewCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Project>(config.notionProjectTableId);
  return {
    paths: table.filter(row => row.published).map(row => `/${row.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { projectSlug: string }
> = async ({ params }) => {
  const slug = params?.projectSlug;

  if (!slug) {
    throw Error("No slug given");
  }

  const table = await getBlogTable<Project>(config.notionProjectTableId);
  const publishedProjects = table.filter(p => p.published);

  const post = table.find(t => t.slug === slug);
  const postIndex = publishedProjects.findIndex(t => t.slug === slug);

  const morePosts = [...publishedProjects, ...publishedProjects].slice(
    postIndex + 1,
    postIndex + 3
  );

  if (!post || (!post.published && process.env.NODE_ENV !== "development")) {
    throw Error(`Failed to find post for slug: ${slug}`);
  }

  const blocks = await getPageBlocks(post.id);
  const postViewCount = await getPageViews(`/${slug}`);

  return {
    props: {
      post,
      postViewCount,
      blocks,
      morePosts,
    },
    revalidate: 10,
  };
};

const BlogPost: React.FC<PostProps> = ({
  post,
  blocks,

}) => {
  if (!post) return (
      <Loading/>
  );


  return (
    <>
      <NextSeo
        title={post.title}
        description={post.preview}
        openGraph={{
          type: "article",
          images: post.images?.[0] && [
            {
              url: toNotionImageUrl(post.images[0].url),
              width: 320,
              height: 210,
            },
          ],
          article: {
            publishedTime: new Date(post.date).toISOString(),
            tags: post.tags,
          },
        }}
        titleTemplate="%s – İbrahim Uzun"
      />
      <Layout>
        <Header title={"Blog"}/>


          <div className="my-8 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold sm:text-center mb-2">
          {post.title}
        </h1>
        <div className="sm:text-center text-gray-600">
          <time dateTime={new Date(post.date).toISOString()}>
            {dateFormatter.format(new Date(post.date))}
          </time>
        </div>
      </div>
      <article className="flex-1 my-6 post-container">
        <NotionRenderer blockMap={blocks} mapImageUrl={toNotionImageUrl} />
      </article>
        <div id="commento"/>
      <Footer />
      </Layout>
    </>
  );
};
export default BlogPost;
