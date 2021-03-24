import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class ClassCounter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:this.props.location.state,
             count:0
        }
    }
    incrementCount =() =>{
        this.setState({
            count:this.state.count+1
        })
    }

    componentDidMount(){
        if(this.props.location.state!='allowed'){
            return <Redirect to='/' />
        }

    }
    componentDidUpdate(){
        if(this.props.location.state!='allowed'){
            return <Redirect to='/' />
        }
    }

    componentWillUnmount(){
        this.setState({
            data: {status:'notallowed',user:'viswa'}
        })
    }
    
    render() {
        console.log("In class counter",this.props.location.state)
        if(this.props.location.state=='allowed'){
            return (
                <div>
                    <button onClick={this.incrementCount}>count{this.state.count}</button>
                    
                </div>
            )

        } else{
            return(
                <Redirect to='/' />
            )
        }
    }
}

export default ClassCounter
