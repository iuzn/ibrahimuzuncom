// pages/404.js
import React from 'react';
import { Footer } from "../components/sections/footer";
import { NextSeo } from "next-seo";
import Layout from '../components/layout/'
import Header from '../components/header/header'
import LinkedButton from '../components/linked-button';


export default function Custom404() {
return(

    <Layout>
      <NextSeo
        title={"İbrahim Uzun - İlelebet Muhabbet"}
        titleTemplate={"%s"}
        description="Merhaba! İbrahim ben.  Araştırmacı, tasarımcı ve mütemadiyen talebeyim."
    />
      <Header  title={"Böyle bir şey yok"}/>


<div className="h-screen flex items-center">
	<div className="container flex flex-col md:flex-row items-center justify-center px-5">
   		<div className="max-w-md">
      		<div className="text-5xl font-bold pb-12">404 Hatası</div>
            <p className="text-2xl md:text-3xl font-light leading-normal font-sans pb-4"
            >Üzgünüm, böyle bir şey yok. </p>
          <p className="mb-8 font-sans pb-8">Tüm içeriklere göz atmak istersen anasayfadan keşfetmeye başlayabilirsin.</p>

          <LinkedButton href={"/"} >Anasayfaya Dön</LinkedButton>
    </div>
  </div>
</div>


      <Footer/>
    </Layout>

)
}