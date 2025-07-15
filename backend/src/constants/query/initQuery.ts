const createBlackListedUserQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'BlackListedUser'
    )
    BEGIN
        CREATE TABLE BlackListedUser (
            id INT IDENTITY(1,1) PRIMARY KEY,
            userId NVARCHAR(100) NOT NULL,
            phoneNumber VARCHAR(20) NOT NULL,
            nickName NVARCHAR(255) NOT NULL,
            bankName NVARCHAR(100) NOT NULL,
            bankAccount NVARCHAR(100) NOT NULL,
            bankOwner NVARCHAR(100) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;

const createAccountQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'Account'
    )
    BEGIN
        CREATE TABLE Account (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nickName NVARCHAR(100) NOT NULL,
            userName NVARCHAR(255) NOT NULL,
            password NVARCHAR(100) NOT NULL,
            role INT NOT NULL DEFAULT 1,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;

const createBlackListedTypeQuery = `
     IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'BlackListedType'
    )
    BEGIN
        CREATE TABLE BlackListedType (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name  NVARCHAR(100) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;
const createSiteQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'Site'
    )
    BEGIN
        CREATE TABLE Site (
            id INT IDENTITY(1,1) PRIMARY KEY,
            name  NVARCHAR(100) NOT NULL,
            ipAddress VARCHAR(45) NOT NULL,
            token NVARCHAR(500) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;

const createBlackListedUserSiteQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'BlackListedUser_Site'
    )
    BEGIN
        CREATE TABLE BlackListedUser_Site (
            id INT IDENTITY(1,1) PRIMARY KEY,
            blackListedUserId INT NOT NULL,
            siteId INT NOT NULL,
            ipAddress VARCHAR(45),
            reason NVARCHAR(500)   ,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0,
            CONSTRAINT UQ_BlackListedUser_Site UNIQUE (blackListedUserId, siteId, ipAddress),
            FOREIGN KEY (blackListedUserId) REFERENCES BlackListedUser(id),
            FOREIGN KEY (siteId) REFERENCES Site(id),
        )
    END
`;

const createBlackListedUserBlackListedTypeQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'BlackListedUser_BlackListedType'
    )
    BEGIN
        CREATE TABLE BlackListedUser_BlackListedType  (
            id INT IDENTITY(1,1) PRIMARY KEY,
            blackListedUserId INT NOT NULL,
            blackListedTypeId INT NOT NULL,
            siteId INT NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0,
            CONSTRAINT UQ_BlackListedUser_BlackListedType UNIQUE (blackListedUserId, blackListedTypeId, siteId),
            FOREIGN KEY (blackListedUserId) REFERENCES BlackListedUser(id),
            FOREIGN KEY (blackListedTypeId) REFERENCES BlackListedType(id),
            FOREIGN KEY (siteId) REFERENCES Site(id)
        )
    END
`;

const insertBlackListedTypeQuery = `
    INSERT INTO BlackListedType (name)
    VALUES 
    (N'카지노 양방'),
    (N'스포츠양방'),
    (N'통장협박'),
    (N'해킹'),
    (N'단폴베팅'),
    (N'진상'),
    (N'기타');
`;

const insertSiteQuery = `
    INSERT INTO Site (name, ipAddress, token)
    VALUES 
    (N'JOY', '118.71.93.52', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoxfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'),
    (N'블랙', '123.21.11.33', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ODkwMTIiLCJyb2xlIjoyfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk');
`;

const createAllowedIPQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'AllowedIP'
    )
    BEGIN
        CREATE TABLE AllowedIP (
            id INT IDENTITY(1,1) PRIMARY KEY,
            ipAddress VARCHAR(45) NOT NULL UNIQUE,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;

const insertAllowedIP = `
    INSERT INTO AllowedIP (ipAddress)
    VALUES 
    ('118.71.93.52'),
    ('123.21.11.33'),
    ('42.115.193.211');
`;

const createAppConfigsQuery = `
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = 'AppConfigs'
    )
    BEGIN
        CREATE TABLE AppConfigs (
            id INT IDENTITY(1,1) PRIMARY KEY,
            [key] NVARCHAR(100) NOT NULL,
            [value] NVARCHAR(100) NOT NULL,
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
            isDeleted BIT NOT NULL DEFAULT 0
        )
    END
`;

const insertAppConfigsQuery = `
    INSERT INTO AppConfigs ([key], [value])
    VALUES 
    ('MASTER_PASSWORD', '1'),
    ('SETTINGS_MASTER_CODE', '0P7J1hLsdEOyD5gqE0kROETptuJsU0NdDkRNVaB4faXK3T0ECV');
`;

const initQuery = `
    ${createBlackListedUserQuery}
    ${createBlackListedTypeQuery}
    ${createSiteQuery}
    ${createBlackListedUserSiteQuery}
    ${createBlackListedUserBlackListedTypeQuery}
    ${insertBlackListedTypeQuery}
    ${insertSiteQuery}
    ${createAllowedIPQuery}
    ${insertAllowedIP}
    ${createAppConfigsQuery}
    ${insertAppConfigsQuery}
`;

export { initQuery };
