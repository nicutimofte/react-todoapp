'use strict';
import React from 'react';
import classNames from 'classnames/bind';

export default class TodoFilter extends React.Component{
    handleActive(){
        this.props.clickedActive && this.props.clickedActive();
    }
    handleAll() {
        this.props.clickedAll && this.props.clickedAll();
    }
    handleClearCompleted(){
        this.props.clearCompletedButton && this.props.clearCompletedButton()
    }
    handleCompleted() {
        this.props.clickedCompleted && this.props.clickedCompleted();
    }

    render(){
        let nowShowing=this.props.nowShowing;
        var clearButton=null;
        if(this.props.completedCount > 0){
            clearButton=(
            <button
                    className="clear-completed"
                    onClick={this.handleClearCompleted.bind(this)}>
                    Clear completed
               </button>
            );
        }
        return(
            <footer className="footer">
                <strong className="todo-count" >{this.props.count} left</strong>
                <ul className="filters" >
                    <li  >
                        <a 
                            onClick={this.handleAll.bind(this)}
                            className={classNames({selected: nowShowing === 'all'})}
                            href="#">

                            All
                        </a>
                    </li>
                    {"      "}
                    <li  >
                        <a onClick={this.handleActive.bind(this)}
                           className={classNames({selected: nowShowing === 'active'})}
                            href="#">
                            Completed

                        </a>
                    </li >
                    {"      "}
                    <li >
                        <a onClick={this.handleCompleted.bind(this)}
                           className={classNames({selected: nowShowing === 'completed'})}
                            href="#">
                            Active

                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>

        );
    }
};