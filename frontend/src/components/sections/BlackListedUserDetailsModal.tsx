"use client";

import { useBlackListedUserById } from "@/hooks/react-query/black-listed-user/useBlackListedUserById";
import React from "react";
import List, { TableColumn } from "../List";
import Modal from "../Modal";
import dayjs from "dayjs";
import { useBlackListedTypes } from "@/hooks/react-query/black-listed-type/useBlackListedTypes";

const columns: TableColumn[] = [
  {
    key: "userId",
    title: "아이디",
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

const ipColumns: TableColumn[] = [
  {
    key: "name",
    title: "사이트",
    className: "min-w-[10rem]",
  },
  {
    key: "ipAddress",
    title: "IP",
    className: "w-[70%]",
  },
  {
    key: "createdAt",
    title: "날짜",
    className: "min-w-[10rem]",

    render: (value) => {
      return dayjs(value).format("YYYY-DD-MM HH:mm");
    },
  },
];

const reasonColumns: TableColumn[] = [
  {
    key: "name",
    title: "사이트",
    className: "min-w-[10rem]",
  },
  {
    key: "reason",
    title: "",
    className: "w-[70%]",
    render: (value) => {
      return (
        <input
          className="w-[100%] bg-white border border-black border-solid p-2"
          value={value}
          onChange={() => {}}
        />
      );
    },
  },
  {
    key: "createdAt",
    title: "날짜",
    className: "min-w-[10rem]",
    render: (value) => {
      return dayjs(value).format("YYYY-DD-MM HH:mm");
    },
  },
];

type Props = {
  isOpen: boolean;
  selectedId?: number;
  onClose: (value: boolean) => void;
};

const BlackListedUserDetailsModal = (props: Props) => {
  const { isOpen, selectedId, onClose } = props;
  const { data: blackListedUser } = useBlackListedUserById({ id: selectedId });
  const { data: blackListedTypesData } = useBlackListedTypes(
    { page: 1, limit: 10 },
    { enabled: !!isOpen }
  );

  const blackListedTypeColumns = React.useMemo(() => {
    const columns: TableColumn[] = [
      {
        key: "name",
        title: "사이트",
        className: "min-w-[10rem]",
      },
      {
        key: "ids",
        title: "유형",
        className: "w-[70%]",
        render: (value) => {
          return (
            <div className="flex flex-row gap-2 justify-between">
              {blackListedTypesData?.map((item) => (
                <div
                  key={item.id}
                  className={`bg-[#f3f3f3] px-6 py-1 border whitespace-nowrap border-black ${
                    value?.find((i: any) => i?.id === item?.id) &&
                    "!bg-[#4F81BD] !text-white"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        key: "createdAt",
        title: "날짜",
        className: "min-w-[10rem]",
        render: (value) => {
          return dayjs(value).format("YYYY-DD-MM HH:mm");
        },
      },
    ];

    return columns;
  }, [blackListedTypesData]);

  const blackListedTypes = React.useMemo(() => {
    return blackListedUser?.sites?.map((item) => ({
      name: item?.name,
      ids: item?.blackListedTypes,
      createdAt: item?.createdAt,
    }));
  }, [blackListedUser]);

  const ipData = React.useMemo(() => {
    return blackListedUser?.sites?.map((item) => ({
      name: item?.name,
      ipAddress: item?.ipAddress,
      createdAt: item?.createdAt,
    }));
  }, [blackListedUser]);

  const reasonData = React.useMemo(() => {
    return blackListedUser?.sites?.map((item) => ({
      name: item?.name,
      reason: item?.reason,
      createdAt: item?.createdAt,
    }));
  }, [blackListedUser]);

  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <Modal
      title="회원 정보"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="w-full md:w-[50%] max-h-[100vh] overflow-auto"
    >
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between mb-2">
            <p className="text-lg">기본정보</p>
          </div>
          {blackListedUser && (
            <List data={[blackListedUser]} columns={columns} />
          )}
        </div>
        <div>
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between mb-2">
            <p className="text-lg">유형 정보</p>
          </div>
          {blackListedTypeColumns && (
            <List
              data={blackListedTypes}
              columns={blackListedTypeColumns}
              bodyClassName="!max-h-[15rem]"
            />
          )}
        </div>
        <div>
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between mb-2">
            <p className="text-lg">IP 정보</p>
          </div>
          {ipData && (
            <List
              data={ipData}
              columns={ipColumns}
              bodyClassName="!max-h-[15rem]"
            />
          )}
        </div>
        <div>
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between mb-2">
            <p className="text-lg">코멘트 정보</p>
          </div>
          {reasonData && (
            <List
              data={reasonData}
              columns={reasonColumns}
              bodyClassName="!max-h-[15rem]"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BlackListedUserDetailsModal;
