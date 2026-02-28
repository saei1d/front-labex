'use client';

import { App, ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';

type AntdProviderProps = {
  children: ReactNode;
};

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#59AC77',
          colorBgBase: '#F9F5F0',
          colorText: '#111111',
          colorTextHeading: '#111111',
          colorBorder: '#D8D1C4',
          borderRadius: 16,
          fontFamily: 'Vazirmatn, ui-sans-serif, system-ui',
        },
        components: {
          Layout: {
            headerBg: '#F9F5F0',
            bodyBg: '#F9F5F0',
            footerBg: '#F9F5F0',
          },
          Menu: {
            itemSelectedColor: '#111111',
            itemSelectedBg: '#D6EBDC',
            itemHoverColor: '#111111',
            itemHoverBg: '#EEF6F0',
          },
          Button: {
            colorPrimaryHover: '#4A9665',
            colorPrimaryActive: '#3E8257',
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
