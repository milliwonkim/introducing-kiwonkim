import React from "react";
import TanstackImg from "../public/img/tanstack_query.png";
import Image from "next/image";

const IconTanstack = ({ width, height }: { width: number; height: number }) => {
  return (
    <Image width={width} height={height} src={TanstackImg} alt="Tanstack" />
  );
};

export default IconTanstack;
