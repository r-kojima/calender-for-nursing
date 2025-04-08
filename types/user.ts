export type User = {
  id: string; // ユーザーID
  email: string; // メールアドレス
  name: string; // 氏名
  calendarIds: string[]; // 参加しているカレンダーID
  createdAt: string; // 作成日時
  updatedAt: string; // 更新日時
};
