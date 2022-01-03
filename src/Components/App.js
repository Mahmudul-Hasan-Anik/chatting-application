import React from "react";
import Registration from "./Auth/Registration";
import Login from './Auth/Login'
import Home from "./Home";
import ChattingMain from "./ChattingMain";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { auth } from "../Firebase";

class App extends React.Component {
  state={
    track:false
  }
  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.setState({track:true})
      }else{
        this.setState({track:false})
        
      }
    })
  }
render(){
  const {track} = this.state
  return (
    <BrowserRouter>
    {track? 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/main' element={<ChattingMain/>}/>
        <Route path='/login' element={<Navigate to="/main"/>}/>
        <Route path='/registration' element={<Navigate to='/main'/>}/>
      </Routes>
      :
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/main' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    }
      
    </BrowserRouter>
  );
}
}

export default App;
