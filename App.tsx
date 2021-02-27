import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Timer from './src/features/timer/Timer'
import Focus from './src/features/focus/Focus'
import { theme } from './src/utils/theme'
import FocusList from './src/features/focus/FocusList'
import { FocusSubject, Status } from './src/model/FocusSubject'
import getRandomId from "./src/utils/randomId"
import FocusHistory from "./src/features/focus/FocusHistory"


export default function App() {
  const [focusSubject, setFocusSubject] = useState<FocusSubject | null>({ id: null, subject: null, status: null})
  const [history, setHistory] = useState<FocusSubject[]>([])

  const onAddSubject = (subject: string) => {
    let id = getRandomId()
    setFocusSubject({ id, subject, status: Status.created})
  }

  const updateFocusItem = () => {
    if (focusSubject === null) {
      return
    }
    setFocusSubject(sub => {
      if (sub === null) return sub
      sub.status = Status.completed
      setHistory([...history, sub])
      return sub
    })
    setFocusSubject(null)
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')
      let parsed = history && (JSON.parse(history)) as FocusSubject[]
      if (parsed && parsed.length) {
        setHistory(parsed)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  })
  const save = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(history))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    save()
  }, [history])

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        { focusSubject?.subject ?
          <Timer focusSubject={focusSubject.subject} onTimerEnd={updateFocusItem} onClearSubject={setFocusSubject.bind(null, null)}/> :
          <>
            <Focus addSubject={onAddSubject}/>
            <FocusHistory focusHistory={history} onClear={() => setHistory([])}/>
          </>
        }
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blueDark,
  },
});
