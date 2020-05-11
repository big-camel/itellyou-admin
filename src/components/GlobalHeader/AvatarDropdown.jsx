import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { useModel, useDispatch } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const onMenuClick = (event) => {
    const { key } = event;
    if (key === 'logout') {
      dispatch({
        type: 'user/logout',
      });
    }
  };

  const { initialState } = useModel('@@initialState');
  const me = initialState ? initialState.me : null;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return me && me.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={me.avatar} alt="avatar" />
        <span className={styles.name}>{me.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};
