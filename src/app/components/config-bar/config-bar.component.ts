import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { TodoViewConfigService } from 'src/app/services/todo-view-config.service';

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.scss']
})
export class ConfigBarComponent implements OnInit, OnDestroy {
  public configForm: FormGroup;
  private _config: TodoViewConfig;
  private _unsub$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private _todoViewConfig: TodoViewConfigService) { }

  ngOnInit(): void {
    this._initTodoConfig();
    this.configForm = this._createForm();
    this._initFormConfig();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      date: this._fb.control(this._config.date),
      showDone: this._fb.control(this._config.showDone),
      sortOpt: this._fb.control(this._config.sortOpt)
    });
  }

  private _initTodoConfig(): void {
    this._todoViewConfig.config$
      .pipe(takeUntil(this._unsub$))
      .subscribe(config => {
        this._config = config;
      });
  }

  private _initFormConfig(): void {
    this.configForm.valueChanges.pipe(
      takeUntil(this._unsub$)
    ).subscribe(config => {
      this._todoViewConfig.setConfig({ ...this._config, ...config });
    });
  }
}