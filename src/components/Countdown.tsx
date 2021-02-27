import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { theme } from '../utils/theme'
import { useInterval } from '../hooks/useInterval'

const { fontSize, spacing, colors } = theme

const toMillis = (minutes: number) => minutes * 60 * 1000
const padNumber = (num: number) => num < 10 ? `0${num}` : num

const formatTime = (millis: number) =>  {
  const minute = Math.floor(millis / 1000 / 60) % 60
  const seconds = Math.floor(millis / 1000) % 60
  return  `${padNumber(minute)}:${padNumber(seconds)}`
}

type Props = {
  minutes: number
  paused: boolean
  onProgress: (millis: number) => void
  onEnd: () => void
}

const Countdown: React.FC<Props> = ({ minutes = 1, paused, onProgress = (millis: number) => {}, onEnd = () => {} }) => {
  const [timeLeft, setTimeLeft] = useState(toMillis(minutes))

  useInterval(() => {
    if (paused) {
      return
    }
    if (timeLeft === 0) {
      return timeLeft
    }
    let time = timeLeft - 1000
    setTimeLeft(time)
    return time
  }, 1000)

  useEffect(() => {
    let millisecs = toMillis(minutes)
    setTimeLeft(millisecs)
  }, [minutes])

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd()
    }
    let millisecs = toMillis(minutes)
    onProgress(timeLeft / millisecs)
  }, [timeLeft, onProgress])


  return (
    <View>
      <Text style={ styles.counter }>{formatTime(timeLeft)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({ 
  counter: {
    fontSize: fontSize.xxl,
    color: colors.white,
    backgroundColor: colors.translucentBlueLight,
    textAlign: 'center',
    padding: spacing.lg,
  }
})

export default Countdown
