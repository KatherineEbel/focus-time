import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { FocusSubject, Status } from "../../model/FocusSubject"
import { theme } from "../../utils/theme"

const HistoryItem: React.FC<{item: FocusSubject}> = ({ item}) => {
  // @ts-ignore
  const style = styles.historyItem(item.status)
  return (
    <View>
      <Text style={style}>{ item.subject }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  // @ts-ignore
  historyItem: (status) => ({
    color: status === Status.completed ? 'green' : 'red',
    fontSize: theme.fontSize.md,
  })
})
export default HistoryItem
