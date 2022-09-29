import { AuthService } from './../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy
 {

  posts: Post[]=[];
  isLoading = false;
  totalPosts = 0;
  postsPerPage= 3;
  currentPage= 1;
  pageSizeOptions=[1, 2, 5, 10]
  private postsSub!: Subscription;
  private authStatusSub!: Subscription;
  userIsAuthenticatedAgain = false;

  constructor(public postsService: PostsService, private authService: AuthService) { }


  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number})=>{
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticatedAgain = this.authService.getIsAuth();

    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticatedAgain = isAuthenticated;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() =>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }




  // posts = [
  //   {title: "First post", content: "First post content"},
  //   {title: "2nd post", content: "First post content"},
  //   {title: "3rd post", content: "First post content"},
  //   {title: "4th post", content: "First post content"}
  // ];

}
