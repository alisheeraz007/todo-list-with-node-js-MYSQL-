import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
import { changePath } from '../common/index'

class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            address: "",
        }
    }

    gettingValue = (ev) => {
        // console.log(ev.target.value)
        this.setState({
            [ev.target.name]: ev.target.value,
        }, () => {
            // console.log(this.state)
        })
    }

    saveData = (ev) => {
        ev.preventDefault()
        let obj1 = {
            name: this.state.name,
            address: this.state.address
        }

        fetch("http://localhost:3001/saveData", {
            method: 'post',
            body: JSON.stringify(obj1),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                this.props.gettingWholeData()
                this.setState({
                    name: "",
                    address: ""
                })
            })
    }

    render() {
        // console.log(this.props)
        return (
            <div className="mainContainer">
                <div className="header">
                    <p>My ToDo App</p>
                </div>
                <div className="inputDiv">
                    <form
                        onSubmit={(ev) => this.saveData(ev)}
                        method="POST"
                    // action="http://localhost:3001/saveData"
                    >

                        <input
                            className="small"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.name}
                            required
                        />
                        <input
                            className="large"
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.address}
                            required
                        />
                        <button>Send Details</button>
                    </form>
                    {this.props.state.data ?
                        <button
                            onClick={(ev) => changePath(ev.target.name, this.props)}
                            name="List">View List</button>
                        : null}
                </div>
            </div>
        )
    }
}

export default withRouter(ToDoList);