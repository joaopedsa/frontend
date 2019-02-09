import React, { Component } from 'react';
import api from '../services/api';


import './Tweet.css';
import like from '../like.svg';

export default class Tweet extends Component {
  
    handleLike = () => {
        const response = api.post(`/like/${this.props.tweet._id}`)
        console.log(response);
    }
  
    render() {
    
    const {tweet} = this.props;
    
    return (
        <li className="tweet">
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button type="button" onClick={this.handleLike}>
                <img src={like} alt="like"/>
                {tweet.likes}
            </button>
        </li>
    );
  }
}
