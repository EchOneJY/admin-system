import { IconKey } from '@/utils/icon';

export interface PageType {
  nameIndex: number;
  name?: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface NumberType {
  icon: IconKey;
  color: string;
  title: string;
  number: number;
}

export interface AnalysisData {
  pages: PageType[];
  numbers: NumberType[];
}
