import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";

const findOneByIP = async (ipAddress: string) => {
  const replacements = { i_ipAddress: ipAddress };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.AllowedIP_FindOneByIP
        @i_ipAddress = :i_ipAddress,
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
    return null;
  }

  const data = records.find((r: any) => r.id !== undefined) || null;

  return data;
};

const findAll = async (payload: any) => {
  const { page, limit, q, sortBy, sort } = payload;
  const replacements = {
    i_page: page,
    i_limit: limit,
    i_q: q || null,
    i_sortBy: sortBy,
    i_sort: sort,
  };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.AllowedIP_FindAll
        @i_page = :i_page,
        @i_limit = :i_limit,
        @i_q = :i_q,
        @i_sortBy = :i_sortBy,
        @i_sort = :i_sort,
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
    return null;
  }

  const totalCount =
    records.find((r: any) => r.TotalCount !== undefined)?.TotalCount || 0;
  const data = records.filter((r: any) => r.id !== undefined);

  return {
    data,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
};

const create = async (ipAddress: string) => {
  const replacements = { i_ipAddress: ipAddress };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.AllowedIP_Create
        @i_ipAddress = :i_ipAddress,
        @o_result = @o_Result OUTPUT;
      SELECT @o_Result AS Result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any[];

  const outputRecord = records.find((r: any) => r.Result !== undefined);
  const output = outputRecord?.Result ?? 1001;

  if (output !== 0) {
    return null;
  }

  const data = records.find((r: any) => r.id !== undefined) || null;

  return data;
};

const allowedIPRepository = { findOneByIP, findAll, create };

export default allowedIPRepository;
