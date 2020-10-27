import React from 'react'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN';
import { fetchMe } from '@/services/user';

export async function getInitialState() {
  const result = await fetchMe({
    p: 'admin',
  });
  const me = result && result.result ? result.data : null;

  return {
    me,
  };
}

export const rootContainer = (container) => {
    return <ConfigProvider locale={locale} autoInsertSpaceInButton={false}>{container}</ConfigProvider>;
};

