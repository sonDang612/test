CREATE PROCEDURE dbo.AllowedIP_FindAll
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
            'id', 'ipAddress', 'createdAt', 'updatedAt'
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
        FROM AllowedIP A
        WHERE A.isDeleted = 0 
        AND (
            @i_q IS NULL OR
            A.ipAddress LIKE @Search
        );
        
        -- Return total count first
        SELECT @TotalCount AS TotalCount;
        
        -- Then return paginated data
        SELECT 
            A.id,
            A.ipAddress,
            A.createdAt,
            A.updatedAt
        FROM AllowedIP A
        WHERE A.isDeleted = 0 
        AND (
            @i_q IS NULL OR
            A.ipAddress LIKE @Search
        )
        ORDER BY 
            CASE WHEN @i_sortBy = 'id' AND @i_sort = 'ASC' THEN A.id END ASC,
            CASE WHEN @i_sortBy = 'id' AND @i_sort = 'DESC' THEN A.id END DESC,
            CASE WHEN @i_sortBy = 'ipAddress' AND @i_sort = 'ASC' THEN A.ipAddress END ASC,
            CASE WHEN @i_sortBy = 'ipAddress' AND @i_sort = 'DESC' THEN A.ipAddress END DESC,
            CASE WHEN @i_sortBy = 'createdAt' AND @i_sort = 'ASC' THEN A.createdAt END ASC,
            CASE WHEN @i_sortBy = 'createdAt' AND @i_sort = 'DESC' THEN A.createdAt END DESC,
            CASE WHEN @i_sortBy = 'updatedAt' AND @i_sort = 'ASC' THEN A.updatedAt END ASC,
            CASE WHEN @i_sortBy = 'updatedAt' AND @i_sort = 'DESC' THEN A.updatedAt END DESC,
            A.id -- Secondary sort for consistency
        OFFSET @Offset ROWS 
        FETCH NEXT @i_limit ROWS ONLY;
        
        SET @o_result = 0;
        
    END TRY
    BEGIN CATCH
        DECLARE @ErrorContent NVARCHAR(MAX);
        SET @ErrorContent = 
              'Error in AllowedIP_FindAll: '
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