import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Logger} from "../../service/logger/loger-service.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms"
import {fadeInAnimation} from "../../extension/animation/fadein.animation"
import {HttpRequestService} from "../../service/http/http-request.service";

import {Broadcaster} from "../../service/broadcaster/broadcaster.service"
import {AuthDataModelService} from "../../data-model/auth-data-model.service";
import {OtpDataModelService} from "../../data-model/otp-data-model.service";

const log = new Logger("Login");

enum VALIDATION_TYPE {
  OTP,
  LOGIN
}

enum ERROR_TYPE {
  USER_PASS_INVALID,
  USER_IS_BANNED,
  OTP_INVALID,
  FORCE_LOGOUT
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginForm: FormGroup;
  private OTPForm: FormGroup;
  private username: String;
  private password: String;
  private otpCode: String;
  private messageLogin: any;
  private messageOTP: any;

  private phoneNumber: string

  private isRequestOTP: boolean;
  private isLoginSuccess: boolean;
  private isShowOTPScreen: boolean = false;

  private loginError: ERROR_TYPE;
  private otpError: ERROR_TYPE;
  private retrytime: number;
  private retrytimeOTP: number;
  private countdownResend: number = 0;

  private ERROR_TYPE = ERROR_TYPE;

  private timeInterval


  constructor(private fb: FormBuilder, private httpReqService: HttpRequestService, private router: Router) {
    this.isShowOTPScreen = false;
  }

  ngOnInit() {

    this.timeInterval = setInterval(() => {
      if (this.countdownResend > 0) {
        this.countdownResend--;
      }
    }, 1000);

    this.isRequestOTP = false;
    this.isLoginSuccess = false;


    //Message from socket service
    this.messageLogin = Broadcaster.getInstance().on("msg_otp")
      .subscribe(code => {
        log.debug(code)
        this.loginValidation(VALIDATION_TYPE.OTP, code)
      })
    this.messageOTP = Broadcaster.getInstance().on("msg_login")
      .subscribe(code => {
        log.debug(code)
        this.loginValidation(VALIDATION_TYPE.LOGIN, code)
      })

    //build form
    this.buildLoginForm();
    this.buildOTPForm();
  }

  ngOnDestroy() {
    this.messageLogin.unsubscribe();
    this.messageOTP.unsubscribe();
    clearInterval(this.timeInterval);
  }


  // build form validation
  // login form
  buildLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  // OTP form
  buildOTPForm() {
    this.OTPForm = this.fb.group({
      otpCode: [{
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(4), Validators.pattern("[a-z0-9]{4}")]],
    })
  }


  // ACTION
  //submit username and password
  submitLogin(event) {
    console.log(event);
    this.refreshError();
    event.preventDefault(); // cancel event submit and reload page

    //Disable request for demo function
    this.httpReqService.login(this.username, this.password);
    return false;
  }

  // submit OTP
  submitOTP(event) {
    event.preventDefault(); // cancel event submit and reload page
    this.httpReqService.submitOtp(this.otpCode);
  }

  //resend OTP
  resendOTP() {
    event.preventDefault();
    this.countdownResend = 60;
    this.httpReqService.resendOTP();
  }

  // refresh form error
  refreshError() {
    this.loginError = null;
  }

  refreshForm() {
    this.loginError = null;
    this.otpError = null;
    this.isRequestOTP = false;
    this.isLoginSuccess = false;
    this.isShowOTPScreen = false;
    this.username = null;
    this.password = null;
    this.loginForm.reset();
    this.OTPForm.reset();
  }


//  CHECK VALIDATION FOR NEXT STEP
//  check login success and otp code
  loginValidation(type: VALIDATION_TYPE, code) {

    log.debug("validation login");
    switch (type) {
      case VALIDATION_TYPE.OTP: {
        switch (code) {
          case 298: {
            this.isRequestOTP = true;
            break;
          }
          case 299: { // OTP Success - complete login
            this.router.navigate(['/home']);
            break;
          }
          case 4031: {
            this.retrytimeOTP = OtpDataModelService.getInstance().getRetrytime();
            if (this.retrytimeOTP > 0) {
              this.otpError = ERROR_TYPE.OTP_INVALID;
            }
            else {
              this.otpError = ERROR_TYPE.FORCE_LOGOUT;
            }

          }
        }
        break;
      }
      case VALIDATION_TYPE.LOGIN: {
        switch (code) {
          case 200: {
            this.isLoginSuccess = true;
            break;
          }
          case 4020: {
            this.loginError = ERROR_TYPE.USER_PASS_INVALID;
            this.retrytime = 2;
            break;
          }

          case 4021: {
            this.loginError = ERROR_TYPE.USER_IS_BANNED;
            break;
          }
        }
        break;
      }
    }

    log.debug(this.isRequestOTP);
    log.debug(this.isLoginSuccess);

    if (this.isRequestOTP && this.isLoginSuccess) {
      log.debug("go here");
      this.isShowOTPScreen = false;

      this.phoneNumber = OtpDataModelService.getInstance().getPhone();

    }

  }


}
