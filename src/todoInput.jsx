'use strict';
import React from 'react';
export default class todoInput extends React.Component {
    render(){
        return(
            <li>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                />
            </li>
        );
    }

}