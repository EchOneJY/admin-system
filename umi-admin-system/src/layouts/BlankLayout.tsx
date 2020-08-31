import React from 'react';
import { getLocale } from 'umi';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';

const languageConfig: any = {
  zh_CN,
  en_US,
};

const locale = getLocale();
console.log(locale);

const Layout: React.FC = ({ children }) => (
  <ConfigProvider locale={languageConfig[locale]}>{children}</ConfigProvider>
);

export default Layout;
