import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isLoading = false;
  error = null;
  private errorSubs: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubs = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.isLoading = true;
    this.postsService.fetchPosts().subscribe({
      next: (posts) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postsService.fetchPosts().subscribe({
      next: (posts) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubs.unsubscribe();
  }
}
