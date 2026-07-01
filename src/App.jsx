import React from "react";
import axios from 'axios';
import ThreeBackground from './components/ThreeBackground';

import './App.css';

class App extends React.Component{

  state = { advice: " "};

  componentDidMount(){
    this.fetchAdvice();
  }
  
  fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')

    .then((response) => {

      const { advice } = response.data.slip
      
      this.setState({ advice });
      
        
    })
    .catch((error) =>{
      console.log(error);
      
    })
    
  }

  render(){
    const { advice } = this.state

    return(
      <div className="app">
        <ThreeBackground />
        <div className="card">
          <h1 className="heading">{advice}</h1>
          <button className="refresh-button" onClick={this.fetchAdvice}>
            GIVE ME ADVICE
          </button>
        </div>
      </div>
    )
  }
}

export default App;