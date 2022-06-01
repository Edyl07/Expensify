import moment from 'moment';
import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'

const now = moment();
console.log(now.format('MMM'));

export default class ExpenseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

            description: props.expense ? props.expense.description : '',
            amount: props.expense ?( props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            error: '',
            note: props.expense ? props.expense.note : '',
            calendarFocused: false,
        }
    }



    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (! amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({
                amount
            }))
        }
    }

    onDateChanged = (createdAt) => {
        if (createdAt) {
            
            this.setState(() => ({
                createdAt
            }))
        }
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };



    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: 'Please provide description and amount.'
            }));
        }else {
            this.setState(() => ({ 
                    error: ''
                }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render() {
        return (
            <div>
                { this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.onSubmit}>
                    <input
                        type={'text'}
                        placeholder={'Description'}
                        onChange={this.onDescriptionChange}
                        value={this.state.description}
                        autoFocus />
                    <input
                        type={'number'}
                        placeholder={'Amount'}
                        onChange={this.onAmountChange}
                        value={this.state.amount}
                        />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChanged}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea placeholder='Add a note for your expense (optionnal)'
                        onChange={this.onNoteChange}
                        value={this.state.note}
                    >
                    </textarea>
                    <button>{this.props.expense ? 'Edit Expense' : 'Add Expense'}</button>
                </form>
            </div>
        )
    }
}
