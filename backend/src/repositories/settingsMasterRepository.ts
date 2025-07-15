import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";

const getValueByKey = async (keyName: string) => {
  const result = await sequelize.query(
    `
    EXEC dbo.SettingsMaster_GetValueByKey
      @i_keyName = :keyName;
    `,
    {
      replacements: {
        keyName,
      },
      type: QueryTypes.SELECT,
    }
  );

  return result[0] || null;
};

const settingsMasterRepository = { getValueByKey };

export default settingsMasterRepository;
