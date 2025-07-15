CREATE PROCEDURE dbo.AllowedIP_FindOneByIP
    @i_ipAddress NVARCHAR(100) = NULL,
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        SELECT TOP 1
            id
        FROM AllowedIP
        WHERE isDeleted = 0
            AND (@i_ipAddress IS NULL OR ipAddress = @i_ipAddress);

        SET @o_result = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: AllowedIP_FindOneByIP, '
            + '@i_ipAddress = ' + ISNULL(@i_ipAddress, 'NULL');

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;

        SET @o_result = 1001;
    END CATCH
END
