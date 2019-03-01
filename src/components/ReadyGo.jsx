import React from 'react';

import OutlineText from './OutlineText';
import './ReadyGo.css';

const ReadyGo = (props) => {
  const {
    totalReadyMillis,
    remainingMillis,
    animationIndex,
    maskId,
    x, y,
  } = props;

  if (remainingMillis <= 0) {
    return null;
  }

  // ghetto hack to restart animation
  // on repeated "reset"s
  if (totalReadyMillis <= remainingMillis) {
    return null;
  }

  const showReady = remainingMillis > (totalReadyMillis / 2);
  const readyClass = showReady ? "ready" : "go";
  const animation = showReady ? `ready-${animationIndex}` : "";

  return (
    <g clipPath={`url(#${maskId})`} >
      <g className={animation}>
        <OutlineText
          x={x}
          y={y}
          className={readyClass}
          text={showReady ? 'READY' : 'GO'}
         />
      </g>
    </g>
  );
};

export default ReadyGo;
