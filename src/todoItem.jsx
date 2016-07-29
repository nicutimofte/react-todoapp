'use strict';
import React from 'react';


export default class TodoItem extends React.Component {
    handleDestroy(){
        this.props.handleDestroyButton && this.props.handleDestroyButton()
    }
    render(){
        let localStyle={
            listStyleType:"none"
        };
        return(
            <li >
                 <input
                     className="toggle"
                    type="checkbox"
                    checked={this.props.todo.completed}
                    onChange={this.props.onToggle}
                 />
                <label>
                    {this.props.todo.title}
                </label>
                <button className="destroy" onClick={this.handleDestroy.bind(this)}>
                </button>
            </li>
        );
    }
}