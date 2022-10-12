import React, { useRef } from 'react';
import DefaultLayout from '../DefaultLayout';

const Layout = ({ children }) => {

  return (
    <DefaultLayout>
    {children}
    </DefaultLayout>
  );
};

export default Layout;
