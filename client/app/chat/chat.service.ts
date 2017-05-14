import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ChatService {

  constructor(public http:Http) {

  }

  getAll() {
      return this.http.get('/api/chat').map(res => res.json());
  }

  createChat(data) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/chat', JSON.stringify(data),{headers: headers}).map(res => res.json());
  }

  deleteChat(id) {

      return this.http.delete(`/api/chat/${id}`).map(res => res.json());
  }
}
