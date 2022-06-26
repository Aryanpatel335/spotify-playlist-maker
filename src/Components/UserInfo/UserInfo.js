import React from 'react'
import '../UserInfo/UserInfo.css'

class UserInfo extends React.Component{
    render(){
        return(
            <div className='userInfo'>
               { this.props.UserInfo === "null" ? (<p>Welcome</p>): (<p>Welcome <span className='highlightname'>{this.props.UserInfo}</span>, you are now logged in</p>)}   
               
            </div>
        )
    }



}

export default UserInfo;