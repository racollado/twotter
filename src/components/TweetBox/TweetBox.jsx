import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

const maxCharCount = 140

function lengthIsInvalid(text) {
  if (text == null) {
    return true
  }
  else {
    const len = text.length
    return !(len > 0 && len <= 140)
  }
}

export default function TweetBox(props) {
  function handleOnSubmit() {
    const newTweet = {
      id: props.tweets.length,
      name: props.userProfile.name,
      handle: props.userProfile.handle,
      text: props.tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
    }
    props.setTweets([...props.tweets, newTweet])
    props.setTweetText("")
  }

  function handleOnTweetTextChange(event) {
    props.setTweetText(event.target.value)
  }
  
  return (
    <div className="tweet-box">
      <TweetInput value={props.tweetText} handleOnChange={handleOnTweetTextChange}/>

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount text={props.tweetText} />
        <TweetSubmitButton text={props.tweetText} handleOnSubmit={handleOnSubmit}/>
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {
  function textLen(text) {
    if (!text) {
      return null
    }
    else {
      return maxCharCount - text.length
    }
  }
  return <span className="char-count">{textLen(props.text)}</span>
}

export function TweetSubmitButton(props) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button className="tweet-submit-button" 
              onClick={props.handleOnSubmit} 
              disabled={lengthIsInvalid(props.text)}> Tweet </button>
    </div>
  )
}
