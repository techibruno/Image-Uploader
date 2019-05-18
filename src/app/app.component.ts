import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Image-Uploader';
  createForm: FormGroup
  imgUrl: any;
  images: any = [];
  selectedFile: File;

  constructor(private fb: FormBuilder, private _formService: FormService){}

  ngOnInit() {
    this.createForm = this.fb.group({
      Brand: [''],
      Model: ['']
    });
  }

  onSelectFile(event) {
    this.selectedFile = event.target.files[0];

    if(this.selectedFile){
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any) => 
      {
          this.imgUrl = reader.result;
          this.images.push(this.imgUrl);
      }
      
    }  
  }

  removeImage(img: any){
    const index: number = this.images.indexOf(img);
    if (index !== -1) {
      this.images.splice(index, 1);
  } 
  }

  onSubmit() {
    this._formService.save(this.createForm.value, this.images).subscribe(
      (response: any) =>
      {
        if (response > 0) {
          console.log("success! " + response);
        }
        else{
          console.log("error occured! " + response)
        }
      });
  }

}


