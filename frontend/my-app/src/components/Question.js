import React, { Component } from 'react'
import axios from 'axios';

export class Question extends Component {

    state = {
        question: []
    }

    componentWillMount(){
        var self=this;
        axios.get(`http://localhost:8000/polls/${self.props.questionKey}`)
        .then(res => {
            const question = res.data.question_text;
            self.setState({ question });
        }).catch(function (error){
            if(error.response.status === 404){
                self.setState({question : "ERROR 404 QUESTION NOT FOUND"})
            }
        }) 
    }

  render() {
    
      

    return (
      <div>
        <p>{ this.state.question }</p>
      </div>
    )
  }
}

export default Question
