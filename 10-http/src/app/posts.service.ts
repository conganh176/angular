import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content,
    };

    this.http
      .post<{ name: string }>(
        'https://angular-demo-d974e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        {
          observe: 'body', // response for more information
        }
      )
      // only send when subscribe
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
        },
        error: (error) => {
          this.error.next(error.message);
        },
      });
  }

  fetchPosts() {
    // params
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<Post>(
        'https://angular-demo-d974e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-header': 'Hello',
          }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }

          return postsArray;
        }),
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes.message));
        })
      );
  }

  deletePost() {
    return this.http
      .delete(
        'https://angular-demo-d974e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
          responseType: 'json',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
