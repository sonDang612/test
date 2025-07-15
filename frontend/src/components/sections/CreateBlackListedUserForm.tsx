"use client";

import { useCreateBlackListedUser } from "@/hooks/react-query/black-listed-user/useCreateBlackListedUser";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BlackListedType } from "../../../types";
import IPInput from "../IPInput";
import List, { TableColumn } from "../List";
import { ClipLoader } from "react-spinners";

const defaultValues = {
  userId: "",
  nickName: "",
  phoneNumber: "",
  bankOwner: "",
  bankName: "",
  bankAccount: "",
  reason: "",
};

const columns: any = [
  {
    key: "userId",
    title: "아이디",
    required: true,
  },
  {
    key: "nickName",
    title: "닉네임",
  },
  {
    key: "phoneNumber",
    title: "핸드폰번호",
  },
  {
    key: "bankOwner",
    title: "예금주명",
  },
  {
    key: "bankName",
    title: "은행",
  },
  {
    key: "bankAccount",
    title: "계좌번호",
  },
];

type Props = {
  blackListedTypes: BlackListedType[];
  siteId: number | null;
  resetSiteId: () => void;
  onClose: () => void;
};

const CreateBlackListedUserForm = (props: Props) => {
  const { blackListedTypes, siteId, onClose, resetSiteId } = props;
  const [ipAddress, setIpAddress] = React.useState("");
  const { control, handleSubmit, setValue } = useForm({ defaultValues });
  const {
    mutateAsync: createBlackListUser,
    isSuccess,
    isError,
  } = useCreateBlackListedUser();

  const [loading, setLoading] = React.useState(false);
  const [columnsWithController] = React.useState<TableColumn[]>(
    columns?.map((item: any) => ({
      ...item,
      render: () => (
        <Controller
          name={item?.key as any}
          control={control}
          render={({ field }) => (
            <input
              value={field.value}
              onChange={field.onChange}
              className="bg-white border border-black p-1"
              required={item?.required === true}
            />
          )}
        />
      ),
    }))
  );
  const [selectedBlackListedTypeIds, setSelectedBlackListedTypeIds] =
    React.useState<number[]>([]);

  const handleCloseModal = React.useCallback(() => {
    setSelectedBlackListedTypeIds([]);
    onClose();
    setIpAddress("");
    setValue("bankOwner", "");
    setValue("bankName", "");
    setValue("bankAccount", "");
    setValue("nickName", "");
    setValue("phoneNumber", "");
    setValue("reason", "");
    setValue("userId", "");
    resetSiteId();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [onClose, resetSiteId, setValue]);

  const handleSelectBlackListedType = (id?: number) => {
    if (!id) return;

    if (selectedBlackListedTypeIds?.includes(id)) {
      setSelectedBlackListedTypeIds((prev) =>
        prev.filter((item) => item !== id)
      );
    } else {
      setSelectedBlackListedTypeIds((prev) => [...prev, id]);
    }
  };

  const validate = (data: any) => {
    if (!siteId) {
      toast.error("사이트를 선택해주세요.");
      return false;
    }

    if (!data?.userId) {
      toast.error("전화번호, IP 주소 또는 계좌 정보를 입력해 주세요.");
      return false;
    }

    if (
      data?.phoneNumber?.length === 0 &&
      ipAddress?.length !== 15 &&
      data?.bankAccount?.length === 0 &&
      data?.bankName?.length === 0 &&
      data?.bankOwner?.length === 0
    ) {
      toast.error("전화번호, IP 주소 또는 계좌 정보를 입력해 주세요.");
      return false;
    }

    return true;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const isValid = validate(data);

    if (!isValid) {
      setLoading(false);
      return;
    }

    const form = {
      ...data,
      ipAddress,
      blackListedTypeIds: selectedBlackListedTypeIds,
      siteId: Number(siteId),
      bankAccount:
        data?.bankAccount?.replace(/[^\d.]/g, "") || data?.bankAccount,
      phoneNumber:
        data?.phoneNumber?.replace(/[^\d.]/g, "") || data?.phoneNumber,
    };

    await createBlackListUser(form);
  };

  React.useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess, handleCloseModal]);

  React.useEffect(() => {
    if (isError) {
      setLoading(false);
    }
  }, [isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <List data={[defaultValues]} columns={columnsWithController} />
      <div className="mt-14 overflow-auto bg-[#D0D8E8]">
        <div className="bg-[#D0D8E8] flex flex-row">
          <p className="p-4 min-w-40 border-y border-solid border-y-white">
            IP정보
          </p>
          <IPInput
            value={ipAddress}
            onChange={(value) => setIpAddress(value)}
            className="border-l border-l-white"
            inputClassName="min-w-[10rem]"
          />
        </div>
        <div className="bg-[#D0D8E8] flex flex-row">
          <p className="p-4 min-w-40 border-b border-b-white border-solid">
            유형정보
          </p>
          <div
            className="border-l border-l-white py-4 px-10 flex flex-row gap-2  border-y border-solid border-y-white"
            style={{ flex: 1 }}
          >
            {blackListedTypes?.map((item) => (
              <div
                key={item.id}
                className={`bg-[#f3f3f3] px-6 py-1 border border-black whitespace-nowrap cursor-pointer ${
                  selectedBlackListedTypeIds?.includes(Number(item?.id)) &&
                  "!bg-[#4F81BD] !text-white"
                }`}
                onClick={() => handleSelectBlackListedType(Number(item.id))}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#D0D8E8] flex flex-row">
          <p className="p-4 min-w-40">코멘트</p>
          <div
            className="border-l border-l-white py-4 px-10"
            style={{ flex: 1 }}
          >
            <Controller
              name="reason"
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  className="md:w-[80%] w-full bg-white border border-black border-solid p-2"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end mt-3">
        <button
          type="submit"
          className={`bg-[#f3f3f3] px-10 py-2 border border-black cursor-pointer flex items-center justify-center ${
            loading && "cursor-not-allowed"
          }`}
        >
          {loading ? <ClipLoader size={20} /> : "추가"}
        </button>
      </div>
    </form>
  );
};

export default CreateBlackListedUserForm;
