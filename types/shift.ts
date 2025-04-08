// types/shift.ts
export type Shift = {
  id: string; // シフトID
  name: string; // シフト名（例：「早番」「遅番」）
  color: string; // シフトの色
  startTime: string; // 開始時間（HH:MM形式）
  endTime: string; // 終了時間（HH:MM形式）
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時
};
