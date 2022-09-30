import { useState } from 'react';

export const Example = ({ startCount }) => {
  const [count, setCount] = useState(startCount);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>
        COUNT: <span>{count}</span>
      </p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Example;
