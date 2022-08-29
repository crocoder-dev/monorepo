import React from "react";
import Typography from "../Typography";

/**
 * Basic component for rendering CroCoder icons.
 * This component uses the Typography component and has font size, color and weight capabilities.
 */
const Icon = ({ icon, className, fontSize, fontWeight, color, ...other }) => {
  const compositeClassName = `icon-${icon} ${className} `;

  return (
    <Typography
      {...other}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      element="span"
      className={compositeClassName}
    >
      <span className="path1" />
      <span className="path2" />
      <span className="path3" />
      <span className="path4" />
    </Typography>
  );
};

export default Icon;
