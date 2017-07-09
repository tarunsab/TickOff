import React from 'react';
import * as firebase from "firebase";
import {
  Text,
  View,
  Component,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ListView,
} from 'react-native';

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


      //Upon an added item from database
      this.allTodosRef.on('child_added', (dataSnapshot) => {

        //Adding to todoList
        this.todoList.push({
          id: dataSnapshot.key,
          text: dataSnapshot.val()
        });

        //Updating database with current todoList
        this.setState({
          todoSource: this.state.allTodosSrc.cloneWithRows(this.todoList)
        });

      });


      //Upon a deleted item from database
      this.allTodosRef.on('child_removed', (dataSnapshot) => {

        //Removing from todoList
        this.todoList = this.todoList.filter((x) => x.id !== dataSnapshot.key);

        //Updating database with current todoList
        this.setState({
          todoSource: this.state.allTodosSrc.cloneWithRows(this.todoList)
        })

      });


    }


    //Adds todo to the database and clears todo in state
    addTodo() {

      //If the todo to be added isn't empty
      if (this.state.newTodo !== '') {

        //Pushing the new todo onto the database
        this.allTodosRef.push({
          todo: this.state.newTodo
        });

        //Resetting the current states new todo
        this.setState({
          newTodo: ''
        });

      }
    }

    //Removes todo from database
    deleteTodo(todoData) {
      this.allTodosRef.child(todoData.id).remove();
    }


  render() {
    return (
      <View style={styles.container}>

        //Header
        <View style={styles.container}>
          <Text style={styles.Header}>
            TaskOff
          <Text>
        </View>


        //Textinput and add button
        <View style={styles.inputSection}>

           //TextInput
           <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>

           //Add button
           <TouchableHighlight
             style={styles.button}
             onPress={() => this.addTodo()}
             underlayColor='#dddddd'>
             <Text style={styles.btnText}>+</Text>
           </TouchableHighlight>

        </View>


        //todoList
        <ListView
          dataSource={this.state.allTodosSrc}
          renderRow={this.renderRow.bind(this)} />

      </View>
    );
  }

  //Rendering each of the todo items in the ListView
  renderRow(todoData) {
    return (

      //Todoitem and separator
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(todoData)}

        <View>

          //Todo item text
          <View style={styles.row}>
            <Text style={styles.todoText}>todoData.text.todo}</Text>
          </View>

          //separator
          <View style={styles.separator} />

        </View>

      </TouchableHighlight>

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
