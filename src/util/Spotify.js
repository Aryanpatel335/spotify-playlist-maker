
let accessToken;
const applicationClientID = 'e61497f0fa7c4a01baae6acfed3ee1f5';
//const redirectURI = "http://localhost:3000/";
//domainNAME.surge.sh
const redirectURI = "https://spotifyplaylistmaker.surge.sh/";
const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        // example: https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
        const accessTokenPassed = window.location.href.match(/access_token=([^&]*)/);
        const expiryTimePassed = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenPassed && expiryTimePassed){

            accessToken= accessTokenPassed[1];
            const expiresIn= Number(expiryTimePassed[1]);
            //set access token to nothing after expiry
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            //wipe the parameters from URL so website does not try to get token after expiry
            window.history.pushState('Access Token', null, '/');
            window.addEventListener('load',Spotify.getUserInfo());
            return accessToken;
        }else{
            //redirect URL 
            const redirectURL=  `https://accounts.spotify.com/authorize?client_id=${applicationClientID}&response_type=token&scope=playlist-read-private playlist-modify&redirect_uri=${redirectURI}`;
            window.location = redirectURL;
        }
        
        

          
    },

    //using async to fetch
    async search(searchTerm){
        //trackEndPoint is '/v1/search?type=TRACK';
        
        try{
            const recievedAccessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${recievedAccessToken}`
                    }
                }
            );
            
            if(response.ok){
                const JSONData = await response.json();

                if(!JSONData.tracks){
                    
                    return [];
                }else{
                    return JSONData.tracks.items.map(track=>({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        image:track.album.images[0].url,
                        album: track.album.name,
                        uri: track.uri,
                        
                    }))
                }          
                
            }  
            else{
                return [];
            }       


        }
        catch(error){
            console.log('There is an error');
        }
    },

    async savePlaylist(name,trackUris){
        //name is the name of the playlist that the user set to 
        try{
            if(!name || !trackUris.length){
                return;
            }

            const recievedAccessToken = Spotify.getAccessToken();
            const headers= {Authorization: `Bearer ${recievedAccessToken}`};
            let userID;
           
            
            const response = await fetch('https://api.spotify.com/v1/me',{headers:headers})
            const jsonRespose = await response.json();
            userID = jsonRespose.id;
            
            //creates the playlist
            const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers:headers,
                method:'POST',
                //body here will be name of the playlist stored in object in this.state where it is called "PlaylistName"
                body: JSON.stringify({name:name})
            })

            const jsonResponse_1 = await response_1.json();
            
            const playlistID= jsonResponse_1.id;
            //adds the tracks to the playlist 
            const trackReturn = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                headers:headers,
                method:'POST',
                //body will be the uris stored in js object in App.js called PlaylistResults
                body:JSON.stringify({uris:trackUris})
            })

            return trackReturn;
        



        }catch(error){
            console.log(error);
        }
    },
    

    async getUserInfo(){
        try{
            let userName;
            const recievedAccessToken = Spotify.getAccessToken();
            const headers= {Authorization: `Bearer ${recievedAccessToken}`};
            const response = await fetch('https://api.spotify.com/v1/me',{headers:headers})
            const jsonRespose = await response.json();
            userName = jsonRespose.display_name;
            
            return userName;
        }catch(error){
            console.log(error)
        }

    }

};


export default Spotify;

