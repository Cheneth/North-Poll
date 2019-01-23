import React, { Component } from 'react'

export class ChoiceItem extends Component {



  render() {
    console.log(this.props);
    return (
        <span>
            { this.props.text } Votes: ({ this.props.votes })
        </span>
                
    )
  }
}

export default ChoiceItem
