CREATE PROCEDURE dbo.BlackListedUser_FindById
    @i_id INT,
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SET @o_result = 0;

        IF NOT EXISTS (
            SELECT 1 FROM BlackListedUser WHERE id = @i_id AND isDeleted = 0
        )
        BEGIN
            SELECT NULL AS userInfo, NULL AS siteMappingsJson;
            RETURN;
        END

        SELECT
            blu.id AS blackListedUserId,
            blu.userId,
            blu.phoneNumber,
            blu.nickName,
            blu.bankAccount,
            blu.bankName,
            blu.bankOwner,
            blu.createdAt,
            blu.updatedAt
        INTO #UserTemp
        FROM BlackListedUser blu
        WHERE blu.id = @i_id;


        SELECT
            (SELECT * FROM #UserTemp FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS userInfo,

            (
                SELECT 
                    bs.siteId,
                    s.name,
                    bs.ipAddress,
                    bs.reason,
                    bs.createdAt,
                    bs.updatedAt,
                    (
                        SELECT blackListedTypeId as id
                        FROM BlackListedUser_BlackListedType bbt
                        WHERE bbt.blackListedUserId = bs.blackListedUserId
                          AND bbt.siteId = bs.siteId
                          AND bbt.isDeleted = 0
                        FOR JSON PATH
                    ) AS blackListedTypes
                FROM BlackListedUser_Site bs
                INNER JOIN Site s ON s.id = bs.siteId
                WHERE bs.blackListedUserId = @i_id AND bs.isDeleted = 0
                FOR JSON PATH
            ) AS sites;

        DROP TABLE #UserTemp;

        SET @o_result = 1;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = '@i_id = ' + CAST(ISNULL(@i_id, 0) AS NVARCHAR);
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;

        SELECT NULL AS userInfo, NULL AS siteMappingsJson;

        -- Gán kết quả lỗi
        SET @o_result = -1;
    END CATCH
END
