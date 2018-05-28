class Maino
{
	constructor()
		{
		this.URL = "http://localhost:9090";
		this.getBody = {
			method:"GET",
			headers:
				{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				}
			}
		this.postBody = {
			method:"POST",
			headers:
				{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				}
			}
		this.IMGURL= this.URL+"/assets/images/"
		}

	post(route,body)
		{
		var self = this;
		var pBody = Object.assign({},self.postBody)
		pBody.body = JSON.stringify(body);
		
		var promise = fetch(this.URL+"/"+route,pBody)
		return promise.then(response=>response.json())
		}

	get(route,...params)
		{
		let paramStr = params.join("/")
		if(paramStr)
			{paramStr = "/"+paramStr;}
		var promise = fetch(this.URL+"/"+route+paramStr,this.getBody)
		return promise.then(response=>response.json())
		}

	}

export var Main = new Maino();
