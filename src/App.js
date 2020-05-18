import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import web3 from './web3';
import contract from './contract';

class App extends Component {

  state = {
	  charging_station: '',
	  uavs: [],
	  s: 0,
	  f: 0,
	  Q: 0,
	  A: 0,
	  u_i: 0,
	  u_cs: 0,
	  x: 0,
		ether: 0,
	  m1: '',
	  m2: '',
	  m3: '',
	  m4: '',
		m5: '',
  };

  async componentDidMount() {
	  const charging_station = await contract.methods.ch_st().call();

	  const uavs = await contract.methods.alluavs().call();

	  this.setState({ charging_station, uavs });
  }

  onSubmit = async event => {
	  event.preventDefault();

		var ether = parseInt(this.state.ether);
		if(ether > 1){

	  var s = parseInt(this.state.s);
    //var s=7;
	  var f = parseInt(this.state.f);
    //var f=10;

	  var sigma = (s)/(s+f);
	  sigma = Math.round(sigma*100)/100;

	  //predefined factors for uav
	  var d = (Math.random() * (5-1)) + 1;
	  d = Math.round(d);
	  var phi = (Math.random() * (7-5)) + 5;
	  phi = Math.round(phi);

	  //reapyment time in months given to uav
 	  var t = (Math.random() * (7-5)) + 5;
	  t = Math.round(t);

	  //constants
	  var nu = (Math.random() * (3-2)) + 2;
	  nu = Math.round(nu);
	  var c = (Math.random() * (8-6)) + 6;
	  c = Math.round(c);

	  //interest rate at which uav borrowed tokens for time t
	  var y = Math.round(0*100)/100;
	  var k = 0;

	  //Cost of energy requested by uav
	  var p = (Math.random() * (7-5)) + 5;
	  p = Math.round(p);

	  var Q = parseInt(this.state.Q);
    //var Q=7;

	  //predefined credit factor of uav
	  var z = (Math.random() * (1-0)) + 0;
	  z = Math.round(z*10)/10;

	  var A = parseInt(this.state.A);
	  var u_i = parseInt(this.state.u_i);
	  var u_cs = parseInt(this.state.u_cs);
    s=7; f=10; Q=5;
	  //Algorithm is implemented
	  var iter = 10; //Iteration may vary
	  var x=1; var x_max=10; var temp=0;

	  for(var i=0; i<iter; i++){
		  if(x<x_max){
			  k = (Q*p)-(phi*p);
			  if(k>0){
				  A=0;
				  x=0;
				  this.setState({ x: `${x}` });
				  this.setState({ A: `${A}` });
				  break;
			  }

			  //Interest rate is calculated
			  y = (x)/(nu*t);
			  y = Math.round(y*100)/100;

			  //Energy given by charging station is calculated
			  A = ((sigma*d)/((sigma*y*t)+((1-sigma)*x)))+k;
			  A = Math.round(A*100)/100;

			  //Utility of uav is calculated
			  u_i = ((sigma*((d*(Math.log((A/p)-Q+phi)))-(y*A*t)))+((1-sigma)*x*A));
			  u_i = Math.round(u_i*100)/100;

			  //Utility of charging station is calculated
			  u_cs = (A*((z*y*t)-(t*c)+((1-z)*x)));
			  u_cs = Math.round(u_cs*100)/100;

			  if(temp < u_cs){
				  temp = u_cs;

				  this.setState({ x: `${Math.abs(x)}` });
				  this.setState({ A: `${Math.abs(A)}` });
				  this.setState({ u_i: `${Math.abs(u_i)}` });
				  this.setState({ u_cs: `${Math.abs(u_cs)}` });
				  x = x+1;
			  }else{
				  x = x+1;
			  }
		  }
	  }
	  this.setState({ m1: `Late fee at which energy given to uav: ${this.state.x}` });
	  this.setState({ m2: `Energy given to uav: ${this.state.A}` });
	  this.setState({ m3: `Utility of Charging Station: ${this.state.u_cs}` });
	  this.setState({ m4: `Utility of uav: ${this.state.u_i}` });
	}else{
		this.setState({ m5: `The UAV haven't passed the entry fee validation. So UAV is not allowed to enter in network` });
    alert("The UAV haven't passed the entry fee validation. So UAV is not allowed to enter in network");
	}
  };

  render() {
  return (
   <div>
	  <div class="energy"><h1>Energy Trading between Charging Station and UAV's</h1></div>
    <div class="main">
		<h3 class="name">
	   This contract is managed by the charging station with address:</h3>
	<h3 class="name">
		  {this.state.charging_station}
	  </h3>
	  <h2 class="name">
	   The UAV has to enter the necessary details to enter into the network.
	  </h2>

	  <form onSubmit={this.onSubmit}>
      <div id="name">
  	   <h2 class="name">Enter number of times repaid tokens successfully:</h2>
  	   <input class="tokens" type="text" name="tokens_repaid_successfully"
  	     s={this.state.s}
  	     onChange={event => this.setState({ s: event.target.value })}
  	   />
        </div>
        <div>
         <h2 class="name">Enter number of times failed in repaying tokens:</h2>
  	   <input class="failed" type="text" name="token_repaying_failed"
  	     f={this.state.f}
  	     onChange={event => this.setState({ f: event.target.value })}
  	   />
  	  </div>
      <div>
       <h2 class="name">Enter the energy required (in joules):</h2>
	   <input class="energy_req" type="text" name="enter_energy_required"
	     Q={this.state.Q}
	     onChange={event => this.setState({ Q: event.target.value })}
	   />
	  </div>
    <div>
	   <h2 class="name">Enter the entry fee (in ethers):</h2>
	   <input class="ether" type="text" name="ether_given"
	     ether={this.state.ether}
	     onChange={event => this.setState({ ether: event.target.value })}
	   />
      </div>
      <button type="submit">Enter</button>
	  </form>

	  <h2 class="name1">{this.state.m1}</h2>
    <h2 class="name1">{this.state.m2}</h2>
    <h2 class="name1">{this.state.m3}</h2>
    <h2 class="name1">{this.state.m4}</h2>
    </div>
	</div>
  );

  }
}

export default App;
