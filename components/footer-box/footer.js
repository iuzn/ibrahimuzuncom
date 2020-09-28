import styles from './footer.module.css'
import {
  Behance,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Figma
} from '../icons'
import React from 'react'
import a from 'next/link'
function Footer() {
  return (
      <div className={"divide-y divide-current"}>
        <div className={"text-center "}><h3>Sosyal Ağlar</h3></div>
        <div className={"text-center"}><div className={styles.social}>
      <a href="https://www.youtube.com/ibuzn" target="_blank">
        <Youtube />
      </a>
      <a href="https://www.facebook.com/ibuzn" target="_blank">
        <Facebook />
      </a>
      <a href="https://www.twitter.com/ibrahimuzn" target="_blank">
        <Twitter />
      </a>
      <a href="https://www.instagram.com/ibuzn" target="_blank">
        <Instagram />
      </a>
      <br />
      <a href="https://www.behance.net/uiu" target="_blank">
        <Behance />
      </a>
      <a href="https://www.figma.com/@ibrahim" target="_blank">
        <Figma />
      </a>
      <a href="https://www.linkedin.com/in/ibuzn/" target="_blank">
        <Linkedin />
      </a>
      <a href="https://www.github.com/iuzn" target="_blank">
        <Github />
      </a>

    </div></div></div>


  )
}
export default Footer
