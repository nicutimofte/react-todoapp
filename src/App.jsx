'use strict';
import React, {Component} from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFilter from './TodoFilter.jsx';


const ALL='all';
const ACTIVE='active';
const COMPLETED='completed';
var ENTER_KEY = 13;
var key=0;

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            todos: [],
            nowShowing: ALL,
            newTodo: ''
        };
     }
    addTodo(title){
        this.setState({
            todos:this.state.todos.concat({
                title:title,
                completed:false
                })
        });
    }
    clearCompleted(){
        this.setState({todos:this.state.todos.filter(function(todo){
            return !todo.completed;
            })
        });
    }
    extend(){
        var newObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
    destroyButton(todo){

        this.setState({todos:this.state.todos.filter(function(candidate){
            return candidate !==todo;
            })
        });
    }
    handleChange(event){
        this.setState({newTodo: event.target.value});
    }
    handleClickAll(){
      
        this.setState({nowShowing:ALL})
    }
    handleClickActive(){
        this.setState({nowShowing:ACTIVE})
    }
    handleClickComplete(){
        this.setState({nowShowing:COMPLETED})
    }
    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=this.state.newTodo.trim();
        if(val){
            this.addTodo(val);
            this.setState({newTodo:''});
        }
    }
    renderTodoItem(todo) {
        return (
            <TodoItem
                todo={todo}
                key={key++}
                onToggle={this.toggle.bind(this,todo)}
                handleDestroyButton={this.destroyButton.bind(this,todo)}
            />
        )
    }
    toggle(todoToToggle){
        this.setState({todos: this.state.todos.map(function (todo){
            return todo !== todoToToggle ?
                todo : this.extend({}, todo, {completed: !todo.completed});
        },this)});
    }
    toggleAll(event){
        this.setState({todos:this.state.todos.map(function(todo){
            return this.extend({},todo,{completed:event.target.checked});
            },this)
        });
    }

    render() {
        var footer;
        var main;

        var shownTodos=[];
        let todos=this.state.todos;
        for(let i=0;i<todos.length;i++){
            if(this.state.nowShowing === ACTIVE) {
                if (todos[i].completed)
                    shownTodos = shownTodos.concat(todos[i]);
            }
            else if(this.state.nowShowing === COMPLETED){
                if(!todos[i].completed)
                    shownTodos=shownTodos.concat(todos[i]);
            }
            else
                shownTodos=shownTodos.concat(todos[i]);
        }
        var activeTodoCount=this.state.todos.reduce((accum,todo)=>{
          return todo.completed? accum : accum + 1;
        },0);

        var completedCount = this.state.todos.length - activeTodoCount;

        if(activeTodoCount || completedCount){
           footer =
               <TodoFilter
                    count={shownTodos.length}
                    completedCount={completedCount}
                    clearCompletedButton={this.clearCompleted.bind(this)}
                    clickedAll={this.handleClickAll.bind(this)}
                    clickedActive={this.handleClickActive.bind(this)}
                    clickedCompleted={this.handleClickComplete.bind(this)}
                    nowShowing={this.state.nowShowing}
               />
        }

        let todoItems = [];
        shownTodos.map((todo)=>{
            let view = this.renderTodoItem(todo);
            if (!view) return;
            todoItems.push(view);
        },this);

        if(this.state.todos.length>0){
          main=(
              <section className="main">
                  <input
                      className="toggle-all"
                      type="checkbox"
                      onChange={this.toggleAll.bind(this)}
                      checked={activeTodoCount===0}
                  />
                  <ul className="todo-list">
                      {todoItems}
                  </ul>
              </section>

          )
        }
            return (
              <div>
                <header className="header">
                  <input
                      className="new-todo"
                      type="text"
                      placeholder="What needs to be done?"
                      value={this.state.newTodo}
                      onChange={this.handleChange.bind(this)}
                      onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                  />

                </header>

                  {main}
                {footer}
              </div>
            );
      }
}

