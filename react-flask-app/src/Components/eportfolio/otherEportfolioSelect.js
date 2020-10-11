import React from 'react'

class OtherEportfolioSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID : this.props.content.userID,
            username : this.props.content.username,
            sectionNumber : this.props.content.sectionNumber
        }
        this.viewHandler = this.viewHandler.bind(this)

    }

    viewHandler () {
       this.props.viewOther(this.state.userID)
    }

    render(){

        return (
            <div>
                {this.state.userID}
                {this.state.username}
                {this.state.sectionNumber}
                <button className="button" onClick={this.viewHandler}>
                    View
                </button>
            </div>
        )
    }



}
export default OtherEportfolioSelect