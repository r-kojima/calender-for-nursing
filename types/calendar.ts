// types/calendar.ts
export type Calendar = {
  id: string; // カレンダーID
  name: string; // カレンダー名
  description?: string; // 説明
  color: string; // カレンダーの色（表示用）
  ownerId: string; // カレンダー作成者ID
  userIds: string[]; // アクセス権を持つユーザーのIDリスト
  scheduleIds: string[]; // 関連するスケジュールのIDリスト
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時
};
