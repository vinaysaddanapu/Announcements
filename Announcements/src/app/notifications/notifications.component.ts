import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {AuthServiceService} from '../api.service';
import { Router } from '@angular/router';
   
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  title  = 'Create Announcement';
  selectedFile: File=null;
  notificationForm:FormGroup;

  constructor(private router:Router, private authService:AuthServiceService, private fb:FormBuilder) {
    this.notificationForm = this.fb.group({
      title:[''],
      subject:[''],
      description:[''],
      link:[''],
      image:[''],
      tags:['']
    })
   }

  ngOnInit(): void {
}

onFileSelected(event){
  this.selectedFile =<File> event.target.files[0];
}

PreviousNotifications(){
  this.router.navigateByUrl('/admin');
}

logout(){
  localStorage.clear();
  this.authService.logout();
  this.router.navigateByUrl('');
}

Back(){
  this.router.navigateByUrl('/admin');
}

getTags(){
  this.authService.getTags().subscribe(result =>{
    console.log(result);

  },(error:any)=>alert("Invalid Username or Password"))
}

postAnnouncement(){
  const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('title',this.notificationForm.get('title').value);
    fd.append('subject',this.notificationForm.get('subject').value);
    fd.append('description',this.notificationForm.get('description').value);
    fd.append('link',this.notificationForm.get('link').value);
    fd.append('tags',this.notificationForm.get('tags').value);
  console.log(fd);
  if(this.notificationForm.valid){
        alert("Announcement Posted");
        console.log('Post Announcement Called');
        console.log(this.notificationForm.value);
        this.authService.postAnnouncement(fd).subscribe(result=>{
          console.log(result);
  }, (error:any)=> alert("Error in sending Announcement"))        
  }

 }
}

 