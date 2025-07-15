CREATE PROCEDURE dbo.AppConfig_ValidateKey
    @i_key NVARCHAR(100),
    @i_value NVARCHAR(100),
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        IF EXISTS (
            SELECT 1
            FROM AppConfigs
            WHERE [key] = @i_key
              AND [value] = @i_value
              AND isDeleted = 0
        )
        BEGIN
            SET @o_result = 0;
        END
        ELSE
        BEGIN
            SET @o_result = 1001;
        END
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX) = 
            'Procedure: AppConfig_ValidateKey, '
            + '@i_key = ' + ISNULL(@i_key, N'NULL') + ', '
            + '@i_value = ' + ISNULL(@i_value, N'NULL');

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SET @o_result = 1002;
    END CATCH
END
