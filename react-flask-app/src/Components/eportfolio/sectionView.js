import React from 'react';
import ModuleView from './moduleView'
import { Route , withRouter} from 'react-router-dom';
import './style.scss'

class SectionView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
            message : ''
        }
    }

    render() {
        const moduleItems = this.state.modules.map
            (content => <ModuleView key={content.module_id} content={content} parentSectionID = {this.state.sectionID} />)
       
        return (
            <div className = "section">
			    {moduleItems}
            </div>
        )  
    }  
}

export default SectionView;