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
                <h3>Enter a Song, Artist, or an Album:</h3>
                <input onChange={this.handleTermChange}/>
                
                <button className="SearchButton" onClick={this.search}>SEARCH</button>    
            </div>

        );

    
    }

}


