export class Product
	{
	constructor(id,name,description,price,startedSelling,stock,thumbnail,keywords,category,userName,sellerId)
		{
		this.id=id,
		this.name = name;
		this.description = description;
		this.price = price;
		this.startSelling = startedSelling;
		this.stock = stock;
		this.thumbnail = thumbnail;
		this.userName = userName;
		this.sellerId = sellerId;

		this.keywords = keywords;
		this.category = category;

		this.comments = []
		this.user = undefined;
		}
	}
