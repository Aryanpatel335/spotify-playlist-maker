import '../SearchResults/SearchResults.css';
import React from 'react';
import TrackList from '../TrackList/TrackList';


class SearchResults extends React.Component{
    render(){
        return(
            //Add TrackList Component under Results to display the search results
            <div className='SearchResults'>
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} tracks={this.props.SearchResults} button='+' isRemoval={false}/>
                

            </div>

        );
    }
}

export default SearchResults;
