import React from "react";
import "./index.less";

export default ({ src, style, ...args }) => (
  <div
    className="--imageParent"
    style={{
      ...style
    }}
    {...args}
  >
    <img
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%"
      }}
      src={src}
      alt="img"
    />
  </div>
);
