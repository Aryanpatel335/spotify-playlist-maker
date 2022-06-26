import '../TrackList/TrackList.css';
import React from 'react';
import Track from '../Track/Track';
//inside TrackList add a map method that renders a set of Track components 

class TrackList extends React.Component{
    render(){
        return(

            <div className="TrackList">
                {this.props.tracks.map((track)=>{
                    return <Track  key={track.id} track={track} image={track.image} name={track.name} artist={track.artist} album={track.album} button={this.props.button} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
                })}

            </div>
        )
    }

}

export default TrackList;
