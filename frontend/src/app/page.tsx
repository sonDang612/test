"use client";
import Actions from "@/components/Actions";
import Box from "@/components/Box";
import Button from "@/components/Button";
import CommonLayout from "@/components/layouts/CommonLayout";
import List, { TableColumn } from "@/components/List";
import Pagination, { ITEMS_PER_PAGE } from "@/components/Pagination";
import BlackListedUserDetailsModal from "@/components/sections/BlackListedUserDetailsModal";
import CreateBlackListedUser from "@/components/sections/CreateBlackListedUser";
import { useStatisticsOverview } from "@/hooks/react-query/statistics/useStatisticsOverview";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { apiEndpoints } from "@/utils/constants";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BlackListedUser } from "../../types";

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
    title: "HP",
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
    key: "siteName",
    title: "사이트",
  },
  {
    key: "ipAddress",
    title: "IP",
  },
  {
    key: "",
    title: "날짜",
    render: (_, record) => {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="text-xs bg-[#4F81BD] text-white px-2 py-1">
              등록
            </div>
            <p className="text-xs">
              {dayjs(record?.createdAt).format("YYYY-DD-MM HH:mm")}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-xs bg-[#4F81BD] text-white px-2 py-1">
              수정
            </div>
            <p className="text-xs">
              {dayjs(record?.updatedAt).format("YYYY-DD-MM HH:mm")}
            </p>
          </div>
        </div>
      );
    },
  },
];

const Page = () => {
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [text, setText] = useState("");
  const [selectedRow, setSelectedRow] = React.useState<null | number>(null);
  const { data: statisticsOverview } = useStatisticsOverview();
  const {
    data: blackListedUsers,
    totalElements,
    isFetching,
  } = useFetch<BlackListedUser>({
    endpoint: apiEndpoints.LIST_BLACK_LISTED_USER,
    page,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT, QueryParam.QUERY_TEXT],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC, q],
    enabled: !!q && q.length !== 0,
  });

  const [columnsWithActions] = React.useState(() => {
    return [
      ...columns,
      {
        key: "actions",
        title: "",
        render: (_, record: BlackListedUser) => (
          <Actions
            onDetailsPress={() => setSelectedRow(Number(record?.id))}
            // onDeletePress={() =>
            //   deleteBlackListedUser({
            //     blackListedUserId: Number(record?.id),
            //     siteId: Number(record?.siteId),
            //     ipAddress: record?.ipAddress || "",
            //   })
            // }
          />
        ),
      },
    ];
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = async () => {
    if (!text || text.length === 0) {
      return;
    }

    setQ(text.trim());
  };

  React.useEffect(() => {
    setPage(1);
  }, [q]);

  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center w-full md:px-48 px-12">
        <div className="flex md:flex-row flex-col items-center justify-between w-full md:gap-0 gap-2">
          <div className="flex flex-row gap-2 md:flex-[1px] md:w-fit w-full">
            <Box
              label="신규 등록건수"
              value={`${statisticsOverview?.todayCount || 0}건`}
              className="md:w-1/5 w-full"
            />
            <Box
              label={"총 등록건수"}
              value={`${statisticsOverview?.totalCount || 0}건`}
              className="md:w-1/5 w-full"
            />
          </div>
          <CreateBlackListedUser />
        </div>
        <div className="w-full mt-4 flex md:flex-row flex-col gap-2">
          <input
            type="text"
            placeholder="아이디, 닉네임, 예금주명, 핸드폰번호, 계좌번호, IP 입력"
            className="w-full h-14 border border-solid border-black px-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div>
            <Button
              loading={isFetching}
              className="md:w-40 w-full h-14 bg-[#f3f3f3]"
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>
        </div>
      </div>

      <div className="md:px-48 px-12 w-full">
        <div
          className={`overflow-auto md:max-h-[50rem] max-h-[25rem] ${
            (blackListedUsers?.length === 0 || q.length === 0) && "hidden"
          }`}
        >
          <List
            data={blackListedUsers}
            columns={columnsWithActions}
            titleCenter
            loading={isFetching}
          />
        </div>
        {!(blackListedUsers?.length === 0 || q.length === 0) && (
          <Pagination
            onChange={onPageChange}
            totalItems={totalElements}
            className="!px-0"
          />
        )}
      </div>

      <BlackListedUserDetailsModal
        isOpen={typeof selectedRow === "number"}
        onClose={() => setSelectedRow(null)}
        selectedId={selectedRow || undefined}
      />
    </CommonLayout>
  );
};

export default Page;
