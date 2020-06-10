import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  public postList: any = [];
  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.authService.getScheduledAnnouncement().subscribe(result =>{
      console.log(result);
      this.postList = result;
      //console.log(postList.image);
     
      setTimeout(function(){
        window.location.reload();
     }, 60000);
    },(error:any)=>alert("Announcements Cannot be Displayed"));
   console.log(this.postList); 

}

goToUpdate(id)
{
  this.router.navigate(['/update',id])
}
deleteAnnouncement(id)
{
  this.authService.getDelete(id).subscribe(result =>{
   // this.router.navigate(['/scheduled']);

    this.deleteAlert();
    
  })
}

goToNotification(id)
{
this.router.navigate(['/view-scheduled',id]);
}
deleteAlert()
{
  alert("Announcement Deleted");
  window.location.reload();
  
}
}

