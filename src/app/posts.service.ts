import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http
        .post<{ name: string }>(
          'https://udemy-angular-http-modul-e6d0b.firebaseio.com/posts.json',
          postData
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
    }

    fetchPosts() {
        return this.http
            .get<{ [key: string]: Post }>(
                'https://udemy-angular-http-modul-e6d0b.firebaseio.com/posts.json'
                )
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://udemy-angular-http-modul-e6d0b.firebaseio.com/posts.json');
    }
}
