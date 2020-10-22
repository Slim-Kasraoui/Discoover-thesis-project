import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

// import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService, private activatedRoute : ActivatedRoute, private router: Router) {}

  guide = {
    username: '',
    first_name: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
    qualifications: [],
  };
  currentUser = this.tokenStorage.getUser();
userRole = this.currentUser.roles[1];
condition = this.currentUser.roles[1] !== 'guide'


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['guideId'];
      let userId = this.userRole === 'guide' ? this.currentUser.id : id ;

    this.http
      .get(`/api/user/guide/${userId}`)
      .subscribe((res: any) => {
        console.log('on init guide infos', res);
        this.guide = res;
        // this.guide.gender = 'Male';
        console.log( this.guide);
        this.guide.qualifications = res.qualifications;
        console.log('user qualification ==>', this.guide.qualifications);
      });
    })
  }

  // genderHandler(event: any) {
  //   this.guide.gender = event.target.value;
  //   console.log(this.guide.gender);
  // }

  // changeLanguageHandler(event: any) {
  //   this.language = event.target.value;
  //   console.log('the language ===>', this.language);
  // }

  // changeLevelHandler(event: any) {
  //   this.selectedLevel = event.target.value;
  //   console.log('the lenguage level ===>', this.selectedLevel);
  // }


  hire(){
    this.activatedRoute.params.subscribe(params => {
      let tripId = params['tripId'];
      let guideId = params['guideId'];
      let proposal = {
        organizerId : this.currentUser.id,
        guideId : guideId,
        tripId : tripId,
        accepted : false
      }
      console.log('trip id ====>', tripId);
      console.log('guide id ====>', `/api/trips/${tripId}/edit`);
      this.http.post("/api/proposal/add",proposal)

      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['/organizer/profile']);

      })

    })
  }

  //   addLanguage() {
  //     let row = document.createElement('div');
  //     row.className = "row";
  //     row.innerHTML = `
  //     <div class="col-md-6">
  //         <div class="form-group">
  //             <input type="text" class="form-control" placeholder="spokenL[0].">
  //         </div>
  //     </div>
  //     <div class="col-md-6">
  //         <div class="form-group">
  //           <select class="form-control form-control-sm" id="levelList">
  //             <option>Native</option>
  //             <option>Fluent</option>
  //             <option>Proficient</option>
  //             <option>Moderate</option>
  //             <option>Basic</option>
  //           </select>
  //         </div>
  //     </div>
  // </div>`;
  //     document.querySelector('.addLanguageHere').append(row);
  //   }
}
