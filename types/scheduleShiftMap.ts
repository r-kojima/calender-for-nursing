// スケジュールとシフトの関係
export type ScheduleShiftMap = {
  id: string; // "scheduleId#shiftId" 形式
  scheduleId: string; // スケジュールID
  shiftId: string; // シフトID
  createdAt: string;
};
