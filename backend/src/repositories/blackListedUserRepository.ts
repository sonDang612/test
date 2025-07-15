import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";
import { AppError } from "../utils/appError";
import { getErrorText } from "../utils/getErrorText";

const create = async (payload: any): Promise<any> => {
  const replacements = {
    userId: payload.userId,
    siteId: payload.siteId,
    reason: payload.reason || null,
    phoneNumber: payload.phoneNumber,
    nickName: payload.nickName,
    ipAddress: payload?.ipAddress || "",
    bankAccount: payload.bankAccount,
    bankName: payload.bankName,
    bankOwner: payload.bankOwner,
    blackListedTypeIds:
      Array.isArray(payload?.blackListedTypeIds) &&
      payload?.blackListedTypeIds?.length > 0
        ? payload?.blackListedTypeIds?.join(",")
        : "...",
  };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;

      EXEC dbo.BlackListedUser_Insert
        @i_userId = :userId,
        @i_siteId = :siteId,
        @i_reason = :reason,
        @i_phoneNumber = :phoneNumber,
        @i_nickName = :nickName,
        @i_ipAddress = :ipAddress,
        @i_bankOwner = :bankOwner,
        @i_bankName = :bankName,
        @i_bankAccount = :bankAccount,
        @i_blackListedTypeIds = :blackListedTypeIds,
        @o_result = @o_Result OUTPUT;

      SELECT @o_Result AS Result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any[];

  const output = records.find((r: any) => r.Result !== undefined)?.Result;

  if (output !== 0) {
    throw AppError.BadRequest(getErrorText({ code: output, actor: "Account" }));
  }

  const insertedUser = records.find((r: any) => r?.id !== undefined);

  if (!insertedUser) {
    throw AppError.BadRequest();
  }

  return insertedUser;
};

const findAll = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.BlackListedUser_FindAll
        @i_page = :page,
        @i_limit = :limit,
        @i_q = :q,
        @i_sortBy = :sortBy,
        @i_sort = :sort,
        @o_result = @o_Result OUTPUT;
      SELECT @o_Result AS Result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any;

  const output = records.find((r: any) => r.Result !== undefined)?.Result;
  if (output !== 0) {
    throw AppError.BadRequest(getErrorText({ code: output }));
  }

  const total =
    records.find((r: any) => r.TotalCount !== undefined)?.TotalCount || 0;
  const data = records.filter((r: any) => r.id !== undefined);

  return {
    data,
    page: payload?.page,
    limit: payload?.limit,
    total,
  };
};

const findOneById = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.BlackListedUser_FindById
        @i_id = :id,
        @o_result = @o_Result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any;

  const result = records[0];

  const user = {
    ...JSON.parse(result?.userInfo),
    sites: JSON.parse(result?.sites),
  };

  return user;
};

const blackListedUserRepository = {
  create,
  findAll,
  findOneById,
};

export default blackListedUserRepository;
