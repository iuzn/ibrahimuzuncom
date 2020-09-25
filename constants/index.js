import * as Icon from '../components/icons'
import React from 'react'

export default {
  TABLET_SIZE: 960,
  DESKTOP_SIZE: 1280
}
export const MENU = [
  {
    key: 'anasayfa',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeFilled />,
    title: 'Anasayfa'
  },
  {
    key: 'blog',
    path: '/blog',
    icon: <Icon.Blog />,
    iconSelected: <Icon.BlogFilled />,
    title: 'Blog'
  },
  {
    key: 'tezgah',
    path: '/tezgah',
    icon: <Icon.Tezgah />,
    iconSelected: <Icon.TezgahFilled />,
    title: 'Tezgah'
  },
  {
    key: 'projeler',
    path: '/projeler',
    icon: <Icon.Projeler />,
    iconSelected: <Icon.ProjelerFilled />,
    title: 'Projeler'
  },
  {
    key: 'maarif',
    path: '/maarif',
    icon: <Icon.Maarif />,
    iconSelected: <Icon.MaarifFilled />,
    title: 'Maarif'
  },
  {
    key: 'lahzalar',
    path: '/lahzalar',
    icon: <Icon.Lahzalar />,
    iconSelected: <Icon.LahzalarFilled />,
    title: 'Lahzalar'
  },
  {
    key: 'kimdir',
    path: '/kimdir',
    icon: <Icon.Kimdir />,
    iconSelected: <Icon.KimdirFilled />,
    title: 'Kimdir'
  },
  {
    key: 'iletisim',
    path: '/iletisim',
    icon: <Icon.Iletisim />,
    iconSelected: <Icon.IletisimFilled />,
    title: 'İletişim'
  }
]

export const IMG = [
  {
    src:
      'https://pbs.twimg.com/profile_images/1303696412689956864/wAm15v8c_400x400.jpg',
    name: 'ibrahim uzun',
    alt: ''
  }
]
