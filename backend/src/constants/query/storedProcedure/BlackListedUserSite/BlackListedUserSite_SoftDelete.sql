CREATE PROCEDURE dbo.BlackListedUserSite_SoftDelete
    @i_blackListedUserId INT,
    @i_siteId INT,
    @i_ipAddress VARCHAR(45)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE BlackListedUser_Site
    SET 
        isDeleted = 1,
        updatedAt = GETDATE()
    WHERE 
        blackListedUserId = @i_blackListedUserId
        AND siteId = @i_siteId
        AND ipAddress = @i_ipAddress;
END
