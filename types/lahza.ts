export type LahzaType = "metin" | "fotoğraf" | "podcast";

export interface Lahza {
  id: string;
  preview: string;
  title: string;
  types: Lahza[];
  images: {
    name: string;
    url: string;
  }[];
  tags: string[];
  slug: string;
  date: number;
  published: boolean;
}