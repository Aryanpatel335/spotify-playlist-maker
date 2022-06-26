import "../Track/Track.css";
import React from 'react';

class Track extends React.Component{
    constructor(props){
        super(props)
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack= this.removeTrack.bind(this);

    }


    addTrack(){
        
        this.props.onAdd(this.props.track);

    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    render(){
        let button;
        if(this.props.button === '+'){

           button = <button className="Track-action" onClick={this.addTrack}> + </button>



        }
        else if(this.props.button === '-'){
            button = <button className="Track-action" onClick={this.removeTrack}> - </button>
        }

        return(
            <div className="Track">
                <img src={this.props.image} alt='' />
                <div className="Track-info">
                    
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>

                </div>
                
                {button}
                
                

            </div>


        )
    }
}
export default Track;