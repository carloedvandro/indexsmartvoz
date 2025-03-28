
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const Image = ({ alt, ...props }: ImageProps) => {
  return <img alt={alt} {...props} />;
};

export default Image;
