'use strict';
import React from 'react';
export default class todoFilter extends React.Component{
    render(){
        return(
            <ul>
                <li>
                    <a
                        href="#/">
                        All
                    </a>
                </li>
                {" "}
                <li>
                    <a href="#">
                        In progress
                    </a>
                </li>
                {" "}
                <li>
                    <a href="#">
                        Done
                    </a>
                </li>
            </ul>
        );
    }
}