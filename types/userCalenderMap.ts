export type UserCalenderPermission = "read" | "write" | "admin";

// ユーザーとカレンダーの関係
export type UserCalendarMap = {
  id: string; // "userId#calendarId" 形式
  userId: string; // ユーザーID
  calendarId: string; // カレンダーID
  permission: UserCalenderPermission; // 権限情報
  createdAt: string;
  updatedAt: string;
};
