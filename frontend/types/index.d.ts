export type Site = {
  id?: string | undefined;
  name?: string | undefined;
  ipAddress?: string | undefined;
  reason?: string | undefined;
  blackListedTypes?: BlackListedType[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};

export type BlackListedType = {
  id?: string | undefined;
  name?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};

export type BlackListedUser = {
  id?: number | undefined;
  userId?: string | undefined;
  nickName?: string | undefined;
  phoneNumber?: string | undefined;
  bankName?: string | undefined;
  bankAccount?: string | undefined;
  bankOwner?: string | undefined;
  sites?: Site[];
  siteName?: string | undefined;
  siteId?: number | undefined;
  ipAddress?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};

export type StatisticsOverview = {
  totalCount?: number | undefined;
  todayCount?: number | undefined;
};

export type AllowedIP = {
  ipAddress?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};
