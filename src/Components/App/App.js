
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';
import UserInfo from '../UserInfo/UserInfo';
class App extends React.Component {

  constructor(props){
    super(props)
    //This will be an array of track objects when it is done
    this.state = {
      SearchResults:[],

      PlaylistResults: [
      
      ],
    
      PlaylistName: "Playlist Name",
      UserName: "null"
    }


    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  addTrack(track){
    if(this.state.PlaylistResults.find(savedID =>savedID.id===track.id)){
      return;
    }
    else{
      this.setState( 
        prevState=>({
          
          SearchResults:this.state.SearchResults.filter(keeptrack=>{
            return keeptrack.id !== track.id;
          }),

          PlaylistResults:[
            ...prevState.PlaylistResults,
            track


          ],
          ...prevState.PlaylistName,
          ...prevState.UserName
        }
        )
      )
    }
  }

  removeTrack(track){
    
      this.setState(
        prevState=>({
          SearchResults:[track,...prevState.SearchResults],

          PlaylistResults: this.state.PlaylistResults.filter(saveTrack=>{
            return saveTrack.id !== track.id;
          }),
          ...prevState.PlaylistName,
          ...prevState.UserName
        })
      )
  }

  updatePlaylistName(playlistName){
    this.setState(

      prevState=>({
          ...prevState.SearchResults,
          ...prevState.PlaylistResults,
          PlaylistName: playlistName,
          ...prevState.UserName





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

  setUserName(){

    Spotify.getUserInfo().then(username=>{
      this.setState({UserName: username})
    })
    
  }
  componentDidMount(){
    window.addEventListener('load', this.setUserName);
  }

  componentWillUnmount(){
    window.addEventListener('load',this.setUserName);
  }

  render(){
      return (
        //add SearchBar component before App-playlist div
        //add both SearchResults and Playlist in the App-playlist div     <UserInfo UserInfo={this.state.UserName}/>
        //<div className="header">
        // <h1 className="title">Spotify <span className ="highlight">Playlist</span> Maker </h1>
        // </div>
        // <div className='userInfo'>
        //   <h2>Hello World</h2>
          
        // </div>
        <div>
          <div className='header'>
            <div className='userInfo'><UserInfo UserInfo={this.state.UserName}/></div>
            <h1 className='title'>Spotify <span className ="highlight">Playlist</span> Maker </h1>
          </div>
        
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
