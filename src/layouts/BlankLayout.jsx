import React, { useEffect } from 'react';
import { useModel, useDispatch } from 'umi';

const Layout = ({ children }) => {
  const { initialState } = useModel('@@initialState');
  const me = initialState ? initialState.me : null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'user/setMe',
      payload: me,
    });
  }, [dispatch, me]);

  return <>{children}</>;
};

export default Layout;
