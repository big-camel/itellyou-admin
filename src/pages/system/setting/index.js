import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Form from './components/Form';
import styles from './index.less';

export default () => {
  return (
    <PageHeaderWrapper title={false}>
      <div className={styles['setting-form']}>
        <Form />
      </div>
    </PageHeaderWrapper>
  );
};
