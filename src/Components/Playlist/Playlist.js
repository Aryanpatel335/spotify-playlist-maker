import '../Playlist/Playlist.css';
import React from 'react';
//import Tracklist component
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        const newVal = event.target.value;
        
        this.props.onNameChange(newVal);
        
    }

    render(){
        return(

            <div className='Playlist'>
                <input value={this.props.nameVal} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.PlaylistResults} button='-' isRemoval={true} onRemove={this.props.onRemove}/>
                
                
                <button className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</button>

            </div>
        )


    }
}

export default Playlist;