import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy
 {

  posts: Post[]=[];
  private postsSub!: Subscription;
  constructor(public postsService: PostsService) { }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }



  // posts = [
  //   {title: "First post", content: "First post content"},
  //   {title: "2nd post", content: "First post content"},
  //   {title: "3rd post", content: "First post content"},
  //   {title: "4th post", content: "First post content"}
  // ];

}
