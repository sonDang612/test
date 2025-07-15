import React from "react";

type Props = {
  label?: string | React.ReactNode;
  value?: string;
  className?: string;
  onClick?: () => void;
};

const Box = (props: Props) => {
  const { label, value, className, onClick } = props;
  return (
    <div
      className={`border inline-flex border-solid border-black items-center justify-center flex-col bg-[#f3f3f3] h-14 ${className}`}
      onClick={onClick}
    >
      {typeof label === "string" ? <p>{label}</p> : label}
      <p>{value}</p>
    </div>
  );
};

export default Box;
