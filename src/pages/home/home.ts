import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
books: FirebaseListObservable<any[]>;

  constructor( public navCtrl: NavController, public alertCtrl:AlertController, db: AngularFireDatabase){
    this.books = db.list('/Books');}
    
    addBook():void{
    let prompt = this.alertCtrl.create({
    title:'Book Title and Author',
    message:'Enter the books title and Author',
    inputs: [
    {
     name: 'title',
     placeholder:"Book title"
    },
    {
     name: 'author',
     placeholder:"Author Name"
    }
    
    ],
    buttons:[
    {
    text:"Cancel",
    handler:data=>{
    console.log("cancel clicked");
    }
    },
    {
    text:"Save Book",
    handler:data=>{
    this.books.push({
    title:data.title,
    author:data.author
    })
    }
    }
    ]
    })
    prompt.present();
    }
    editBook(book):void{
    let prompt = this.alertCtrl.create({
    title:'Edit Book',
    message:'Edit the books title and Author',
    inputs: [
    {
     name: 'title',
     placeholder:book.title
    },
    {
     name: 'author',
     placeholder:book.author
    }
    
    ],
    buttons:[
    {
    text:"Cancel",
    handler:data=>{
    console.log("cancel clicked");
    }
    },
    {
    text:"Save Book",
    handler:data=>{
    let newTitle:String = book.title;
    let newAuthor:String= book.author;
    
    if(data.title !=''){
    newTitle =data.title;
    }
    
     if(data.author !=''){
    newAuthor =data.author;
    }
    this.books.update(book.$key,{
    title:newTitle,
    author:newAuthor
    })
    }
    }
    ]
    })
    prompt.present();
    }
    
    deleteBook(bookID):void{
    let prompt = this.alertCtrl.create({
    title:'Delete Book',
    message:'Delete the books title and Author',
    
    buttons:[
    {
    text:"Cancel",
    handler:data=>{
    console.log("cancel clicked");
    }
    },
    {
    text:"Delete Book",
    handler:data=>{
    this.books.remove(bookID);
    }
    }
    ]
    })
    prompt.present();
    }
}
