import React from 'react';

const CrocDemo: React.FC = () => {
  const crocodiles = ['Lyle', 'Snappy', 'Mr. Vile'];

  const dodos = [];

  return (
    <>
        <div>{crocodiles.length && `crocodiles: ${crocodiles.map(() => '🐊').join(' ')}`}</div>
        <div>{dodos.length && `dodos: ${dodos.map(() => '🦤').join(' ')}`}</div> 
    </>
  );
};

export default CrocDemo;