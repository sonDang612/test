CREATE PROCEDURE dbo.Account_FindOne
    @i_id INT = NULL,
    @i_userName NVARCHAR(255) = NULL,
    @i_nickName NVARCHAR(100) = NULL,
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    BEGIN TRY
        IF NOT EXISTS (
            SELECT 1 FROM Account 
            WHERE 
                isDeleted = 0 AND
                (
                    (@i_id IS NOT NULL AND id = @i_id) OR
                    (@i_userName IS NOT NULL AND userName = @i_userName) OR
                    (@i_nickName IS NOT NULL AND nickName = @i_nickName)
                )
        )
        BEGIN
            SET @o_result = 1004;
            RETURN;
        END

        SELECT TOP 1
            id,
            nickName,
            userName,
            role,
            createdAt,
            updatedAt
        FROM Account
        WHERE 
            isDeleted = 0 AND
            (
                (@i_id IS NOT NULL AND id = @i_id) OR
                (@i_userName IS NOT NULL AND userName = @i_userName) OR
                (@i_nickName IS NOT NULL AND nickName = @i_nickName)
            );

        SET @o_result = 0;
    END TRY

    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Error in Account_FindOne: '
            + ' @i_id = ' + ISNULL(CAST(@i_id AS NVARCHAR), 'NULL')
            + ', @i_userName = ' + ISNULL(@i_userName, N'NULL')
            + ', @i_nickName = ' + ISNULL(@i_nickName, N'NULL')
            + ', ErrorMessage = ' + ERROR_MESSAGE();

        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SET @o_result = 9999;
    END CATCH
END
