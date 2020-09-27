import * as React from "react";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { config } from "../../config";
import Layout from "../../components/layout/index"
import { getBlogTable, getPageBlocks } from "../../core/blog";
import { dateFormatter } from "../../core/utils";
import { Lahza } from "../../types/lahza";
import { GetStaticProps, GetStaticPaths } from "next";
import { Footer } from "../../components/sections/footer";
import { toNotionImageUrl } from "../../core/notion";
import Header from "../../components/header/header";

interface PostProps {
  blocks: BlockMapType;
  lahza: Lahza;
  moreLahza: Lahza[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Lahza>(config.notionLahzaTableId);
  return {
    paths: table.filter(row => row.published).map(row => `/lahzalar/${row.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { lahzaSlug: string }
> = async ({ params }) => {
  const slug = params?.lahzaSlug;

  if (!slug) {
    throw Error("No slug given");
  }

  const table = await getBlogTable<Lahza>(config.notionLahzaTableId);
  const publishedLahza = table.filter(p => p.published);

  const lahza = table.find(t => t.slug === slug);
  const lahzaIndex = publishedLahza.findIndex(t => t.slug === slug);

  const moreLahza = [...publishedLahza, ...publishedLahza].slice(
    lahzaIndex + 1,
    lahzaIndex + 3
  );

  if (!lahza || (!lahza.published && process.env.NODE_ENV !== "development")) {
    throw Error(`Failed to find post for slug: ${slug}`);
  }

  const blocks = await getPageBlocks(lahza.id);

  return {
    props: {
      lahza,
      blocks,
      moreLahza,
    },
    revalidate: 1,
  };
};

const BlogPosts: React.FC<PostProps> = ({
  lahza,
  blocks,

}) => {



  return (
    <>
      <NextSeo
        title={lahza.title}
        description={lahza.preview}
        openGraph={{
          type: "article",
          images: lahza.images?.[0] && [
            {
              url: toNotionImageUrl(lahza.images[0].url),
              width: 320,
              height: 210,
            },
          ],
          article: {
            publishedTime: new Date(lahza.date).toISOString(),
            tags: lahza.tags,
          },
        }}
        titleTemplate="%s – İbrahim Uzun"
      />
      <Layout>
        <Header title={"Lahzalar"}/>

          <div className="my-8 w-full max-w-3xl mx-auto px-4">
              {lahza.images && lahza.images[0] && (
            <img

              src={toNotionImageUrl(lahza.images[0].url)}
              alt={lahza.title}
            />
          )}
        <h1 className="text-2xl md:text-3xl font-bold sm:text-center mb-2">
          {lahza.title}
        </h1>
        <div className="sm:text-center text-gray-600">
          <time dateTime={new Date(lahza.date).toISOString()}>
            {dateFormatter.format(new Date(lahza.date))}
          </time>
        </div>
      </div>
      <article className="flex-1 my-6 post-container">
        <NotionRenderer blockMap={blocks} mapImageUrl={toNotionImageUrl} />
      </article>
      <Footer />
      </Layout>
    </>
  );
};
export default BlogPosts;
