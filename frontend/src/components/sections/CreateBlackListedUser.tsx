"use client";

import { useBlackListedTypes } from "@/hooks/react-query/black-listed-type/useBlackListedTypes";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { apiEndpoints } from "@/utils/constants";
import { readExcelFile } from "@/utils/readExcelFile";
import React, { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import { Site } from "../../../types";
import AuthWrapper from "../AuthWrapper";
import Box from "../Box";
import Button from "../Button";
import Modal from "../Modal";
import { ITEMS_PER_PAGE } from "../Pagination";
import Select from "../Select";
import UploadExcel from "../UploadExcel";
import CreateBlackListedUserForm from "./CreateBlackListedUserForm";
import CreateBlackListedUsersFromExcel from "./CreateBlackListedUsersFromExcel";

const CreateBlackListedUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [excelData, setExcelData] = React.useState<any[] | null>(null);
  const [excelFileName, setExcelFileName] = React.useState<string>("");
  const [siteId, setSiteId] = React.useState<number | null>(null);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [loadingExcel, setLoadingExcel] = React.useState(false);
  const { data: sites } = useFetch<Site>({
    endpoint: apiEndpoints.LIST_SITES,
    page: 1,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT, QueryParam.PASSWORD],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC, password],
    enabled: !!password && !!isOpen,
    staleTime: 0,
  });

  const { data: blackListedTypes } = useBlackListedTypes(
    { page: 1, limit: 10 },
    { enabled: !!isOpen }
  );

  const siteOptions = React.useMemo(() => {
    return sites?.map((item) => ({ label: item?.name, value: item?.id }));
  }, [sites]);

  const handleOpenModal = (value?: string) => {
    setIsOpen(true);
    setPassword(value);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSiteId(null);
    setExcelData(null);
  };
  return (
    <Fragment>
      <div className="md:w-fit w-full">
        <AuthWrapper onClick={handleOpenModal}>
          <Button className="md:w-40 w-full h-14 bg-[#f3f3f3]">등록</Button>
        </AuthWrapper>
      </div>

      <Modal
        title="블랙 등록"
        isOpen={isOpen}
        onClose={handleCloseModal}
        className={`w-full max-h-[80vh] ${
          excelData ? "md:w-[80%]" : "md:w-[60%]"
        }`}
      >
        <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between mb-2">
          <p className="text-lg">
            기본정보 {excelFileName && `- ${excelFileName}`}
          </p>
          <div className="flex md:flex-row flex-col md:gap-4 gap-4 md:w-fit w-full">
            <Select
              options={siteOptions}
              onChange={(value) => setSiteId(Number(value))}
              value={`${siteId}`}
              placeHolder="사이트선택"
            />

            <UploadExcel
              onChange={async (file) => {
                setLoadingExcel(true);
                setExcelFileName(file?.name);
                const excelData = await readExcelFile(file);
                const formatted = excelData?.map((item) => ({
                  bankAccount: item?.BankAccount,
                  bankName: item?.BankName,
                  bankOwner: item?.BankOwner,
                  phoneNumber: item?.HP,
                  ipAddress: item?.IP,
                  userId: item[`USER ID`],
                  nickName: item["USER Nicname"],
                }));
                setExcelData(formatted);
                setTimeout(() => {
                  setLoadingExcel(false);
                }, 1000);
              }}
              renderButton={({ onClick }) => (
                <Box
                  label="엑셀등록"
                  className="cursor-pointer md:w-fit w-full h-fit px-2 py-1"
                  onClick={onClick}
                />
              )}
            />

            <Box
              label="엑셀 양식 다운로드"
              className="cursor-pointer md:w-fit w-full h-fit px-2 py-1"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_API_STATIC}/files/MYBLACK_EXCEL_SAMPLE.xlsx`
                )
              }
            />
          </div>
        </div>
        {excelData ? (
          !loadingExcel ? (
            <CreateBlackListedUsersFromExcel
              onClose={handleCloseModal}
              resetSiteId={() => setSiteId(null)}
              siteId={siteId}
              data={excelData}
            />
          ) : (
            <div className="w-full flex items-center justify-center h-40">
              <ClipLoader />
            </div>
          )
        ) : (
          <CreateBlackListedUserForm
            blackListedTypes={blackListedTypes}
            onClose={handleCloseModal}
            siteId={siteId}
            resetSiteId={() => setSiteId(null)}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default CreateBlackListedUser;
