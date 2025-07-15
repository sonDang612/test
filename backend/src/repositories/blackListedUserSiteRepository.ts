import { QueryTypes } from "sequelize";
import { sequelize } from "../configs/mssql";

const getOverview = async () => {
  const records = (await sequelize.query(
    `
      DECLARE @o_totalCount INT, @o_todayCount INT, @o_result INT;

      EXEC dbo.BlackListedUserSite_GetOverview
        @o_totalCount = @o_totalCount OUTPUT,
        @o_todayCount = @o_todayCount OUTPUT,
        @o_result = @o_result OUTPUT;

      SELECT 
        @o_totalCount AS totalCount,
        @o_todayCount AS todayCount,
        @o_result AS result;
    `,
    {
      type: QueryTypes.SELECT,
    }
  )) as any[];

  const output = records.find((r: any) => r.result !== undefined);

  if (!output) {
    return {
      totalCount: 0,
      todayCount: 0,
    };
  }

  const { result, totalCount, todayCount } = output;

  if (result !== 0) {
    return {
      totalCount: 0,
      todayCount: 0,
    };
  }

  return { totalCount, todayCount };
};

const softDeleteOne = async (payload: {
  blackListedUserId: number;
  siteId: number;
  ipAddress: string;
}) => {
  const { blackListedUserId, siteId, ipAddress } = payload;

  await sequelize.query(
    `
    EXEC dbo.BlackListedUserSite_SoftDelete
      @i_blackListedUserId = :blackListedUserId,
      @i_siteId = :siteId,
      @i_ipAddress = :ipAddress;
    `,
    {
      replacements: {
        blackListedUserId,
        siteId,
        ipAddress,
      },
      type: QueryTypes.RAW,
    }
  );

  return true;
};

const blackListedUserSiteRepository = { getOverview, softDeleteOne };

export default blackListedUserSiteRepository;
