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
        rowHasChanged: (row1, row2) => row1 !== row2
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
          allTodosSrc: this.state.allTodosSrc.cloneWithRows(this.todoList)
        });

      });


      //Upon a deleted item from database
      this.allTodosRef.on('child_removed', (dataSnapshot) => {

        //Removing from todoList
        this.todoList = this.todoList.filter((x) => x.id !== dataSnapshot.key);

        //Updating database with current todoList
        this.setState({
          allTodosSrc: this.state.allTodosSrc.cloneWithRows(this.todoList)
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

        <View style={styles.header}>
          <Text style={styles.headerText}>
            TaskOff
          </Text>
        </View>


        <View style={styles.inputSection}>

           <TextInput style={styles.inputField} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>

           <TouchableHighlight
             style={styles.button}
             onPress={() => this.addTodo()}
             underlayColor='#dddddd'>
             <Text style={styles.addButtonText}>+</Text>
           </TouchableHighlight>

        </View>


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
        onPress={() => this.deleteTodo(todoData)}>

        <View>

          <View style={styles.row}>
            <Text style={styles.todoText}>{todoData.text.todo}</Text>
          </View>

          <View style={styles.separator} />

        </View>

      </TouchableHighlight>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: '#26c6da',
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  headerText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputSection: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row'
  },
  inputField: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48bbec'
  },
  button: {
    height: 36,
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: '#26c6da',
    justifyContent: 'center',
    // color: '#ffffff',
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  todoText: {
    flex: 1,
  }


});
