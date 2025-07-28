import React, { useState, useMemo, useCallback } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  format,
  isSameDay,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  parseISO,
  isToday,
} from "date-fns";
import { ja } from "date-fns/locale";
import type { Schedule } from "../../types/schedule";
import { useThemeColor } from "../../hooks/useThemeColor";
import { CalendarHeader } from "../../components/ui/CalendarHeader";
import { CalendarCell } from "../../components/ui/CalendarCell";
import { WeekHeader } from "../../components/ui/WeekHeader";

const CALENDAR_PADDING = 16;


// ダミーデータ（本来はAPIやローカルストレージから取得）
const dummySchedules: Schedule[] = [
  {
    id: "1",
    calendarId: "cal1",
    title: "ミーティング",
    date: "2025-04-25", // YYYY-MM-DD形式
    allDay: false,
    startTime: "10:00",
    endTime: "11:00",
    assignedUserIds: ["user1"],
    createdBy: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    calendarId: "cal2",
    title: "園外保育",
    date: "2025-04-28",
    allDay: true,
    assignedUserIds: ["user1", "user2"],
    createdBy: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    calendarId: "cal1",
    title: "保護者会",
    date: "2025-05-10", // 来月のデータ
    allDay: false,
    startTime: "15:00",
    endTime: "16:00",
    assignedUserIds: ["user1"],
    createdBy: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function CalendarScreen() {
  const theme = useTheme();
  const backgroundColor = useThemeColor({}, "background");

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const parsedSchedules = useMemo(() => {
    return dummySchedules.map((schedule) => ({
      ...schedule,
      parsedDate: parseISO(schedule.date),
    }));
  }, []);

  const handleDatePress = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  }, []);

  const handlePanGesture = useCallback((event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const threshold = 50; // 最小スワイプ距離

      if (translationX > threshold) {
        // 右スワイプ = 前の月へ
        goToPreviousMonth();
      } else if (translationX < -threshold) {
        // 左スワイプ = 次の月へ
        goToNextMonth();
      }
    }
  }, [goToPreviousMonth, goToNextMonth]);

  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { locale: ja }); // 週の開始を日曜日に
    const endDate = endOfWeek(monthEnd, { locale: ja }); // 週の終わりを土曜日に

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentMonth]);

  const CELL_SIZE = useMemo(() => {
    const { width } = Dimensions.get("window");
    return Math.floor((width - CALENDAR_PADDING * 2) / 7);
  }, []);

  const styles = useMemo(
    () => createStyles(theme, CELL_SIZE),
    [theme, CELL_SIZE]
  );

  return (
    <Surface style={[styles.container, { backgroundColor }]}>
      <CalendarHeader
        title={format(currentMonth, "yyyy年 M月", { locale: ja })}
        onPreviousPress={goToPreviousMonth}
        onNextPress={goToNextMonth}
        onTodayPress={goToToday}
      />

      <PanGestureHandler onHandlerStateChange={handlePanGesture}>
        <View style={styles.content}>
          <WeekHeader cellSize={CELL_SIZE} />

          <View style={styles.grid}>
            {daysInGrid.map((day, index) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonthDay = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);
              const schedulesForDay = parsedSchedules.filter((schedule) =>
                isSameDay(day, schedule.parsedDate)
              );

              return (
                <CalendarCell
                  key={index}
                  date={day}
                  isSelected={!!isSelected}
                  isToday={isTodayDate}
                  isCurrentMonth={isCurrentMonthDay}
                  schedulesCount={schedulesForDay.length}
                  onPress={handleDatePress}
                />
              );
            })}
          </View>
        </View>
      </PanGestureHandler>
    </Surface>
  );
}

const createStyles = (theme: any, CELL_SIZE: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: CALENDAR_PADDING,
      paddingTop: 8,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
