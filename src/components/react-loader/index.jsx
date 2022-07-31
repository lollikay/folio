import React from "react";

export const ReactLoader = (props) => {
  const {className}  = props;

  // console.debug(country)

  return (
    <div className={"react-loader " + className}></div>
  )
}
