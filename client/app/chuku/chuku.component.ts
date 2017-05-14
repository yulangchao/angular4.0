import {Component} from '@angular/core';

import {ChukuService} from './chuku.service';

import {ItemComponent} from '../items/item.component';
// Import NgFor directive

import {Router} from '@angular/router';
// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chuku',
    templateUrl: './chuku.html'

})
export class ChukuComponent {

  // Initialize our `chukuData.text` to an empty `string`
  chukuData = {
    user: '',
    name: '',
    price: null,
    number: 0,
    kuaidi: '',
    date: '',
    text: ''
  };
  private shows: number = 5;
  private selected: number = 3;
  private chukus: Array<ChukuComponent> = [];
  private items: Array<ItemComponent> = [];
  private array: Array<any> = [];
  private count: number = 0;
  private a = 0;
  constructor(private router: Router, public chukuService: ChukuService) {
    console.log('Chuku constructor go!');
      if (localStorage.getItem('token')) {
          console.log(JSON.parse(localStorage.getItem('token')));
      } else {

        router.navigate(['Index']);
      }
      //this.chukus = [];
      chukuService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `chuku` array with the `response` data
            this.chukus = res;
            for (let chuku of res){
            this.a += chuku.price * chuku.number - ((chuku.kuaidi==="") ? 0 : parseInt(chuku.kuaidi));
            }
            // Reset `chuku` input
            this.chukuData.text = '';
            this.chukuData.name = '';
            this.chukuData.price = null;
            this.chukuData.number = 0;
            this.chukuData.user = '';
            this.chukuData.kuaidi = '';
            this.chukuData.date = '';
        });

      chukuService.getAllitem()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `chuku` array with the `response` data
            this.items = res;


            // Reset `chuku` input
        });
  }

  createChuku() {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuData.name = this.chukuData.name.split('+')[1];
      this.chukuService.createChuku(this.chukuData)
        .subscribe((res) => {

          // Populate our `chuku` array with the `response` data
          this.chukus = res;
          // Reset `chuku` input
          this.chukuData.text = '';
          this.chukuData.name = '';
          this.chukuData.price = null;
          this.chukuData.number = 0;
          this.chukuData.user = '';
          this.chukuData.kuaidi = '';
          this.chukuData.date = '';
        });

    }

  }

  deleteChuku(id) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuService.deleteChuku(id)
        .subscribe((res) => {

          // Populate our `chuku` array with the `response` data
          this.chukus = res;
        });
    }
  }

  isadmin(){
    return (JSON.parse(localStorage.getItem('token')).role === "admin");
  }

  updateChuku(chuku) {
    if (JSON.parse(localStorage.getItem('token')).role === "admin") {
      this.chukuData.name = this.chukuData.name.split('+')[1];
      this.chukuService.updateChuku(chuku._id,this.chukuData)
        .subscribe((res) => {
             this.chukus[this.chukus.indexOf(chuku)] = res;
        });
    }
  }

   updateForm(chuku){
       this.chukuData.text = chuku.text;
       this.chukuData.name = chuku.name;
       this.chukuData.price = chuku.price;
       this.chukuData.number = chuku.number;
       this.chukuData.kuaidi = chuku.kuaidi;
       this.chukuData.date = chuku.date;
       this.chukuData.user = chuku.user;
  }

}
