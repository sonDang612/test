import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";
import { AppError } from "../utils/appError";
import { getErrorText } from "../utils/getErrorText";
import { Account } from "../types";

const create = async (payload: any): Promise<Account> => {
  let records = (await sequelize.query(
    `
        DECLARE @o_Result INT;
        EXEC dbo.Account_Insert
            @i_nickName = :nickName,
            @i_userName = :userName,
            @i_password = :password,
            @o_Result = @o_Result OUTPUT;
        SELECT @o_Result AS Result;
    `,
    { replacements: payload, type: QueryTypes.SELECT }
  )) as any;

  const output = records.find((r: any) => r.Result !== undefined)?.Result;

  if (output !== 0) {
    throw AppError.BadRequest(getErrorText({ code: output }));
  }

  const insertedUser = records.find((r: any) => r?.id !== undefined);

  if (!insertedUser) {
    throw AppError.BadRequest();
  }

  return insertedUser;
};

const findOne = async (payload: Partial<Account>): Promise<Account> => {
  const replacements = {
    id: payload?.id ?? null,
    nickName: payload?.nickName ?? null,
    userName: payload?.userName ?? null,
  };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.Account_FindOne
        @i_id = :id,
        @i_userName = :userName,
        @i_nickName = :nickName,
        @o_result = @o_Result OUTPUT;
      SELECT @o_Result AS Result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any;

  const foundUser = records.find((r: any) => r?.id !== undefined);

  return foundUser || null;
};

const findOneOrFail = async (payload: Partial<Account>): Promise<Account> => {
  const replacements = {
    id: payload?.id ?? null,
    nickName: payload?.nickName ?? null,
    userName: payload?.userName ?? null,
  };

  const records = (await sequelize.query(
    `
      DECLARE @o_Result INT;
      EXEC dbo.Account_FindOne
        @i_id = :id,
        @i_userName = :userName,
        @i_nickName = :nickName,
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

  const foundUser = records.find((r: any) => r?.id !== undefined);

  if (!foundUser) {
    throw AppError.BadRequest();
  }

  return foundUser;
};

const accountRepository = { create, findOne, findOneOrFail };

export default accountRepository;
