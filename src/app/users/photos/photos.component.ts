import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
//import { error } from 'console';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getUserPhotoChange= new EventEmitter<string>();
    uploader: FileUploader;
    hasBaseDropZoneOver=false;
    baseUrl= environment.apiUrl;
    currentMain : Photo;



  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any):void{
    this.hasBaseDropZoneOver=e;
  }

  initializeUploader(){
    this.uploader=new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024   //10 mb
    })

    this.uploader.onAfterAddingFile=(file)=> {
      file.withCredentials=false;
    };


    //metoda w uploader pokazuje zdjecia po dodaniu na stronie nie trzeb ajej odświezać
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      if(response){
        const res: Photo=JSON.parse(response);
        const photo={
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);

        if(photo.isMain){
          this.authService.changeUserPhoto(photo.url);
      this.authService.currentUser.photoUrl=photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=>{
      console.log('zdjecie ustawione jako główne');
      this.currentMain=this.photos.filter(p=>p.isMain === true)[0];
      this.currentMain.isMain=false;
      photo.isMain=true;
      this.authService.changeUserPhoto(photo.url);
      this.authService.currentUser.photoUrl=photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

    },error=>{
      this.alertify.error(error);
    });
  }

  deletePhoto(id:number){
    this.alertify.confirm('Czy napewno chcesz usunąć zdjęcie?',()=>{
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p=>p.id===id),1);
        this.alertify.success('Zdjęcie zosatło usunięte');
      },error=>{
        this.alertify.error('Nie udało się usunąć zdjęcia');
      })
    });
  }

}
