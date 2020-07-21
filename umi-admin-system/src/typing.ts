import { IconKey } from '@/utils/icon';

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: IconKey;
  iconComponent?: any;
  locale?: string | false;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
