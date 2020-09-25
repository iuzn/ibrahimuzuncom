import { BlockMapType } from "react-notion";

export type ProjeType = "award" | "work" | "education" | "security";

export interface Proje {
    id: string;
    highlight: boolean;
    type: ProjeType;
    date: number;
    endDate: number;
    title: string;
    blockMap: BlockMapType;
}
