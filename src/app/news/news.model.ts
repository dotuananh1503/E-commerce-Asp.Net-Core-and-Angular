export class News {
    public id?: string;
    public title: string;
    public author: string;
    public date: Date;
    public content: string;
    public imageNews: string;
    constructor(id: string, title: string, author: string, date: Date, content: string, imageNews: string){
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
        this.imageNews = imageNews;
    }
}