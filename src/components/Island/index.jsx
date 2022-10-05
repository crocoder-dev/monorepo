import React from 'react';

const Island = ({ children, deferUntil }) => {
  if (import.meta.env.SSR) {
    const props = {
      'data-props': JSON.stringify(children.props),
      'data-name': children.type.name,
      'data-deferuntil': deferUntil || null,
    };

    return <island {...props}>{children}</island>;
  }

  return children;
};
export default Island;
