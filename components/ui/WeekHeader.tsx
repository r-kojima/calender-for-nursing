import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

interface WeekHeaderProps {
  cellSize: number;
}

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export function WeekHeader({ cellSize }: WeekHeaderProps) {
  const theme = useTheme();
  const styles = createStyles(theme, cellSize);

  return (
    <View style={styles.weekHeader}>
      {weekDays.map((day, index) => (
        <View key={day} style={styles.weekDayCell}>
          <Text 
            style={[
              styles.weekDayText,
              index === 0 && styles.sundayWeekText,
              index === 6 && styles.saturdayWeekText,
            ]}
          >
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: any, cellSize: number) =>
  StyleSheet.create({
    weekHeader: {
      flexDirection: "row",
      marginBottom: 8,
      paddingVertical: 8,
    },
    weekDayCell: {
      width: cellSize,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    weekDayText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.onSurfaceVariant,
      textTransform: "uppercase",
    },
    sundayWeekText: {
      color: theme.colors.error,
    },
    saturdayWeekText: {
      color: theme.colors.primary,
    },
  });