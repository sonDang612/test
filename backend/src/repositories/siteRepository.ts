import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";
import { AppError } from "../utils/appError";
import { getErrorText } from "../utils/getErrorText";

const findAll = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.Site_FindAll
        @i_page = :page,
        @i_limit = :limit,
        @i_q = :q,
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

const create = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.Site_Create
        @i_name = :name,
        @i_ipAddress = :ipAddress,
        @i_token = :token,
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

  return true;
};

const checkValid = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      EXEC dbo.Site_CheckValid 
        @i_ipAddress = :ipAddress,
        @i_token = :token;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any;

  const result = records.find((r: any) => r.Result !== undefined)?.Result;

  return result === 1;
};

const siteRepository = { findAll, create, checkValid };

export default siteRepository;
