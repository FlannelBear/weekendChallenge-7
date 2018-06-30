import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import NextButton from '../NextButton/NextButton';
import PropTypes from 'prop-types';
import axios from 'axios';

const mapReduxStateToProps = ({feedbackReducer}) => ({
    feedbackReducer
});

class Question extends Component{
    constructor(){
        super();

        this.state = {input: ''}

    }

    handleInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    submitInput = () => {
        const type = this.props.type;
        const action = {type: type, payload: this.state.input}
        this.props.dispatch(action);
    }

    submitFeedback = () =>{
        axios.post('/feedback', this.props.feedbackReducer).then().catch();
    }

    render(){
        return(
            <div>
                <h2>Question</h2>
                <h4>{this.props.question}</h4>
                <input type="number" value={this.state.input} onChange={this.handleInputChange} placeholder="Answer"/>
                <NextButton submit={this.submitInput} next={this.props.nextPage}/>
            </div>
        );
    }
}

Question.propTypes = {
    nextPage: PropTypes.string,
    question: PropTypes.string,
    actionType: PropTypes.string
};  

export default compose(
    connect(mapReduxStateToProps)
)(Question);