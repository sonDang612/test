"use client";

import React from "react";
import List, { TableColumn } from "../List";
import Modal from "../Modal";
import { AllowedIP } from "../../../types";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import Pagination, { ITEMS_PER_PAGE } from "../Pagination";
import { apiEndpoints } from "@/utils/constants";
import dayjs from "dayjs";
import IPInput from "../IPInput";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import { useCreateAllowedIP } from "@/hooks/react-query/allowed-ip/useCreateAllowedIP";

type Props = {
  isOpen: boolean;
  password?: string;
  onClose: () => void;
};

type Form = {
  ipAddress: string;
};

const defaultValues = {
  ipAddress: "",
};

const CreateAllowedIPModal = (props: Props) => {
  const { isOpen, password, onClose } = props;
  const { control, setValue, handleSubmit } = useForm<Form>({ defaultValues });
  const [columns] = React.useState<TableColumn[]>([
    {
      key: "ipAddress",
      title: "IP",
      //className: "w-2/3",
      render: (value) =>
        !value ? (
          <Controller
            name="ipAddress"
            control={control}
            render={({ field }) => (
              <IPInput
                className="!px-0 !py-2"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ) : (
          value
        ),
    },
    {
      key: "createdAt",
      title: "날짜",
      render: (value) => {
        return !value ? (
          <div className="flex items-center justify-center">
            <Button className="w-40 h-10 text-white bg-[#4F81BD]" type="submit">
              등록
            </Button>
          </div>
        ) : (
          dayjs(value).format("YYYY-DD-MM HH:mm")
        );
      },
    },
  ]);

  const [page, setPage] = React.useState(1);
  const {
    data: allowedIPs,
    totalElements,
    isFetching,
  } = useFetch<AllowedIP>({
    endpoint: apiEndpoints.LIST_ALLOWED_IP,
    page,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT, QueryParam.PASSWORD],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC, password],
    enabled: !!password,
    staleTime: 0,
  });

  const { mutate: createAllowedIP, isSuccess } = useCreateAllowedIP();

  const data = React.useMemo(() => {
    return [{ ipAddress: null, createdAt: null }, ...allowedIPs];
  }, [allowedIPs]);

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data: Form) => {
    const form = { ...data, password };

    createAllowedIP(form);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setValue("ipAddress", "");
    }
  }, [isSuccess, setValue]);

  return (
    <Modal
      title="회원 정보"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="w-full md:w-[50%]"
    >
      <form className="overflow-auto" onSubmit={handleSubmit(onSubmit)}>
        <List data={data} columns={columns} loading={isFetching} />
      </form>
      <Pagination
        initialPage={page}
        totalItems={totalElements + 1}
        onChange={(page) => setPage(page)}
      />
    </Modal>
  );
};

export default CreateAllowedIPModal;
