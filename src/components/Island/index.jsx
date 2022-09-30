import React from 'react';

const Island = ({ children }) => {
  if (import.meta.env.SSR) {
    const props = {
      'data-props': JSON.stringify(children.props),
      'data-name': children.type.name,
    };

    return <island {...props}>{children}</island>;
  }

  return children;
};
export default Island;
