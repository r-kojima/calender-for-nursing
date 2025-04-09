import React from "react";
import { StyleSheet, View } from "react-native"; // View をインポート
import { Surface, Appbar } from "react-native-paper"; // Appbar をインポート

export default function CalendarScreen() {
  return (
    <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="カレンダー" />
      </Appbar.Header>
      <View style={styles.content}>
        {/* カレンダーコンポーネントはここに配置されます */}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems と justifyContent は Appbar を含めるとレイアウトが崩れる可能性があるので削除
  },
  content: {
    // カレンダーコンテンツ用のスタイル
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
