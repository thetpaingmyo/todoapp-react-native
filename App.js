import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import TodoItem from './components/TodoItem'

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'learn React', key: '1' },
    { text: 'learn Vue', key: '2' },
    { text: 'learn Django', key: '3' },
  ])

  const pressHandler = key => {
    setTodos(
      prev => prev.filter(
        todo => todo.key !== key
      )
    )
  }

  const submitHandler = text => {
    if (text) {
      setTodos(
        prev => [
          { text: text, key: Math.random().toString() },
          ...prev
        ]
      )
    } else {
      Alert.alert('Oops!', 'You haven\'nt entered anything yet', [
        { text: 'Ok', onPress: () => console.log('alert closed') }
      ])
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo 
            submitHandler={submitHandler}
          />
          <View style={styles.list}>
            <FlatList 
              data={todos}
              renderItem={({ item }) => (
                <TodoItem 
                  item={item} 
                  pressHandler={pressHandler}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
})
