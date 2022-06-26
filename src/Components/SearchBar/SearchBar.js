import '../SearchBar/SearchBar.css'
import React from 'react';


export class SearchBar extends React.Component{
    
    constructor(props){
        super(props);
        this.state={searchTerm: ''}
        this.search = this.search.bind(this);
        this.handleTermChange= this.handleTermChange.bind(this);
    }

    search(){

        this.props.onSearch(this.state.searchTerm);
    }
    
    
    
    handleTermChange(e){
        let newTerm = e.target.value;
        this.setState({searchTerm: newTerm});

    }
    
    
    render(){

        return(

            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>    
            </div>

        );

    
    }

}


