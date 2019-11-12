import React, { Component } from 'react'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.state.name,
            address: ""
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

    update = (ev) => {
        ev.preventDefault()
        let obj1 = {
            id: this.props.state.id,
            name: this.state.name,
            address: this.state.address
        }

        fetch("http://localhost:3001/update", {
            method: 'post',
            body: JSON.stringify(obj1),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                this.props.gettingWholeData()
                this.props.editFalse()
            })
    }

    render() {
        // console.log(this.props.props)
        return (
            <div className="adminPasscodeInputDiv">
                <div className="header">
                    <p>Edits {this.props.state.name.toUpperCase()}'s Data</p>
                </div>
                <div className="inputDiv">
                    <form onSubmit={(ev) => this.update(ev)}>
                        <input
                            className="small"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.name}
                            autoFocus
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
                        <button>Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;