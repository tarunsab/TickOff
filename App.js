import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    //Setting up firebase
    var config = {
      apiKey: "AIzaSyB_qNNv4QUc85CGWfXKldl1PwFxzIkmDV0",
      authDomain: "todoreact-bbcc3.firebaseapp.com",
      databaseURL: "https://todoreact-bbcc3.firebaseio.com",
      projectId: "todoreact-bbcc3",
      storageBucket: "todoreact-bbcc3.appspot.com",
      messagingSenderId: "487981360455"
    };
    firebase.initializeApp(config);

    //Pushing onto database in a certain directory
    this.allTodosRef = firebase.database().ref('todos/');

    //Initialising the current state
    this.state = {

      //Current todo to be added
      newTodo: '',

      //Listview of all saved todos
      allTodosSrc: new ListView.DataSource({
        rowHasChanged: (r1, r2) => row1 !== row2
      })

    }

  }

    // componentDidMount() {
    // }
    //
    // addTodo() {
    // }
    //
    // deleteTodo() {
    // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});