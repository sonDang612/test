"use client";

import { useCreateSite } from "@/hooks/react-query/site/useCreateSite";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { apiEndpoints } from "@/utils/constants";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Site } from "../../../types";
import Button from "../Button";
import List, { TableColumn } from "../List";
import Modal from "../Modal";
import Pagination, { ITEMS_PER_PAGE } from "../Pagination";
import IPInput from "../IPInput";

type Props = {
  isOpen: boolean;
  password?: string;
  onClose: () => void;
};

type Form = {
  name: string;
  ipAddress: string;
  token: string;
};

const defaultValues = {
  name: "",
  ipAddress: "",
  token: "",
};

const CreateSite = (props: Props) => {
  const { isOpen, password, onClose } = props;
  const { control, setValue, handleSubmit } = useForm<Form>({ defaultValues });
  const { mutate: createSite, isSuccess } = useCreateSite();
  const [columns] = React.useState<TableColumn[]>([
    {
      key: "name",
      title: "사이트명",
      className: "min-w-[10rem]",
      render: (value) =>
        !value ? (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                onChange={field.onChange}
                className="bg-white h-full border border-black border-solid p-2 w-full"
                required={true}
                value={field.value}
              />
            )}
          />
        ) : (
          value
        ),
    },
    {
      key: "ipAddress",
      title: "사이트 IP",
      className: "min-w-[12rem]",
      render: (value) =>
        !value ? (
          <Controller
            name="ipAddress"
            control={control}
            render={({ field }) => (
              <IPInput
                value={field.value}
                onChange={field.onChange}
                className="!px-0"
                inputClassName="min-w-[150px]"
                required
              />
            )}
          />
        ) : (
          value
        ),
    },
    {
      key: "token",
      title: "TOKEN",
      className: "w-[50%]",
      render: (value) => {
        return !value ? (
          <Controller
            name="token"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                onChange={field.onChange}
                className="bg-white h-full border border-black border-solid p-2 w-full"
                value={field.value}
              />
            )}
          />
        ) : (
          value
        );
      },
    },
    {
      key: "createdAt",
      title: "날짜",
      className: "w-[10%]",
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
    data: sites,
    totalElements,
    isFetching,
  } = useFetch<Site>({
    endpoint: apiEndpoints.LIST_SITES,
    page,
    limit: ITEMS_PER_PAGE,
    queryParams: [
      QueryParam.SORT_BY,
      QueryParam.SORT,
      QueryParam.PASSWORD,
      QueryParam.ROLE,
    ],
    queryValues: [
      QueryValue.CREATED_AT,
      QueryValue.DESC,
      password,
      QueryValue.ADMIN,
    ],
    enabled: !!password,
    staleTime: 0,
  });

  const data = React.useMemo(() => {
    return [{ ipAddress: null, name: null, token: null }, ...sites];
  }, [sites]);

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data: Form) => {
    const form = { ...data, password };

    createSite(form);
  };

  React.useEffect(() => {
    if (isSuccess) {
      setValue("ipAddress", "");
      setValue("name", "");
      setValue("token", "");
    }
  }, [isSuccess, setValue]);

  return (
    <Modal
      title="사이트 등록"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="w-full md:w-[90%]"
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

export default CreateSite;
