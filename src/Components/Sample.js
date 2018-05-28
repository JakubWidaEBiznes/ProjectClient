import React, { Component } from 'react';

export default class Sample extends Component
{
constructor(props)
	{
	//constructor & state are nescesary only when state is used - when all is passed via props then its not needed
	//generally props can pass more than one value, and more complex values and whatnot
	super(props)
	this.state =
		{
		banana:"bananaNa!",
		onc:"whomp",
		arrayo:["alef","bet","gimmel"]
 		}
	}

//passing value in other component: <Sample value="???"></Sample>
render()
	{
	return (
		<div>
			<p>hey, its a a smple component!</p>
			<p>"this is a passed value:" {this.props.value}</p>
			<p>"this is a local value:" {this.state.banana}</p>


			//only when setState is run, a component & descendants is updated. this is different to angular.
			//generally instead of services for smaller stuff, usually parent compoents hold data and pass it via props
			<button onClick={() => {this.setState( {onc:"bomp"} ) }}> button
			</button>
			<p>"this is an onclick stuff"{this.state.onc}</p>

			//this stuff wont be visible untill calling setState()
			<button onClick={() => {this.state.banana = "no" }}> button
			</button>


			//multiple elements
			<ul>
				{this.state.arrayo.map(c=><li>{c}</li>)}
			</ul>
		</div>
		)
	}
}
