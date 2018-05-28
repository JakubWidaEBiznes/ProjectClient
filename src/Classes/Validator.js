export class Validator
	{
	constructor(arg) // [{order:string,value:string},...]
		{
		this.dictum =
			{
			"longer":this._validateLongerThan,
			"shorter":this._validateShorterThan,
			"present":this._validatePresent,
			"copy":this._validateCopy,
			"complex":this._validateComplex,
			"email":this._validateEmail,
			}
		this.checked = {}
		var self = this;
		for(var a in arg)
			{
			if(Object.keys(this.dictum).indexOf(a)> -1)
				{
				this.checked[a]={func:self.dictum[a].bind(self),val:arg[a]}
				}
			}
		}

	update(value)
		{
		let out = {validation:true,errors:[],value:value}
		for(let c in this.checked)
			{
			//console.log(c)
			let c = this.checked[c];
			let ret = c.func(value,c.val);
			if(!(ret === true))
				{
				out.validation = false;
				out.errors.push(ret)
				}
			}
		return out;
		}


	_validatePresent(arg,value)
		{
		if(!(arg))
			{
			return arg + " has not been inserted";
			}
		return true;
		}

	_validateLongerThan(arg,value)
		{
		//console.log("longer",arg,value)
		if(!(arg.length > value))
			{
			return "Required of at least "+value+" characters";
			}
		return true;
		}

	_validateShorterThan(arg,value)
		{
		if(!(arg.length < value))
			{
			return "Required less than "+value+" characters";
			}
		return true;
		}

	_validateComplex(arg,value)
		{
		if(!(arg.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]+$/)))
			{
			return "It must contain at least one digit, upper and lowercase characters, and only alphanumeric symbols";
			}
		return true;
		}

	_validateEmail(arg,value)
		{
		if(!(arg.toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))
			{
			return arg + " is not a proper email address";
			}
		return true;
		}

	_validateCopy(arg,value)
		{
		var self = this;
		//console.log(self);
		if(!(arg == value))
			{
			return arg + " is not identical to "+value;
			}
		return true;
		}
}
