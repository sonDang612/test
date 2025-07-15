CREATE PROCEDURE dbo.BlackListedUser_FindAll
    @i_page INT = 1,
    @i_limit INT = 10,
    @i_q NVARCHAR(255) = NULL,
    @i_sortBy NVARCHAR(100) = 'createdAt',
    @i_sort NVARCHAR(4) = 'DESC',
    @o_result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    BEGIN TRY
        DECLARE @Offset INT = (@i_page - 1) * @i_limit;
        DECLARE @Search NVARCHAR(255) = '%' + ISNULL(@i_q, '') + '%';
        
        -- Whitelist sortBy
        IF @i_sortBy NOT IN (
            'id', 'userId', 'nickName', 'phoneNumber', 'bankName',
            'bankAccount', 'bankOwner', 'createdAt', 'updatedAt'
        )
        BEGIN
            SET @i_sortBy = 'createdAt';
        END
        
        IF UPPER(@i_sort) NOT IN ('ASC', 'DESC')
        BEGIN
            SET @i_sort = 'DESC';
        END
        
        -- First get total count
        DECLARE @TotalCount INT;
        SELECT @TotalCount = COUNT(*)
        FROM BlackListedUser U
        LEFT JOIN BlackListedUser_Site US ON U.id = US.blackListedUserId AND US.isDeleted = 0
        LEFT JOIN Site S ON US.siteId = S.id AND S.isDeleted = 0
        WHERE U.isDeleted = 0 
        AND (
            @i_q IS NULL OR
            U.userId LIKE @Search OR
            U.nickName LIKE @Search OR
            U.phoneNumber LIKE @Search OR
            U.bankName LIKE @Search OR
            U.bankAccount LIKE @Search OR
            U.bankOwner LIKE @Search OR
            US.ipAddress LIKE @Search OR
            US.reason LIKE @Search OR
            S.name LIKE @Search
        );
        
        -- Return total count first
        SELECT @TotalCount AS TotalCount;
        
        -- Then return paginated data
        SELECT 
            U.id,
            U.userId,
            U.nickName,
            U.phoneNumber,
            U.bankName,
            U.bankAccount,
            U.bankOwner,
            US.ipAddress,
            US.reason,
            U.createdAt,
            U.updatedAt,
            S.name AS siteName,
            S.id AS siteId
        FROM BlackListedUser U
        LEFT JOIN BlackListedUser_Site US ON U.id = US.blackListedUserId AND US.isDeleted = 0
        LEFT JOIN Site S ON US.siteId = S.id AND S.isDeleted = 0
        WHERE U.isDeleted = 0 
        AND (
            @i_q IS NULL OR
            U.userId LIKE @Search OR
            U.nickName LIKE @Search OR
            U.phoneNumber LIKE @Search OR
            U.bankName LIKE @Search OR
            U.bankAccount LIKE @Search OR
            U.bankOwner LIKE @Search OR
            US.ipAddress LIKE @Search OR
            US.reason LIKE @Search OR
            S.name LIKE @Search
        )
        ORDER BY 
            CASE WHEN @i_sortBy = 'id' AND @i_sort = 'ASC' THEN U.id END ASC,
            CASE WHEN @i_sortBy = 'id' AND @i_sort = 'DESC' THEN U.id END DESC,
            CASE WHEN @i_sortBy = 'userId' AND @i_sort = 'ASC' THEN U.userId END ASC,
            CASE WHEN @i_sortBy = 'userId' AND @i_sort = 'DESC' THEN U.userId END DESC,
            CASE WHEN @i_sortBy = 'nickName' AND @i_sort = 'ASC' THEN U.nickName END ASC,
            CASE WHEN @i_sortBy = 'nickName' AND @i_sort = 'DESC' THEN U.nickName END DESC,
            CASE WHEN @i_sortBy = 'phoneNumber' AND @i_sort = 'ASC' THEN U.phoneNumber END ASC,
            CASE WHEN @i_sortBy = 'phoneNumber' AND @i_sort = 'DESC' THEN U.phoneNumber END DESC,
            CASE WHEN @i_sortBy = 'bankName' AND @i_sort = 'ASC' THEN U.bankName END ASC,
            CASE WHEN @i_sortBy = 'bankName' AND @i_sort = 'DESC' THEN U.bankName END DESC,
            CASE WHEN @i_sortBy = 'bankAccount' AND @i_sort = 'ASC' THEN U.bankAccount END ASC,
            CASE WHEN @i_sortBy = 'bankAccount' AND @i_sort = 'DESC' THEN U.bankAccount END DESC,
            CASE WHEN @i_sortBy = 'bankOwner' AND @i_sort = 'ASC' THEN U.bankOwner END ASC,
            CASE WHEN @i_sortBy = 'bankOwner' AND @i_sort = 'DESC' THEN U.bankOwner END DESC,
            CASE WHEN @i_sortBy = 'createdAt' AND @i_sort = 'ASC' THEN U.createdAt END ASC,
            CASE WHEN @i_sortBy = 'createdAt' AND @i_sort = 'DESC' THEN U.createdAt END DESC,
            CASE WHEN @i_sortBy = 'updatedAt' AND @i_sort = 'ASC' THEN U.updatedAt END ASC,
            CASE WHEN @i_sortBy = 'updatedAt' AND @i_sort = 'DESC' THEN U.updatedAt END DESC,
            US.siteId -- Secondary sort for consistency
        OFFSET @Offset ROWS 
        FETCH NEXT @i_limit ROWS ONLY;
        
        SET @o_result = 0;
        
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Error in BlackListedUser_FindAll: '
            + ' @i_page = ' + CAST(@i_page AS NVARCHAR)
            + ', @i_limit = ' + CAST(@i_limit AS NVARCHAR)
            + ', @i_sortBy = ' + ISNULL(@i_sortBy, 'NULL')
            + ', @i_sort = ' + ISNULL(@i_sort, 'NULL')
            + ', @i_q = ' + ISNULL(@i_q, N'NULL')
            + ', ErrorMessage = ' + ERROR_MESSAGE();
        
        EXEC dbo.Proc_ErrorProc_Insert @ErrorContent;
        SET @o_result = 9999;
    END CATCH
END