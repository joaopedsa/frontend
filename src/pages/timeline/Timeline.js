import React, { Component } from 'react';
import Tweet from '../../components/Tweet';
import socket from 'socket.io-client'
import { deleteToken } from '../../services/auth';

import './Timeline.css';

import api from '../../services/api';

export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: '',
        username: ''
    }
    
    async componentDidMount() {
        this.subscribeToEvents();
        if(!localStorage.getItem('token'))
            return this.props.history.push('/')
        try {
            if(this.state.username.length === 0) {
                const user = await api.get('/user')
                this.setState({ username: user.data.username})
            }
            const response = await api.get('/tweets')
            this.setState({ tweets: response.data });
        } catch(err) {
            deleteToken();
            return this.props.history.push('/');
        }
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:8000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets]})
        })

        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet => 
                    tweet._id === data._id ? data : tweet
                )
            })
        })
    }

    handleNewTweet = async (e) => {
        if(e.keyCode !== 13) return;

        const content = this.state.newTweet;

        try {
            await api.post('tweets', { content, author: this.state.username} )
        } catch(err) {
            deleteToken();
            return this.props.history.push('/');
        }
        this.setState({ newTweet: ''})
    }

    handleInputChanges = (e) => {
        this.setState({ newTweet: e.target.value})
    }

    handleSubmit = () => {
        
    }

    render() {
        return (
            <div>
                <div className="containerDados">
                    <div>
                        <img alt="foto"></img>
                        <p>{this.state.username}</p>
                    </div>
                    <div>
                        <button>Logout</button>
                    </div>
                </div>
                <div className="timeline-wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                        placeholder="O que esta Acontecendo??"
                        value = {this.state.newTweet}
                        onChange = {this.handleInputChanges}
                        onKeyDown={this.handleNewTweet}           
                        />
                    </form>
                    <ul className="tweet-list">
                        {this.state.tweets.map(tweet => (
                            <Tweet key={tweet._id} tweet={tweet}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
