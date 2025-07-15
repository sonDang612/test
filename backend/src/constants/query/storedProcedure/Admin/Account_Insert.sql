CREATE PROCEDURE dbo.Account_Insert
    @i_nickName NVARCHAR(100),
    @i_userName NVARCHAR(255),
    @i_password NVARCHAR(100),
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Account WHERE userName = @i_userName AND isDeleted = 0)
        BEGIN
            SET @o_result = 1002;
            RETURN;
        END

        INSERT INTO Account (
            nickName,
            userName,
            password,
            createdAt,
            updatedAt,
            isDeleted
        )
        VALUES (
            @i_nickName,
            @i_userName,
            @i_password,
            GETDATE(),
            GETDATE(),
            1
        );

        DECLARE @InsertedID INT = SCOPE_IDENTITY();

        SET @o_result = 0;

        SELECT A.id, A.nickName, A.userName FROM Account as A WHERE id = @InsertedID AND isDeleted = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              '@i_nickName = ' + ISNULL(@i_nickName, N'NULL') 
            + ', @i_userName = ' + ISNULL(@i_userName, N'NULL') 
            + ', @o_result = ' + CAST(@o_result AS NVARCHAR);
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
    END CATCH
END
