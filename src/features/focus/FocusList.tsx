import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import HistoryItem from './HistoryItem'
import { theme } from '../../utils/theme'
import { FocusSubject } from '../../model/FocusSubject'

const FocusList: React.FC<{items: FocusSubject[]}> = ({items}) => {
  return (
    <View style={styles.container}>
      {items.length === 0 ?
        <Text style={styles.heading}>Enter a subject to get started!</Text> :
        <FlatList data={items} renderItem={({item}) => <HistoryItem item={item.subject || ''}/>}/>
      }
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
  }
})

export default FocusList
