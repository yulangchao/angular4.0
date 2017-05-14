import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemService {


  constructor(public http:Http) {

  }

  getAll() {
      return this.http.get('/api/item').map(res => res.json());
  }

  createItem(data) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/item', JSON.stringify(data),{headers: headers}).map(res => res.json());
  }

  deleteItem(id) {

      return this.http.delete(`/api/item/${id}`).map(res => res.json());
  }

  getAllruku(){
    return this.http.get('/api/ruku').map(res => res.json());
  }

  getAllchuku(){
    return this.http.get('/api/chuku').map(res => res.json());
  }

  updateItem(name,data) {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      return this.http.put(`/api/item/${name}`,JSON.stringify(data),{headers: headers}).map(res => res.json());
  }
}
