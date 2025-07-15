CREATE PROCEDURE dbo.Site_Create
    @i_name NVARCHAR(100),
    @i_ipAddress VARCHAR(45),
    @i_token NVARCHAR(500),
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    BEGIN TRY
        -- Insert Site mới
        INSERT INTO Site (name, ipAddress, token, createdAt, updatedAt, isDeleted)
        VALUES (@i_name, @i_ipAddress, @i_token, GETDATE(), GETDATE(), 0);

        SET @o_result = 0; -- Success
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Procedure: Site_Create, '
            + '@i_name = ' + ISNULL(@i_name, N'NULL')
            + ', @i_ipAddress = ' + ISNULL(@i_ipAddress, N'NULL')
            + ', @i_token = ' + ISNULL(@i_token, N'NULL');
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SET @o_result = 1001; -- Error
    END CATCH
END