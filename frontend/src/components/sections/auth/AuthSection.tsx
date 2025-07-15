"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import React from "react";
import CreateAllowedIPModal from "../CreateAllowedIPModal";
import CreateSite from "../CreateSite";

const AuthPageSection = () => {
  const [password, setPassword] = React.useState<undefined | string>(undefined);
  const [isOpenAllowedIPModal, setIsOpenAllowedIPModal] = React.useState(false);
  const [isOpenCreateSiteModal, setIsOpenCreateSiteModal] =
    React.useState(false);

  return (
    <div className="flex flex-row gap-10 mt-10 px-10">
      <AuthWrapper
        onClick={(value) => {
          setPassword(value);
          setIsOpenAllowedIPModal(true);
        }}
      >
        <Button className="h-14 w-40">사이트 등록</Button>
      </AuthWrapper>

      <AuthWrapper
        onClick={(value) => {
          setPassword(value);
          setIsOpenCreateSiteModal(true);
        }}
      >
        <Button className="h-14 w-40">사이트 등록</Button>
      </AuthWrapper>

      <CreateAllowedIPModal
        isOpen={isOpenAllowedIPModal}
        onClose={() => setIsOpenAllowedIPModal(false)}
        password={password}
      />

      <CreateSite
        isOpen={isOpenCreateSiteModal}
        onClose={() => setIsOpenCreateSiteModal(false)}
        password={password}
      />
    </div>
  );
};

export default AuthPageSection;
