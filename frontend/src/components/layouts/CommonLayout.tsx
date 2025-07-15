/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CommonLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex pt-20 w-screen h-screen flex-col gap-4">
      <div className="flex flex-col items-center justify-center w-full md:px-48 px-12 mb-4">
        <img src="/assets/images/logo.jpg" alt="logo" />
      </div>

      {children}
    </div>
  );
};

export default CommonLayout;
