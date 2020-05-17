import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message = "Welcome to Dashboard";
  formGroup: FormGroup;
  public postList: any = [];
  
  public visible:boolean=true;

  constructor(private authService: AuthServiceService, private router: Router, private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.authService.getAnnouncement().subscribe(result =>{
      console.log(result);
      this.postList = result;
      //console.log(postList.image);
    },(error:any)=>alert("Announcements Cannot be Displayed"));
   console.log(this.postList);
   let admin= localStorage.getItem('isAdmin');
   if(!admin){
      this.visible = false;
   }
   console.log(admin);
 }

 logout(){
  localStorage.clear();
  this.authService.logout();
  this.router.navigateByUrl('');
}

goToNotification(id) {
  this.router.navigate(['/view-notification',id]);
}


}
