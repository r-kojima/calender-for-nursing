import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Surface, Appbar, useTheme } from "react-native-paper";
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
  getDay,
  parseISO,
  isToday,
} from "date-fns";
import { ja } from "date-fns/locale";
import type { Schedule } from "../../types/schedule";
import { useThemeColor } from "../../hooks/useThemeColor";

const { width } = Dimensions.get("window");
const CALENDAR_PADDING = 16;
const CELL_SIZE = Math.floor((width - CALENDAR_PADDING * 2) / 7);

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

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
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  
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

  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { locale: ja }); // 週の開始を日曜日に
    const endDate = endOfWeek(monthEnd, { locale: ja }); // 週の終わりを土曜日に

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentMonth]);

  const styles = useMemo(() => createStyles(theme, textColor), [theme, textColor]);

  return (
    <Surface style={[styles.container, { backgroundColor }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="chevron-left" onPress={goToPreviousMonth} />
        <Appbar.Content
          title={format(currentMonth, "yyyy年 M月", { locale: ja })}
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action icon="chevron-right" onPress={goToNextMonth} />
      </Appbar.Header>
      
      <View style={styles.content}>
        <View style={styles.weekHeader}>
          {weekDays.map((day) => (
            <View key={day} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          {daysInGrid.map((day, index) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonthDay = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const dayOfWeek = getDay(day);
            const schedulesForDay = parsedSchedules.filter((schedule) =>
              isSameDay(day, schedule.parsedDate)
            );

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cell,
                  isSelected && styles.selectedCell,
                  isTodayDate && styles.todayCell,
                ]}
                onPress={() => handleDatePress(day)}
                activeOpacity={0.7}
              >
                <View style={styles.cellContent}>
                  <Text
                    style={[
                      styles.dayText,
                      !isCurrentMonthDay && styles.otherMonthDayText,
                      dayOfWeek === 0 && styles.sundayText,
                      dayOfWeek === 6 && styles.saturdayText,
                      isSelected && styles.selectedDayText,
                      isTodayDate && styles.todayText,
                    ]}
                  >
                    {format(day, "d")}
                  </Text>
                  
                  {schedulesForDay.length > 0 && (
                    <View style={styles.scheduleContainer}>
                      {schedulesForDay.slice(0, 3).map((_, idx) => (
                        <View key={idx} style={styles.scheduleIndicator} />
                      ))}
                      {schedulesForDay.length > 3 && (
                        <Text style={styles.moreIndicator}>+{schedulesForDay.length - 3}</Text>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Surface>
  );
}

const createStyles = (theme: any, textColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitle: {
      color: textColor,
      fontSize: 18,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: CALENDAR_PADDING,
      paddingTop: 8,
    },
    weekHeader: {
      flexDirection: 'row',
      marginBottom: 8,
      paddingVertical: 8,
    },
    weekDayCell: {
      width: CELL_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekDayText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
      textTransform: 'uppercase',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE * 1.2,
      padding: 4,
      borderRadius: 8,
      marginBottom: 2,
    },
    cellContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 6,
    },
    selectedCell: {
      backgroundColor: theme.colors.primaryContainer,
    },
    todayCell: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    dayText: {
      fontSize: 16,
      fontWeight: '500',
      color: textColor,
    },
    selectedDayText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: '700',
    },
    todayText: {
      color: theme.colors.onSecondaryContainer,
      fontWeight: '600',
    },
    otherMonthDayText: {
      color: theme.colors.onSurfaceDisabled,
    },
    sundayText: {
      color: theme.colors.error,
    },
    saturdayText: {
      color: theme.colors.primary,
    },
    scheduleContainer: {
      flexDirection: 'row',
      marginTop: 4,
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    scheduleIndicator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.tertiary,
      marginHorizontal: 1,
      marginVertical: 1,
    },
    moreIndicator: {
      fontSize: 8,
      color: theme.colors.onSurfaceVariant,
      fontWeight: '600',
      marginLeft: 2,
    },
  });
