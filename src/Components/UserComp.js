import React, { Component } from 'react';

export default class UserComp extends Component
{
constructor(props)
	{

	super(props)
	this.state =
		{
 		}
	}

render()
	{
	return (
		<div>
		<p>user component {this.props.match.params.id} </p>
		</div>
		)
	}
}
