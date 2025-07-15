import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";

const validateAppConfigKey = async (
  key: string,
  value: string
): Promise<boolean> => {
  const replacements = { i_key: key, i_value: value };

  const records = (await sequelize.query(
    `
    DECLARE @o_result INT;
    EXEC dbo.AppConfig_ValidateKey
      @i_key = :i_key,
      @i_value = :i_value,
      @o_result = @o_result OUTPUT;
    SELECT @o_result AS result;
    `,
    {
      replacements,
      type: QueryTypes.SELECT,
    }
  )) as any;

  const output = records.find((r: any) => r.result !== undefined)?.result;
  return output === 0;
};

const appConfigsRepository = { validateAppConfigKey };

export default appConfigsRepository;
