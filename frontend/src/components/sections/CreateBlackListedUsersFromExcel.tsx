"use client";

import { useCreateBlackListedUserFromExcel } from "@/hooks/react-query/black-listed-user/useCreateBlackListedUserFromExcel";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import List from "../List";
import { ClipLoader } from "react-spinners";

const defaultValues = {
  userId: "",
  nickName: "",
  phoneNumber: "",
  bankName: "",
  bankAccount: "",
  bankOwner: "",
  ipAddress: "",
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
    key: "bankName",
    title: "은행",
  },
  {
    key: "bankAccount",
    title: "계좌번호",
  },
  {
    key: "bankOwner",
    title: "예금주명",
  },
  {
    key: "ipAddress",
    title: "IP",
  },
];

type Props = {
  siteId: number | null;
  data: any;
  resetSiteId: () => void;
  onClose: () => void;
};

const CreateBlackListedUsersFromExcel = (props: Props) => {
  const { onClose, resetSiteId, data, siteId } = props;
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { items: [defaultValues] },
  });
  const {
    mutateAsync: createBlackListUserFromExcel,
    isSuccess,
    isError,
  } = useCreateBlackListedUserFromExcel();

  const [loading, setLoading] = React.useState(false);

  const columnsWithController = React.useMemo(() => {
    return columns?.map((col: any) => ({
      ...col,
      render: (_: any, __: any, ___: any, rowIndex: number) => {
        return (
          <Controller
            name={`items.${rowIndex}.${col.key}` as any}
            control={control}
            render={({ field }) => (
              <input
                className="bg-white border border-black p-1"
                required={col?.required === true}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        );
      },
    }));
  }, [control]);

  const handleCloseModal = React.useCallback(() => {
    onClose();
    setValue("items", []);
    resetSiteId();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [onClose, resetSiteId, setValue]);

  const validate = (data: any) => {
    if (!siteId) {
      toast.error("사이트를 선택해주세요.");
      return false;
    }

    let result = true;

    for (let i = 0; i < data?.items?.length; i++) {
      const item = data?.items[i];
      if (!item?.userId) {
        result = false;
        break;
      }

      if (
        item?.phoneNumber?.length === 0 &&
        item?.ipAddress?.length !== 15 &&
        item?.bankAccount?.length === 0 &&
        item?.bankName?.length === 0 &&
        item?.bankOwner?.length === 0
      ) {
        result = false;
        break;
      }
    }

    if (!result) {
      toast.error("전화번호, IP 주소 또는 계좌 정보를 입력해 주세요.");
    }
    return result;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const isValid = validate(data);

    if (!isValid) {
      setLoading(false);
      return;
    }

    const form = {
      data: data?.items?.map((item: any) => ({
        ...item,
        siteId: Number(siteId),
      })),
    };
    await createBlackListUserFromExcel(form);
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

  React.useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item, index) => {
        setValue(`items.${index}.userId`, item?.userId);
        setValue(`items.${index}.nickName`, item?.nickName);
        setValue(`items.${index}.phoneNumber`, item?.phoneNumber);
        setValue(`items.${index}.bankOwner`, item?.bankOwner);
        setValue(`items.${index}.bankName`, item?.bankName);
        setValue(`items.${index}.bankAccount`, item?.bankAccount);
        setValue(`items.${index}.ipAddress`, item?.ipAddress);
      });
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data && <List data={data} columns={columnsWithController} />}
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

export default CreateBlackListedUsersFromExcel;
