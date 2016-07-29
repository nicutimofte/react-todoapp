'use strict';
import React from 'react';
import classNames from 'classnames/bind';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
 class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editText:this.props.todo.title
        }
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            var node = React.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
    handleChange(event){
        if(this.props.editing){
            this.setState({editText:event.target.value});
        }
    }
    handleDestroy(){
        this.props.handleDestroyButton && this.props.handleDestroyButton()
    }
    handleEdit(){
        this.props.onEdit();
        this.setState({editText:this.props.todo.title})
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY){
            this.setState({editText:this.props.todo.title})
            this.props.onCancel(event);
        }else if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
    }
    handleSubmit(event){
        let value=event.target.value.trim();
        if(value){
            this.props.onSave(value);
            this.setState({editText:value});
        }
        else{
            this.props.onDestroy();
        }
    }
    
    render(){
        let localStyle={
            listStyleType:"none"
        };
        return(
            <li className={classNames({
                completed:this.props.todo.completed,
                editing:this.props.editing
            })}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit.bind(this)}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy.bind(this)} />

                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
            </li>
        );
    }
}
export default TodoItem;