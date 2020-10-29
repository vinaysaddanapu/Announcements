import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../api.service';
import {FormControl, FormGroup, Validator} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {
   public id: string;
   formGroup: FormGroup;
   public postList:any={};
                 
  constructor(private authService: AuthServiceService, private router:Router, private route:ActivatedRoute) { }

ngOnInit():void {
  const id= this.route.snapshot.params['id'];
  this.authService.getAnnouncementById(id).subscribe(result =>{
    console.log(result);
    this.postList = result;
    //console.log(postList.image);
  },(error:any)=>alert("Announcements Cannot be Displayed"));
 console.log(this.postList);
 let admin= localStorage.getItem('isAdmin');
 console.log(admin);
}
}
