CREATE PROCEDURE dbo.Site_CheckValid
    @i_ipAddress NVARCHAR(45),
    @i_token NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    
    BEGIN TRY
        IF EXISTS (
            SELECT 1 
            FROM Site 
            WHERE [token] = @i_token 
                AND ipAddress = @i_ipAddress 
                AND isDeleted = 0
        )
        BEGIN
            SELECT 1 AS Result;
        END
        ELSE
        BEGIN
            SELECT 0 AS Result;
        END
        
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: Site_CheckValid, '
            + '@i_ipAddress = ' + ISNULL(@i_ipAddress, N'NULL')
            + ', @i_token = ' + ISNULL(@i_token, N'NULL');
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SELECT 0 AS Result;
    END CATCH
END