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
  public configForm!: FormGroup;
  private _config!: TodoViewConfig;
  private _unsub$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private _todoViewConfig: TodoViewConfigService) { }

  ngOnInit(): void {
    this._setupConfig();
    this.configForm = this._createForm();
    this._configureForm();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private _setupConfig(): void {
    this._todoViewConfig.config$
      .pipe(takeUntil(this._unsub$))
      .subscribe(newConfig => {
        this._config = newConfig;
      });
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      date: this._fb.control(this._config.date),
      showDone: this._fb.control(this._config.showDone),
      sortOpt: this._fb.control(this._config.sortOpt)
    });
  }

  private _configureForm(): void {
    this.configForm.valueChanges.pipe(
      takeUntil(this._unsub$)
    ).subscribe(newConfig => {
      this._todoViewConfig.setConfig({...this._config, ...newConfig});
    });
  }
}