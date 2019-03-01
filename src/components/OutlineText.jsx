import React from 'react';

import './OutlineText.css';

const OutlineText = (props) => {
  const {
    text,
    x, y,
    className,
  } = props;

  const textFill= (
    <text
      x={x}
      y={y}
      className={className}
      textAnchor="middle"
      alignmentBaseline="central"
      dominantBaseline="central"
    >
      {text}
    </text>);

  const textOutline = React.cloneElement(textFill, {className: `${className} text-outline`});
  return (
    <React.Fragment>
      {textOutline}
      {textFill}
    </React.Fragment>
  );
};

export default OutlineText;
