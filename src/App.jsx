'use strict';
import React, {Component} from 'react';
import todoItem from './todoItem.jsx';
import todoFilter from './todoFilter.jsx';

const ALL='all';
const ACTIVE='active';
const COMPLETED='completed';
var ENTER_KEY = 13;
var todos=[];

export default class App extends Component {
     constructor(props){
        super(props);
        this.state={
            nowShowing: ALL,
            newTodo: ''
        };
     }
    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();
        var val=this.state.newTodo.trim();
        if(val){
            this.addTodo(val);
            this.state({newTodo:''});
        }
    }
    handleChange(event){
        this.state({newTodo: event.target.value});
    }
    store(namespace,data){
        if(data){
          return localStorage.setItem(namespace,JSON.stringify(data));
        }
        var store=localstorage.getitem(namespace);
          return(store && JSON.parse(store)) || [];
      }
    addTodo(title){
        todos=todos.concat({
            title: title, 
            completed:false
        });
    }

    render() {
        var footer;
        var main;

        var shownTodos=todos.filter((todo)=>{
          switch (this.state.nowShowing){
            case ACTIVE:
                  return !todo.completed;
            case COMPLETED:
                  return todo.completed;
            default:
                  return true;
          }
        },this);

        var todoItems=shownTodos.map((todo)=>{
          return(
              <todoItem
                  todo={todo}
              />
          );
        },this);

        var activeTodoCount=todos.reduce((accum,todo)=>{
          return todo.completed? accum : accum + 1;
        },0);

        var completedCount = todos.length - activeTodoCount;

        if(activeTodoCount || completedCount){
           footer =
               <todoFilter
               count={activeTodoCount}
               completedCount={completedCount}
               nowShowing={this.state.nowShowing}
               />
        }
        if(todos.length){
          main=(
              <ul>
                {todoItems}
              </ul>
          )
        }

        return (
          <div>
            <header>
              <input
                  type="text"
                  placeholder="What needs wo be done?"
                  value={this.state.newTodo}
                  onChange={this.handleChange}
                  onKeyDown={this.handleNewTodoKeyDown}  />
            </header>
            {main}
            {footer}
          </div>
        );
      }
}

