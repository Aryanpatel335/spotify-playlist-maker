
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';
class App extends React.Component {

  constructor(props){
    super(props)
    //This will be an array of track objects when it is done
    this.state = {
      SearchResults:[],

      PlaylistResults: [
      
      ],
    
      PlaylistName: "Playlist Name"
    }


    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.PlaylistResults.find(savedID =>savedID.id===track.id)){
      return;
    }
    else{
      this.setState( 
        prevState=>({
          
          ...prevState.SearchResults,

          PlaylistResults:[
            ...prevState.PlaylistResults,
            track


          ],
          ...prevState.PlaylistName
        }
        )
      )
    }
  }

  removeTrack(track){
    
      this.setState(
        prevState=>({
          ...prevState.SearchResults,
          PlaylistResults: this.state.PlaylistResults.filter(saveTrack=>{
            return saveTrack.id !== track.id;
          }),
          ...prevState.PlaylistName
        })
      )
  }

  updatePlaylistName(playlistName){
    this.setState(

      prevState=>({
          ...prevState.SearchResults,
          ...prevState.PlaylistResults,
          PlaylistName: playlistName





        }
      )

    )
    
  }
  savePlaylist(){
    const trackUris= this.state.PlaylistResults.map(track=>
      track.uri)

    Spotify.savePlaylist(this.state.PlaylistName,trackUris).then(()=>{
      this.setState({
        
        PlaylistResults:[],
        PlaylistName:'Playlist Name'
      })
    })
    
    
  }
  search(searchTerm){
    
    Spotify.search(searchTerm).then(resultsArray=>{
      this.setState({SearchResults: resultsArray})
    });
    
    


  }

  render(){
      return (
        //add SearchBar component before App-playlist div
        //add both SearchResults and Playlist in the App-playlist div

        <div>
          <h1>Spotify <span className ="highlight">Playlist</span> Maker</h1>
          <div className='App'>
            <SearchBar onSearch={this.search} />
            <div className='App-playlist'>
              <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack}/>
              <Playlist PlaylistResults={this.state.PlaylistResults} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} nameVal={this.state.PlaylistName} onSave={this.savePlaylist}/>
              
            </div>
          </div>
        </div>
      )
    }
}

export default App;
