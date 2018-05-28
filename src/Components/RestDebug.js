import React, { Component } from 'react';

//sending { "name" : "joe" , "description" : "shmoe" }
//works

export default class RestDebug extends Component
{
	constructor(props)
		{
		super(props)
		this.state=
			{
			received:"---",
			usejson:false,
			method:"GET",
			url:"",
			content:""
			}
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onsend = this.onsend.bind(this);
		}

  handleInputChange(event)
		{
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState(
			{
			[name]: value
    	});
  }



	onsend()
		{
		var self = this;
		console.log(self.state);
		//this works. now is the time for connection with dom

		console.log("present",self.state.content)

		if(self.state.content)
			{
			var sentContent = JSON.parse(self.state.content);
			//sentContent.csrfToken="1cb83b97cbb0216c618fd5090b43487e60653625-1526572838706-7ccc45ea4ba880e997b52ed1";

			console.log("trying to send",sentContent)

			var stringed = JSON.stringify(sentContent);

			console.log("alsmost there to send",stringed)
			}
		else
			{
			var stringed = undefined;
			}

		var msgBody =
					{
					method:self.state.method,
				  headers:
						{
						Accept: 'application/json',
						'Content-Type': 'application/json',
						},
					};
		if(self.state.method == "POST")
			{
			msgBody.body = stringed;
			}

		fetch(
			this.state.url,
			/*{
			method:self.state.method,
		  headers:
				{
				Accept: 'application/json',
				'Content-Type': 'application/json',
				},
		  body:stringed
			}*/
			msgBody
			)
			.then(response=>{console.log("rawResponse:",response); return response.json(); })
				.then(resJson=>{console.log("response",resJson), this.setState({received:resJson.body})})
				.catch(err=>{console.log("error",err)})
/*
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
*/
		}
render()
	{


	return (
	<div>
	<h3>"REST debug"</h3>
	<div>
		<label>
				Method
			<select name="method" onChange={this.handleInputChange}>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
      </select>
		</label>
		<br></br>
		<label>
			<input name="url" type="text" onChange={this.handleInputChange} />
			url
		</label>
		<br></br>
		<label>
			<input name="content" type="text" onChange={this.handleInputChange} />
			content
		</label>
		<label>
			<input name="usejson" type="checkbox" value="usejson" onChange={this.handleInputChange} />
			"use JSON"
		</label>
		<br></br>
		<button name="send" onClick={this.onsend}>SEND</button>
		<br></br>
		<label>
			received
			<p>{this.state.received}</p>
		</label>
	</div>
	</div>
		)
	}


}
