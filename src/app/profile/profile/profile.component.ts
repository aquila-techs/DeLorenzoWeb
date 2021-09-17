import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  file;
  imageUrl;
  enImageUrl = environment.imgUrl;
  referralCode;
  userProfileData = {
    email: '',
    name: '',
    gender: '',
    phoneNo: '',
    bio: '',
    city: '',
    state: '',
    country: '',
    website: '',
    facebook:'',
    instagram:'',
    linkedin:'',
    youtube:'',
    twitter:''

  }

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        console.log(data);
        this.referralCode = data.referralCode;
        this.userProfileData.email = data.email;
        this.userProfileData.name = data.name;
        this.userProfileData.gender = data.gender;
        this.userProfileData.phoneNo = data.phoneNo;
        this.userProfileData.bio = data.bio;
        this.userProfileData.city = data.city;
        this.userProfileData.state = data.state;
        this.userProfileData.country = data.country;


        this.userProfileData.website = data.website;
        this.userProfileData.facebook = data.facebook;
        this.userProfileData.instagram = data.instagram;
        this.userProfileData.linkedin = data.linkedin;
        this.userProfileData.twitter = data.twitter;
        this.userProfileData.youtube = data.youtube

        console.log(this.userProfileData);

        if(data.profilePic) {
          this.imageUrl = `${this.enImageUrl}${data.profilePic}`;
          console.log(this.imageUrl);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  copyReferralCode() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.referralCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Referral Code Copied!", 'Success!', { timeOut: 2000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
  }

  createFormData(file: File) {
    console.log(file);
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
        //console.log(this.imageUrl);
      };
      const formData = new FormData();
      formData.append("profilePic", this.file);
      this.profileService.updateProfilePic(formData).subscribe(
        (data) => {
          //console.log(data);
          this.profileService.sendImageChangeEvent();
          this.profileService.onFirstComponentLoad();
          this.toastr.success("Profile Picture Updated!", 'Success!', { timeOut: 2000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
          window.location.reload()
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  updateProfile() {
    console.log(this.userProfileData)
    this.profileService.updateProfile(this.userProfileData).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Profile Updated!", 'Success!', { timeOut: 2000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
