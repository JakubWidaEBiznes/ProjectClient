import React, { Component } from 'react';
import './App.css';

import Sample from "./Components/Sample"
import RestDebug from "./Components/RestDebug"

import {Main} from "./Components"

import MainContainer from "./Main/MainContainer"

class App extends Component
	{
	  render()
		{
	  return (
			<div>
				<MainContainer></MainContainer>
			</div>
			);
		}
	}
				//<Main></Main>
				//<RestDebug></RestDebug>
				//<Sample value="hemlo"></Sample>
export default App;
