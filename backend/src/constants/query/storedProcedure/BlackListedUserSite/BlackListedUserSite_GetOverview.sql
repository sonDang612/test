CREATE PROCEDURE dbo.BlackListedUserSite_GetOverview
    @o_totalCount INT OUTPUT,
    @o_todayCount INT OUTPUT,
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        -- Đếm tổng số bản ghi không bị xóa
        SELECT @o_totalCount = COUNT(*)
        FROM BlackListedUser_Site
        WHERE isDeleted = 0;

        -- Đếm số bản ghi được tạo hôm nay
        SELECT @o_todayCount = COUNT(*)
        FROM BlackListedUser_Site
        WHERE isDeleted = 0
          AND CAST(createdAt AS DATE) = CAST(GETDATE() AS DATE);

        SET @o_result = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: BlackListedUserSite_GetCounts, '
            + '@o_totalCount = ' + ISNULL(CAST(@o_totalCount AS NVARCHAR), 'NULL')
            + ', @o_todayCount = ' + ISNULL(CAST(@o_todayCount AS NVARCHAR), 'NULL');

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;

        SET @o_result = 1001;
        SET @o_totalCount = -1;
        SET @o_todayCount = -1;
    END CATCH
END;
