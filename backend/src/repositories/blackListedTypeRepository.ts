import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";
import { AppError } from "../utils/appError";
import { getErrorText } from "../utils/getErrorText";

const findAll = async (payload: any) => {
  const replacements = { ...payload };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.BlackListedType_FindAll
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

const blackListedTypeRepository = { findAll };

export default blackListedTypeRepository;
