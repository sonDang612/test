CREATE PROCEDURE dbo.BlackListedUser_Insert
    @i_userId VARCHAR(100),
    @i_siteId INT,
    @i_reason TEXT = NULL,
    @i_phoneNumber VARCHAR(20),
    @i_nickName NVARCHAR(255),
    @i_ipAddress VARCHAR(45),
    @i_bankAccount VARCHAR(100),
    @i_bankName NVARCHAR(255),
    @i_bankOwner NVARCHAR(255),
    @i_blackListedTypeIds NVARCHAR(MAX), -- ví dụ '1,2,3'
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    BEGIN TRY
        DECLARE @ExistingUserId INT;

        -- Kiểm tra người dùng đã tồn tại
        SELECT TOP 1 @ExistingUserId = id
        FROM BlackListedUser
        WHERE
            phoneNumber = @i_phoneNumber AND
            bankAccount = @i_bankAccount AND
            bankName = @i_bankName AND
            bankOwner = @i_bankOwner AND
            isDeleted = 0;

        -- Nếu đã có user
        IF @ExistingUserId IS NOT NULL
        BEGIN
            -- Nếu đã có mapping site
            IF EXISTS (
                SELECT 1 FROM BlackListedUser_Site
                WHERE blackListedUserId = @ExistingUserId
                  AND siteId = @i_siteId
                  AND isDeleted = 0
            )
            BEGIN
                SET @o_result = 1002;
                RETURN;
            END

            -- Thêm mapping site (có ipAddress và reason)
            INSERT INTO BlackListedUser_Site (
                blackListedUserId,
                siteId,
                ipAddress,
                reason,
                createdAt,
                updatedAt,
                isDeleted
            )
            VALUES (
                @ExistingUserId,
                @i_siteId,
                @i_ipAddress,
                @i_reason,
                GETDATE(),
                GETDATE(),
                0
            );

            -- Thêm mapping blacklist type nếu chưa có
            INSERT INTO BlackListedUser_BlackListedType (
                blackListedUserId,
                blackListedTypeId,
                siteId,
                createdAt,
                updatedAt,
                isDeleted
            )
            SELECT
                @ExistingUserId,
                TRY_CAST(value AS INT),
                @i_siteId,
                GETDATE(),
                GETDATE(),
                0
            FROM STRING_SPLIT(@i_blackListedTypeIds, ',') AS s
            WHERE
                TRY_CAST(s.value AS INT) IS NOT NULL
                AND NOT EXISTS (
                    SELECT 1 FROM BlackListedUser_BlackListedType
                    WHERE blackListedUserId = @ExistingUserId
                      AND blackListedTypeId = TRY_CAST(s.value AS INT)
                      AND siteId = @i_siteId
                      AND isDeleted = 0
                );

            SET @o_result = 0;
            SELECT * FROM BlackListedUser WHERE id = @ExistingUserId AND isDeleted = 0;
            RETURN;
        END

        -- Tạo mới user
        INSERT INTO BlackListedUser (
            userId,
            phoneNumber,
            nickName,
            bankAccount,
            bankName,
            bankOwner,
            createdAt,
            updatedAt,
            isDeleted
        )
        VALUES (
            @i_userId,
            @i_phoneNumber,
            @i_nickName,
            @i_bankAccount,
            @i_bankName,
            @i_bankOwner,
            GETDATE(),
            GETDATE(),
            0
        );

        DECLARE @InsertedID INT = SCOPE_IDENTITY();

        -- Insert vào BlackListedUser_Site (có ipAddress và reason)
        INSERT INTO BlackListedUser_Site (
            blackListedUserId,
            siteId,
            ipAddress,
            reason,
            createdAt,
            updatedAt,
            isDeleted
        )
        VALUES (
            @InsertedID,
            @i_siteId,
            @i_ipAddress,
            @i_reason,
            GETDATE(),
            GETDATE(),
            0
        );

        -- Map blacklist type
        INSERT INTO BlackListedUser_BlackListedType (
            blackListedUserId,
            blackListedTypeId,
            siteId,
            createdAt,
            updatedAt,
            isDeleted
        )
        SELECT
            @InsertedID,
            TRY_CAST(value AS INT),
            @i_siteId,
            GETDATE(),
            GETDATE(),
            0
        FROM STRING_SPLIT(@i_blackListedTypeIds, ',')
        WHERE TRY_CAST(value AS INT) IS NOT NULL;

        SET @o_result = 0;
        SELECT * FROM BlackListedUser WHERE id = @InsertedID AND isDeleted = 0;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              '@i_userId = ' + CAST(ISNULL(@i_userId, '') AS NVARCHAR)
            + ', @i_siteId = ' + CAST(ISNULL(@i_siteId, 0) AS NVARCHAR)
            + ', @i_blackListedTypeIds = ' + ISNULL(@i_blackListedTypeIds, 'NULL');
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SET @o_result = 500;
    END CATCH
END
