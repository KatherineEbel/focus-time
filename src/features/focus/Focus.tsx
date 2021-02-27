import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper'
import RoundedButton from '../../components/RoundedButton'
import { theme } from '../../utils/theme'
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  addSubject: (subject: string) => void
}

const Focus: React.FC<Props> = ({addSubject}) => {
  const [focus, setFocus] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={ styles.heading}>What would you like to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={{flex: 1, marginRight: 16, height: 60, fontSize: theme.fontSize.md}}
                   label='Subject'
                   mode={ Platform.OS === 'android' ? 'outlined' : 'flat'}
                   onSubmitEditing={({ nativeEvent: { text }}) => {
                     setFocus(text)
                   }}
        />
        <RoundedButton title='+' size={50} onPress={() => addSubject(focus)}>
          <MaterialIcons name="add" size={24} color="white" />
        </RoundedButton>
      </View>
    </View>
  )
}

const { fontSize, spacing} = theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: { 
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    marginBottom: 10,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Focus
