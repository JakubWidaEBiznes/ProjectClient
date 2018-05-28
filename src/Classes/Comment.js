export class Comment
{
	constructor(text,publicationDate,userName,authorId,productId)
		{
		this.text = text;
		this.publicationDate = publicationDate;
		this.userName = userName;

		this.authorId = authorId;
		this.productId = productId;

		this.user = undefined;
		this.product = undefined;
		}
}
