/* eslint-disable */
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeIn, fadeAnimation } from '../animations/animations';
import { AppConfigService } from '../appconfig/appconfig.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { QuestionBase } from '../dynamic-form/models/question-base';

import { Observable } from 'rxjs';
import { NewQuestionService } from '../_services/new-question/new-question.service';
import { LogClaimGenerationStatService } from '../_services/log-claim-generation-stat/log-claim-generation-stat.service';

@Component({
  selector: 'app-claim-information',
  templateUrl: './claim-information.component.html',
  styleUrls: ['./claim-information.component.css'],
  providers: [NewQuestionService],
  animations: [fadeIn, fadeAnimation]
})
export class ClaimInformationComponent implements OnInit, AfterViewInit {
  questions$: Observable<QuestionBase<any>[]>;
  loading = true;
  details = {
    appVersion: '',
    contractNumber: '',
    deviceMake: '',
    deviceModel: '',
    deviceOs: '',
    guid: '',
    userId: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appConfig: AppConfigService,
    private logClaimGenerationStatService: LogClaimGenerationStatService,
    service: NewQuestionService
  ) {
    this.questions$ = service.getQuestions();
    this.loading = true;
  }

  ngOnInit(): void {
    localStorage.removeItem('partNumber');
    const details = this.details;
    this.logClaimGenerationStatService.addLogClaimGenerationStat(details)
      .subscribe()
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }
}
