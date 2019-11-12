import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoaderDiv from './loaderDiv'
import Edit from './Edit'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            editDiv: false,
            id: ""
        }
    }

    componentWillMount() {
        // console.log(this.props.location.state.name)
        this.setState({
            name: this.props.location.state.name,
            id: this.props.location.state.id,
        })
    }

    delete = (i) => {
        let obj1 = {
            id: i
        }

        fetch("http://localhost:3001/delete", {
            method: 'post',
            body: JSON.stringify(obj1),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                this.props.gettingWholeData()
                this.props.history.push("/List")
            })
    }

    edit = () => {
        this.setState({
            editDiv: true
        })
    }

    editFalse = () => {
        this.setState({
            editDiv: false
        })
    }

    render() {
        // console.log(this.state.name)
        return (
            this.props.state.data ?
                <div className="mainContainer">
                    {this.state.editDiv ?
                        <Edit editFalse={this.editFalse} gettingWholeData={this.props.gettingWholeData} state={this.state} props={this.props} />
                        : null}
                    <div className="header">
                        <p>{this.state.name.toUpperCase()} Details</p>
                    </div>
                    <div className="detaiDiv">
                        <table>

                            {this.props.state.data.map((detail, index) => {
                                return (
                                    detail.id == this.state.id ?
                                        <tbody key={index}>
                                            <tr>
                                                <th>Id:</th>
                                                <td>{detail.id}</td>
                                            </tr>
                                            <tr>
                                                <th>Name:</th>
                                                <td>{detail.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Address:</th>
                                                <td>{detail.address}</td>
                                            </tr>
                                        </tbody> :
                                        null
                                )

                            })}
                        </table>
                        <p>
                            <button onClick={this.edit}>Edit</button>
                            <button onClick={() => this.delete(this.state.id)}>Delete</button>
                        </p>
                    </div>
                </div>
                : <LoaderDiv />
        )
    }
}

export default withRouter(Details);