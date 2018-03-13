import {
    Component, 
    OnInit,
    ChangeDetectorRef,
    Inject,
    Injectable,
    ViewChild
} from '@angular/core';
//import {
//    FormBuilder,
//    FormControl,
//    FormGroup,
//    ReactiveFormsModule,
//    Validators
//} from "@angular/forms";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

import {
    Applicant
} from '../../models/applicant';
import {
    UniqueCode
} from '../../models/uniquecode';

import {
    Router
} from '@angular/router';
import { Http, Headers, RequestOptions  } from '@angular/http';

@Component({
    selector: 'app-addapplicant',
    templateUrl: './addapplicant.component.html',
    styleUrls: ['./addapplicant.component.css']
})

@Injectable()
export class AddApplicantComponent implements OnInit {

    model = {
        appId: -999,
        appFirstName: '',
        appLastName: '',
        appBirthdate: '',
        appUniqueCode: '',
        appStatus: '',
        appFilename: '',
        appEmail: '',
        appImage: '',
        appGoodCode: ''
    };

    path = '';
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    private validateUrl: string;
    private uploadUrl: string;
    public thisUniqueCode: UniqueCode[];



    constructor(private changeDetectorRef: ChangeDetectorRef, public _route: Router, private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.validateUrl = baseUrl + '/api/Applicant/ValidateUniqueCode';
        this.uploadUrl = baseUrl + '/api/Applicant/CreateApplicant';
    }


    ngOnInit() { }


    appUniqueCodeChange() {
        const headerDict = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        const requestOptions = {
            headers: new Headers(headerDict),
        };

        var body = JSON.stringify(this.model);
        this.http.post(this.validateUrl, body, requestOptions)
            .subscribe(data => {
                this.thisUniqueCode = data.json() as UniqueCode[];
                let uni = this.thisUniqueCode[0];
                this.model.appGoodCode = uni.uniCode;
                this.model.appEmail = uni.uniEmail;
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }


    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

     private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    fileChange(input: any) {
        let file = input.files[0];
        this.model.appFilename = file.name;
        this.readFiles(input.files);
    }
    readFile(file: any, reader: any, callback: any) {
        reader.onload = () => {
            callback(reader.result);
            this.model.appImage = reader.result;
            //this.model.filename = file;
            console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }
    readFiles(files: any, index = 0) {
        // Create the file reader  
        let reader = new FileReader();
        // If there is a file  
        if (index in files) {
            // Start reading this file  
            this.readFile(files[index], reader, (result: any) => {
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");
                img.src = result;
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 250, 250, (resized_jpeg: any, before: any, after: any) => {
                    // For debugging (size in bytes before and after)  
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    this.file_srcs.push(resized_jpeg);
                    // Read the next file;  
                    this.readFiles(files, index + 1);
                });
            });
        } else {
            // When all files are done This forces a change detection  
            this.changeDetectorRef.detectChanges();
        }
    }
    resize(img: any, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
        // This will wait until the img is loaded before calling this function  
        return img.onload = () => {
            // Get the images current width and height  
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)  
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object  
            var canvas = document.createElement("canvas");
            // Set the canvas to the new calculated dimensions  
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            if(ctx != null) 
                ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg  
            // IMPORTANT: 'jpeg' NOT 'jpg'  
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results  
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }



    applicantSubmit() {

        const headerDict = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        const requestOptions = {
            headers: new Headers(headerDict),
        };

        var body = JSON.stringify(this.model);
        this.http.post(this.uploadUrl, body, requestOptions)
            .subscribe(data => {
                //this.model.valid_upload = data = data.json();
                this._route.navigate(['/home']);
            }, error => {
                console.log(JSON.stringify(error.json()));
            });

        //this.addApplicant(this.model).subscribe(
        //    (data: any) => {
        //        this._route.navigate(['/allApplicant']);
        //    },
        //    function (error) {
        //        console.log(error);
        //    },
        //    function () {
        //        console.log("On Complete");
            }
}

