import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { format, getDay } from 'date-fns';
import { useThemeColor } from '../../hooks/useThemeColor';

const { width } = Dimensions.get("window");
const CALENDAR_PADDING = 16;
const CELL_SIZE = Math.floor((width - CALENDAR_PADDING * 2) / 7);

interface CalendarCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  schedulesCount: number;
  onPress: (date: Date) => void;
}

export function CalendarCell({
  date,
  isSelected,
  isToday,
  isCurrentMonth,
  schedulesCount,
  onPress,
}: CalendarCellProps) {
  const theme = useTheme();
  const textColor = useThemeColor({}, 'text');
  const dayOfWeek = getDay(date);

  const styles = StyleSheet.create({
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE * 1.2,
      padding: 4,
      borderRadius: 8,
      marginBottom: 2,
      ...(isSelected && isToday && {
        backgroundColor: theme.colors.primary,
        borderWidth: 2,
        borderColor: theme.colors.secondary,
      }),
      ...(isSelected && !isToday && {
        backgroundColor: theme.colors.primary,
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }),
      ...(!isSelected && isToday && {
        backgroundColor: theme.colors.secondaryContainer,
        borderWidth: 2,
        borderColor: theme.colors.outline,
      }),
    },
    cellContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 6,
    },
    dayText: {
      fontSize: 16,
      fontWeight: '500',
      color: textColor,
      ...(isSelected && isToday && {
        color: theme.colors.onPrimary,
        fontWeight: '700',
      }),
      ...(isSelected && !isToday && {
        color: theme.colors.onPrimary,
        fontWeight: '700',
      }),
      ...(!isSelected && isToday && {
        color: theme.colors.onSecondaryContainer,
        fontWeight: '600',
      }),
      ...(!isCurrentMonth && {
        color: theme.colors.onSurfaceDisabled,
      }),
      ...(dayOfWeek === 0 && !isSelected && {
        color: theme.colors.error,
      }),
      ...(dayOfWeek === 6 && !isSelected && {
        color: theme.colors.primary,
      }),
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

  return (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => onPress(date)}
      activeOpacity={0.7}
    >
      <View style={styles.cellContent}>
        <Text style={styles.dayText}>
          {format(date, "d")}
        </Text>
        
        {schedulesCount > 0 && (
          <View style={styles.scheduleContainer}>
            {Array.from({ length: Math.min(schedulesCount, 3) }).map((_, idx) => (
              <View key={idx} style={styles.scheduleIndicator} />
            ))}
            {schedulesCount > 3 && (
              <Text style={styles.moreIndicator}>+{schedulesCount - 3}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}