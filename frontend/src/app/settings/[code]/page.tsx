import AuthPageSection from "@/components/sections/auth/AuthSection";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<ClipLoader size={20} />}>
        <AuthPageSection />
      </Suspense>
    </div>
  );
};

export default Page;
