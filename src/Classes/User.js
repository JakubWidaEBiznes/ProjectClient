export class User
{
	constructor(name,joindate)
		{
		this.name = name;
		this.joindate = joindate;

		this.products_sell = [];
		this.products_cart = [];
		this.comments = [];
		}
}
