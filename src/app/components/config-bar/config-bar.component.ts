import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';

@Component({
  selector: 'app-config-bar',
  templateUrl: './config-bar.component.html',
  styleUrls: ['./config-bar.component.css']
})
export class ConfigBarComponent implements OnInit, OnDestroy {
  @Input() date!: Date;
  @Output() newConfigEvent = new EventEmitter<TodoViewConfig>();
  public configForm!: FormGroup;
  private unsub$ = new Subject<void>();

  ngOnInit(): void {
    this.configForm = this.createForm();
    this._configureForm();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private createForm(): FormGroup {
    return this.configForm = new FormGroup({
      date: new FormControl(this.date),
      showDone: new FormControl(false),
      sortOpt: new FormControl('asc')
    });
  }

  private _configureForm(): void {
    this.configForm.valueChanges.pipe(
      takeUntil(this.unsub$)
    ).subscribe(newConfig => {
      this.newConfigEvent.emit(newConfig);
    });
  }
}