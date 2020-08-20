import React from 'react';
import { ConfigProvider } from 'antd';
const { i18n } = require('@/utils/config');
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';

const languages = {
  zh: zh_CN,
  en: en_US,
};
const { defaultLanguage } = i18n;

const Layout: React.FC = ({ children }) => (
  <ConfigProvider locale={zh_CN}>{children}</ConfigProvider>
);

export default Layout;
