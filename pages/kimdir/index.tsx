import { NextSeo } from "next-seo";
import { Footer } from "../../components/sections/footer";
import Header from "../../components/header/header";
import React from "react";
import Layout from "../../components/layout"
import { Proje } from "../../types/proje";
import {GetStaticProps} from "next";
import {getBlogTable, getPageBlocks} from "../../core/blog";
import {config} from "../../config";
import {Projeler} from "../../components/sections/projeler";



interface AppProps {
    projeler: Proje[];
}


export const getStaticProps: GetStaticProps<AppProps> = async () => {
    const [
        projelerData,
    ] = await Promise.all([
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

        },
        revalidate: 10,
    };
};


const Kimdir = ({ projeler }: AppProps) => (
    <>
        <NextSeo
            title={"Projeler"}
            titleTemplate={"%s"}
            description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim.
"
        />

        <Layout>
            <Header />
            <Projeler projeler={projeler} />
                <Footer />

        </Layout>

    </>
);

export default Kimdir