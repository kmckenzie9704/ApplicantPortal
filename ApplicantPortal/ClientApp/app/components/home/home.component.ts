import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule , FormGroup, Validators } from "@angular/forms";
import { Http } from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})


export class HomeComponent {
    public SubmitResult = "";

    // //constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
    //    http.get(baseUrl + 'api/HomeController/FileUploadService').subscribe(result => {
    //        this.SubmitResult = result.toString();
    //        //this.forecasts = result.json() as WeatherForecast[];
    //    }, error => console.error(error));
    //}

    fileToUpload: File;

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.SubmitResult = "Yup, it worked";
    }
//    uploadFileToActivity() {
//        this.homecontrol.postFile(this.fileToUpload).subscribe(data => {
//    // do something, if upload success
//}, error => {
//    console.log(error);
//});
  //form: FormGroup;
   //loading: boolean = false;

   //@ViewChild('fileInput') fileInput: ElementRef;

   //constructor(private fb: FormBuilder) {
   //    this.createForm();
   //}

   //createForm() {
   //    this.form = this.fb.group({
   //        uniquecode: ['', Validators.required],
   //        photo: null
   //    });
   //}

   //onFileChange(event) {
   //    if (event.target.files.length > 0) {
   //        let file = event.target.files[0];
   //        this.form.get('photo').setValue(file);
   //    }
   //}

   //private prepareSave(): any {
   //    let input = new FormData();
   //    input.append('uniquecode', this.form.get('uniquecode').value);
   //    input.append('photo', this.form.get('photo').value);
   //    return input;
   //}

   //onSubmit() {
   //    const formModel = this.prepareSave();
   //    this.loading = true;
   //    // In a real-world app you'd have a http request / service call here like
   //    // this.http.post('apiUrl', formModel)
   //    setTimeout(() => {
   //        // FormData cannot be inspected (see "Key difference"), hence no need to log it here
   //        alert('done!');
   //        this.loading = false;
   //    }, 1000);
   //}

   //clearFile() {
   //    this.form.get('photo').setValue(null);
   //    this.fileInput.nativeElement.value = '';
   //}


    }

