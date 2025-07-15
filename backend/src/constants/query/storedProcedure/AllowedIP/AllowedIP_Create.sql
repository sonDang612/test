CREATE PROCEDURE dbo.AllowedIP_Create
    @i_ipAddress VARCHAR(45),
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        IF NOT EXISTS (
            SELECT 1 FROM dbo.AllowedIP WHERE ipAddress = @i_ipAddress AND isDeleted = 0
        )
        BEGIN
            INSERT INTO dbo.AllowedIP (ipAddress, createdAt, updatedAt, isDeleted)
            VALUES (@i_ipAddress, GETDATE(), GETDATE(), 0);
        END;

        SELECT TOP 1 * FROM dbo.AllowedIP WHERE ipAddress = @i_ipAddress AND isDeleted = 0;

        SET @o_result = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: AllowedIP_Create, '
            + '@i_ipAddress = ' + ISNULL(@i_ipAddress, 'NULL');

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;

        SET @o_result = 1001;
    END CATCH
END;
