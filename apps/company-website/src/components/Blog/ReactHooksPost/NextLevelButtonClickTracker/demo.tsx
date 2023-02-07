import React from 'react';
import { useClickTracker } from './useClickTracker';
const NextLevelButtonClickTracker: React.FC = () => {
  const [state, incrementCount] = useClickTracker();
  return (
    <div>
      <button onClick={incrementCount}>Click me</button>
      <p>Button has been clicked {state.count} times</p>
      <p>
        Last clicked at:{' '}
        {state.lastClicked ? new Date(state.lastClicked).toLocaleString() : 'Never'}
      </p>
    </div>
  );
};
export default NextLevelButtonClickTracker;