import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake'
import { theme } from '../../utils/theme';
import Countdown from '../../components/Countdown';
import Timing from './Timing'
import { MaterialIcons } from '@expo/vector-icons'
import RoundedButton from '../../components/RoundedButton'
import { useInterval } from '../../hooks/useInterval'

const { colors, fontSize, spacing } = theme;

const DEFAULT_TIME = 1
const ONE_SECOND_IN_MS = 1000
const PATTERN = [
  ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
]

type Props = {
  focusSubject: string,
  onTimerEnd: () => void,
  onClearSubject: () => void,
}

const Timer: React.FC<Props> = ({ focusSubject, onTimerEnd, onClearSubject }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME)
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [vibrating, setVibrating] = useState(false)

  useEffect(() => {
    if (vibrating) {
      // iOS and android handle vibration api differently
      if (Platform.OS === 'android') {
        Vibration.vibrate(10 * ONE_SECOND_IN_MS)
      } else {
        Vibration.vibrate(PATTERN, true)
      }
    } else {
      if (started) {
        Vibration.cancel()
        setStarted(false)
        setVibrating(false)
        onTimerEnd()
      }
    }
  }, [vibrating])

  useInterval(() => {
    if (vibrating) {
      setVibrating(false)
    }
  }, 1000 * 10)

  const onEnd = () => {
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    setVibrating(true)
  }

  const onProgress = (progress: number) => setProgress(progress)

  const changeTime = (min: number) => {
    setStarted(false)
    setMinutes(min)
    setProgress(1)
  }

  const clearSubject = () => {}

// keep screen on
  useKeepAwake()

  return (
    <View style={styles.container}>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} onPress={onClearSubject}>
          <MaterialIcons name="undo" size={24} color="white" />
        </RoundedButton>
      </View>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} paused={!started} onProgress={onProgress}  onEnd={onEnd}/>
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.heading}>Focusing on:</Text>
        <Text style={styles.subject}>{focusSubject}</Text>
      </View>
      <View style={{ padding: spacing.sm }}>
        <ProgressBar
          color={colors.blueLight}
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper} >
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton onPress={() => setStarted((started) => !started)}>
          <MaterialIcons
            name={started ? 'timer-off' : 'timer'}
            size={fontSize.xxxl}
            color="white"
          />
        </RoundedButton>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.lg,
  },
  clearSubject: {
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'android' ? spacing.md : 0,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
  subject: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Timer;
