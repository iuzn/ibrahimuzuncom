import { NextSeo } from "next-seo";
import { Footer } from "../../components/sections/footer";
import Header from "../../components/header/header";
import React from "react";
import Layout from "../../components/layout"
import { Lahza } from "../../types/lahza";
import {GetStaticProps} from "next";
import {getBlogTable} from "../../core/blog";
import {config} from "../../config";
import {Lahzalar} from "../../components/sections/lahzalar";


interface AppProps {
  lahza: Lahza[];
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const lahza = await getBlogTable<Lahza>(config.notionLahzaTableId);

  return {
    props: {
      lahza: lahza.filter(post => post.published),
    },
    revalidate: 10,
  };
};

const LahzalarSayfasi = ({ lahza }: AppProps) => (
    <>
        <NextSeo
            title={"Projeler"}
            titleTemplate={"%s"}
            description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim.
"
        />

        <Layout>
            <Header />
            <Lahzalar lahza={lahza} />
                <Footer />

        </Layout>

    </>
);

export default LahzalarSayfasi