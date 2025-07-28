import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useThemeColor } from '../../hooks/useThemeColor';

interface CalendarHeaderProps {
  title: string;
  onPreviousPress: () => void;
  onNextPress: () => void;
  onTodayPress: () => void;
}

export function CalendarHeader({
  title,
  onPreviousPress,
  onNextPress,
  onTodayPress,
}: CalendarHeaderProps) {
  const theme = useTheme();
  const textColor = useThemeColor({}, 'text');

  const styles = StyleSheet.create({
    header: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitle: {
      color: textColor,
      fontSize: 18,
      fontWeight: '600',
    },
  });

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action 
        icon="chevron-left" 
        onPress={onPreviousPress}
        accessibilityLabel="前の月"
      />
      <Appbar.Content
        title={title}
        titleStyle={styles.headerTitle}
      />
      <Appbar.Action 
        icon="calendar-today" 
        onPress={onTodayPress}
        accessibilityLabel="今日に戻る"
      />
      <Appbar.Action 
        icon="chevron-right" 
        onPress={onNextPress}
        accessibilityLabel="次の月"
      />
    </Appbar.Header>
  );
}