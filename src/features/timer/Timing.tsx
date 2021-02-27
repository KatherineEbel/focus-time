import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import RoundedButton from '../../components/RoundedButton'
import { theme } from '../../utils/theme'

const Timing = ({ onChangeTime }) => {
  return ( 
    <>
      <View>
        <RoundedButton size={75} onPress={onChangeTime.bind(null, 10)}>
          <Text style={styles.text}>10</Text>
        </RoundedButton>
      </View>
      <View>
        <RoundedButton size={75} onPress={onChangeTime.bind(null, 15)}>
          <Text style={styles.text}>15</Text>
        </RoundedButton>
      </View>
      <View>
        <RoundedButton size={75} onPress={onChangeTime.bind(null, 20)}>
          <Text style={styles.text}>20</Text>
        </RoundedButton>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white
  },
})

export default Timing
