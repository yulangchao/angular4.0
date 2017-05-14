import {Component} from '@angular/core';

import {RukuService} from './ruku.service';

import {ItemComponent} from '../items/item.component';
// Import NgFor directive
import { ToastComponent } from '../shared/toast/toast.component';
import {Router} from '@angular/router';
// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'ruku',
    templateUrl: './ruku.component.html'

})
export class RukuComponent {

  // Initialize our `rukuData.text` to an empty `string`
  rukuData = {
    user: '',
    name: '',
    price: null,
    number: 0,
    location: '',
    date: '',
    text: ''
  };
    private shows: number = 5;
  private selected: number = 3;
  private rukus: Array<RukuComponent> = [];
  private items: Array<ItemComponent> = [];
  private array: Array<any> = [];
  private count: number = 0;
  private a = 0;
  constructor(private router: Router, public rukuService: RukuService, public toast: ToastComponent) {
    console.log('Ruku constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
      //this.rukus = [];
          rukuService.getAll()
            // `Rxjs`; we subscribe to the response
            .subscribe((res) => {

                // Populate our `ruku` array with the `response` data
                this.rukus = res;
                for (let ruku of res){
                this.a += ruku.price * ruku.number;
                }
                // Reset `ruku` input
                this.rukuData.text = '';
                this.rukuData.name = '';
                this.rukuData.price = null;
                this.rukuData.number = 0;
                this.rukuData.user = '';
                this.rukuData.location = '';
                this.rukuData.date = '';
            });

          rukuService.getAllitem()
            // `Rxjs`; we subscribe to the response
            .subscribe((res) => {

                // Populate our `ruku` array with the `response` data
                this.items = res;


                // Reset `ruku` input
            });
      } else {

        router.navigate(['Index']);
      }
  }

  createRuku() {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.rukuData.name = this.rukuData.name.split('+')[1];
      this.rukuService.createRuku(this.rukuData)
        .subscribe((res) => {

          // Populate our `ruku` array with the `response` data
          this.rukus = res;
          // Reset `ruku` input
          this.rukuData.text = '';
          this.rukuData.name = '';
          this.rukuData.price = null;
          this.rukuData.number = 0;
          this.rukuData.user = '';
          this.rukuData.location = '';
          this.rukuData.date = '';
        });

      // this.rukuService.updateItem(this.rukuData.number)
      //   .subscribe((res) => {

      //       // Populate our `ruku` array with the `response` data
      //       this.rukus = res;
      //       // Reset `ruku` input
      //  });
    }

  }

  deleteRuku(id) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.rukuService.deleteRuku(id)
        .subscribe((res) => {

          // Populate our `ruku` array with the `response` data
          this.rukus = res;
        });
    }
  }

  isadmin(){
    return (JSON.parse(localStorage.getItem('token')).role === "admin");
  }

  updateRuku(ruku) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.rukuData.name = this.rukuData.name.split('+')[1];
      this.rukuService.updateRuku(ruku._id,this.rukuData)
        .subscribe((res) => {
            this.rukus[this.rukus.indexOf(ruku)] = res;
            this.toast.setMessage('item edited successfully.', 'success');
        });
    }
  }

 updateForm(ruku){
       this.rukuData.text = ruku.text;
       this.rukuData.name = ruku.name;
       this.rukuData.price = ruku.price;
       this.rukuData.number = ruku.number;
       this.rukuData.location = ruku.location;
       this.rukuData.date = ruku.date;
       this.rukuData.user = ruku.user;
  }
}