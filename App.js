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

    //Initialising array of current todos
    this.todoList = [];

  }

    componentDidMount() {

      this.allTodosRef.on('child_added', (dataSnapshot) => {

        //Adding to todoList
        this.todoList.push({
          id: dataSnapshot.key,
          text: dataSnapshot.val()
        })

        //Updating database with current todoList
        this.setState({
          todoSource: this.state.allTodosSrc.cloneWithRows(this.items)
        })

      }

      this.allTodosRef.on('child_removed', (dataSnapshot) => {

        //Removing from todoList
        this.todoList = this.todoList.filter((x) => x.id !== dataSnapshot.key);

        //Updating database with current todoList
        this.setState({
          todoSource: this.state.allTodosSrc.cloneWithRows(this.items)
        })

      }

    }


    //Adds todo to the database and clears todo in state
    addTodo() {

      //If the todo to be added isn't empty
      if (this.state.newTodo !== '') {

        //Pushing the new todo onto the database
        this.allTodosRef.push({
          todo: this.state.newTodo
        })

        //Resetting the current states new todo
        this.setState({
          newTodo = ''
        })

      }
    }

    //Removes todo from fatabase
    deleteTodo(rowData) {
      this.allTodosRef.child(rowData.id).remove();
    }

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
