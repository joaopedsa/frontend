import React, { Component } from 'react';
import Tweet from '../../components/Tweet';
import { connect } from 'react-redux';
import { handleTweet, handlePostTweets, getTweets, newTweet, addLike } from '../../actions/timelineActions';
import { changeUsername } from '../../actions/loginActions';
import socket from 'socket.io-client'

import { deleteToken } from '../../services/auth';

import api from '../../services/api';

import './Timeline.css';

class Timeline extends Component {

    async componentDidMount() {
        this.subscribeToEvents()
        if(!localStorage.getItem('token'))
            return this.props.history.push('/')
        try {
            if(this.props.username.length === 0) {
                const user = await api.get('/user')
                this.props.changeUsername(user.data.username)
            }
        } catch (err) {
            deleteToken();
            return this.props.history.push('/')
        }
        this.props.getTweets();
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:8000');
    
        io.on('tweet', data => this.props.newTweet(data))
    
        io.on('like', data => this.props.addLike(data,this.props.tweets))
    }


    render() {
        return (
            <div>
                <div className="containerDados">
                    <div>
                        <img alt="foto"></img>
                        <p>{this.props.username}</p>
                    </div>
                    <div>
                        <button>Logout</button>
                    </div>
                </div>
                <div className="timeline-wrapper">
                    <form onSubmit={e => this.props.handlePostTweets(e,this.props)}>
                        <input
                        placeholder="O que esta Acontecendo??"
                        value = {this.props.newtweet}
                        onChange = {e => this.props.handleTweet(e.target.value)}
                        />
                    </form>
                    <ul className="tweet-list">
                        {this.props.tweets.map(tweet => (
                            <Tweet key={tweet._id} tweet={tweet}/>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tweets: state.tweetProps.tweets,
    newtweet: state.tweetProps.newtweet,
    username: state.userProps.username
})

export default connect(mapStateToProps, { handleTweet, handlePostTweets, getTweets, newTweet, addLike, changeUsername })(Timeline);