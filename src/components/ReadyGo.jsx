import React from 'react';

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

  const textFill= <text
        x={x}
        y={y}
        className={readyClass}
        textAnchor="middle"
        alignmentBaseline="central"
        dominantBaseline="central"
       >
         {showReady ? 'READY' : 'GO'}
       </text>;

  const textOutline = React.cloneElement(textFill, {className: `${readyClass} ${readyClass}-outline`});
  return (
    <g clipPath={`url(#${maskId})`} >
      <g className={animation}>
        {textOutline}
        {textFill}
      </g>
    </g>
  );
};

export default ReadyGo;
