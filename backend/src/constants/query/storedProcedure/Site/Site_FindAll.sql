CREATE PROCEDURE dbo.Site_FindAll
    @i_page INT = 1,
    @i_limit INT = 10,
    @i_q NVARCHAR(100) = NULL,
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        DECLARE @Offset INT = (@i_page - 1) * @i_limit;

        SELECT 
              id,
			  name,
			  createdAt,
			  [token],
			  ipAddress
        FROM Site
        WHERE isDeleted = 0
            AND (@i_q IS NULL OR name LIKE '%' + @i_q + '%')
        ORDER BY id DESC
        OFFSET @Offset ROWS FETCH NEXT @i_limit ROWS ONLY;

        SET @o_result = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: Site_FindAll, '
            + '@i_page = ' + CAST(@i_page AS NVARCHAR)
            + ', @i_limit = ' + CAST(@i_limit AS NVARCHAR)
            + ', @i_q = ' + ISNULL(@i_q, N'NULL');

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;

        SET @o_result = 1001;
    END CATCH
END
