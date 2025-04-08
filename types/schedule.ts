// types/schedule.ts
export type Schedule = {
  id: string; // スケジュールID
  calendarId: string; // 関連するカレンダーID
  title: string; // タイトル
  description?: string; // 詳細説明
  date: string; // 日付（YYYY-MM-DD形式）
  allDay: boolean; // 終日予定か
  startTime?: string; // 開始時間（HH:MM形式、終日でない場合）
  endTime?: string; // 終了時間（HH:MM形式、終日でない場合）
  location?: string; // 場所
  shiftIds?: string[]; // 関連するシフトIDリスト
  assignedUserIds: string[]; // アサインされたユーザーIDリスト
  notification?: {
    // 通知設定
    enabled: boolean;
    timing: number; // 予定前の通知タイミング（分）
  };
  createdBy: string; // 作成者ID
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時

  // Google連携用のフィールド（将来的な機能）
  externalSync?: {
    googleEventId?: string; // Google Calendar イベントID
    lastSyncedAt?: string; // 最終同期日時
    syncStatus?: "synced" | "pending" | "error"; // 同期ステータス
  };
};
