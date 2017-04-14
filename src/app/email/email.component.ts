import { Component } from '@angular/core';

// Service: Send-Email
import { EmailService } from "./email.service";

// Enables jQuery
declare var $:any;

@Component({
    selector: 'app-email',
    template: `
        <div class="container">
            <header class="text-center">
                <h1 class="font-dosis">
                    CONTACT
                </h1>
                <div class="divider half-margins onepage center"><!-- lines divider --></div>
            </header>

            <div class="text-center">
                <h4>Drop us a line or <strong>just say</strong> <em><strong>Hello!</strong></em></h4>
            </div>

            <!-- Form -->
            <form #contactForm="ngForm" (ngSubmit)="mdSend()" class="onepage block form-inline margin-top60">
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" placeholder="NAME *" class="fullwidth" 
                            name="contact_name"
                            required
                            [(ngModel)]="objUserDetails.strName"
                        />
                    </div>
                    <div class="col-md-4">
                        <input type="email" placeholder="EMAIL *" class="fullwidth" 
                            name="email"
                            required
                            [(ngModel)]="objUserDetails.strEmail"
                        />
                    </div>
                    <div class="col-md-4">
                        <input type="text" placeholder="SUBJECT" class="fullwidth" 
                            name="contact_subject"
                            [(ngModel)]="objUserDetails.strSubject"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <textarea rows="5" placeholder="MESSAGE *" class="fullwidth"
                            name="contact_comment"
                            required
                            [(ngModel)]="objUserDetails.strComment"
                        ></textarea>
                    </div>
                </div><!-- /row -->

                <div class="row space-bottom-20">
                    <div class="col-md-12">
                        <re-captcha 
                            (captchaResponse)="mdCaptchaHandle($event)" 
                            (captchaExpired)="mdCaptchaExpired()"
                            site_key="6LcuYRoUAAAAAGqLzlKy9DdCPfkipR1tLS3ejmtk"
                        ></re-captcha>
                    </div>
                </div><!-- /row -->

                <div class="row">
                    <div class="col-md-12">
                        <button id="contact_submit" type="submit" class="btn btn-primary"
                            [disabled]="contactForm.invalid || this.objUserDetails.googleResponse == null"
                        >Send it</button>
                    </div>
                </div><!-- /row -->
            </form>
        </div>
    `,
    styles: [``],
    providers: [EmailService]
})
export class EmailComponent {
    private objUserDetails;
    
    constructor(private emailService: EmailService) {
        this.objUserDetails = this.emailService.objSenderInfo;
    } // constructor

    mdSend() {
        document.getElementById("contact_submit").textContent = "Please Wait...";
        document.getElementById("contact_submit").classList.remove("btn-primary");
        document.getElementById("contact_submit").classList.add("btn-info");
        (<HTMLInputElement> document.getElementById("contact_submit")).disabled = true;

        // Attempt to send email.
        this.emailService.mdSendData(this.objUserDetails)
            .subscribe(data => {
                if (data.sent === "yes") {
                    // Success
                    document.getElementById("contact_submit").textContent = "Email Sent.  Thanks! :)";
                    document.getElementById("contact_submit").classList.remove("btn-info");
                    document.getElementById("contact_submit").classList.add("btn-success");
                    (<HTMLInputElement> document.getElementById("contact_submit")).disabled = true;
                } else {
                    // Something went wrong.
                    document.getElementById("contact_submit").textContent = "Please try again.";
                    document.getElementById("contact_submit").classList.remove("btn-info");
                    document.getElementById("contact_submit").classList.add("btn-danger");
                    (<HTMLInputElement> document.getElementById("contact_submit")).disabled = false;
                } // else
            }) // subscribe()
        ; // sendEmailService.mdSendData()
    } // mdSend()

    // Handle the captcha response and save to objUserDetails.captchaResponse
    mdCaptchaHandle(strResponse: string): void {
        this.objUserDetails.googleResponse = strResponse;
    } // mdCaptchaHandle(response)

    // Handles expired captchas.
    mdCaptchaExpired(): void {
        this.objUserDetails.googleResponse = null;
    }
}
