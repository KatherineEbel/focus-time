import React, { useEffect } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { FocusSubject } from "../../model/FocusSubject"
import HistoryItem from "./HistoryItem"
import { theme } from "../../utils/theme"
import RoundedButton from "../../components/RoundedButton"

type Props = {
  focusHistory: FocusSubject[]
  onClear: () => void,
}

const FocusHistory: React.FC<Props> = ({ focusHistory = [], onClear, }) => {
  const clearHistory = () => {
    onClear()
  }


  return (
    <View style={styles.container}>
      {focusHistory.length === 0 ?
        <Text style={styles.heading}>Enter a subject to get started!</Text> :
        <FlatList keyExtractor={item => item.id!} data={focusHistory} renderItem={({item}) => <HistoryItem item={ item }/>}
                  contentContainerStyle={{ flex: 1, alignItems: 'center'}}
        />
      }
      { focusHistory.length > 0 && <View style={styles.clear}><RoundedButton size={75} onPress={clearHistory}>
        <Text style={{color: 'white'}}>Clear</Text>
      </RoundedButton></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.fontSize.md,
  },
  clear: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
})


export default FocusHistory
