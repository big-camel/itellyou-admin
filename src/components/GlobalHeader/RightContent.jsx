import { Tooltip, Tag } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = () => {
  const settings = useSelector((state) => state.settings);
  const { theme, layout } = settings;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Tooltip title="ITELLYOU">
        <a
          target="_blank"
          href="https://www.itellyou.com"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <GlobalOutlined />
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default GlobalHeaderRight;
