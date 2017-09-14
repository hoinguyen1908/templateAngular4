import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Logger } from './service/logger/loger-service.service';
import { I18nService } from  './service/translation/i18n-service.service'
import {SocketService} from "./service/socket/socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass']
})
export class AppComponent {
  title = 'app';
  currentRate = 8;

  constructor (private i18nService: I18nService) { }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    // SocketService.getInstance().connect();

    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
  }
}
