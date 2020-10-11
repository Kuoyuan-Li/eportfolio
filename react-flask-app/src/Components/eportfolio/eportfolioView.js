import React from 'react';
import SectionView from './sectionView'
import SectionNavbar from './sectionNavbar'
import copy from 'copy-to-clipboard'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Spinner } from 'react-bootstrap';

class EportfolioView extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : localStorage.getItem('user'),
            sectionIDTitle :[],
            //infoSection: '',
            sections :[],   
            currentSectionID : 0,
            message : '',
            loading : true
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        
		this.handleSwitch = this.handleSwitch.bind(this)
		this.backProfile = this.backProfile.bind(this)
		
    }

    async componentDidMount(){
        const userID = localStorage.getItem('userID')
        await fetch ('http://localhost:5000/getSections',{
            mode: 'cors',
            method : 'POST',
			headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionID + sectionTitle
            this.setState({sectionIDTitle: response.list});							
        })
        console.log(this.state.sectionIDTitle)


        for (var i = 0; i < this.state.sectionIDTitle.length; i++) {
            var thisID = this.state.sectionIDTitle[i].section_id
            var thisTitle = this.state.sectionIDTitle[i].title
            //section structure
            var thisSection = {
                sectionID : thisID,
                sectionTitle : thisTitle,
                modules : null
            }
            await fetch ('http://localhost:5000/getModules',{
                mode: 'cors',
                method : 'POST',
				headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section_id : thisID
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                //response: a list of sectionIDs
                thisSection.modules = response.list
                this.setState({           
                    sections: [...this.state.sections , thisSection]
                })
            })
            
        }

        this.setState({
            loading : false
        })
		
       
    }
    

    
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})
		
	}
	
	backProfile(e){
        this.props.history.push(`/profile`)
    }
	
	
    render() {
        const sectionItems = this.state.sections.map
            (content => {
				return (
				    content.sectionID === this.state.currentSectionID ?
					<SectionView key={content.sectionID} content={content}/> :
				    null
				)
			})

        return (
            <div>
            {this.state.loading ? <Spinner animation = "border"/> :
            <div className="container">
                <br/><br/>
                              
                <Popup
                    trigger = {<button className="button">
                            Generate URL of your eportfolio
                        </button>}
                    position="right center"
                    onOpen = {this.generateLink}>
                    <div>The generated URL is copied to your clipboard!</div>
                </Popup>
                
			    <button class="linkButton" onClick={this.backProfile}>
                    Back to Home Page
                </button>
				<SectionNavbar currentSectionID={this.state.currentSectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />
                
				
				<div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">                                      
                            
							{sectionItems}
                                   
                        </div>
                    </div>
                </div>
            </div>
            }
            </div>
        )  
    }  
}

export default EportfolioView;