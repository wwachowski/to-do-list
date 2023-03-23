import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

import { Section } from 'src/app/data/models/section';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { UserService } from 'src/app/services/user.service';
import { TodoViewConfigService } from 'src/app/services/todo-view-config.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sections-picker',
  templateUrl: './sections-picker.component.html',
  styleUrls: ['./sections-picker.component.scss']
})
export class SectionsPickerComponent implements OnInit, OnDestroy {
  @ViewChild('menuTriggerRef') menu!: MatMenuTrigger;
  public sections: Array<Section> = [];
  private _config!: TodoViewConfig;
  private unsub$ = new Subject<void>();

  constructor(
    private _user: UserService,
    private _todoViewConfig: TodoViewConfigService,
    private _notification: NotificationService) {
    this._todoViewConfig.config$
      .pipe(takeUntil(this.unsub$))
      .subscribe(newConfig => {
        this._config = newConfig;
      });
  }

  ngOnInit(): void {
    this._getSections();
    // this._todoViewConfig.setConfig();
    // this.newConfigEvent.emit({ filterSectionsIDs: this._getFilteredIDs() });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public onEventEmit(newSection: Section): void {
    this.menu.closeMenu();

    const data$: Observable<boolean> = newSection.id
      ? this._user.updateSection(newSection) : this._user.addSection(newSection);

    data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of(false);
      }))
      .subscribe(res => {
        if (res) {
          this._notification.notify('Successfully updated');
          this._getSections();
          return;
        }
        this._notification.notify('Something went wrong');
      });
  }

  public onCheckboxToggle(section: Section) {
    const filteredIDs = this.sections.filter(sect => sect.visible).map(sect => sect.id!);
    this._config.filterSectionsIDs = filteredIDs;
    this._todoViewConfig.setConfig(this._config);
    this._user.updateSection(section)
      .pipe(
        takeUntil(this.unsub$),
        catchError(err => {
          console.error(err);
          return of(false);
        })
      ).subscribe(_ => {
        // this.newConfigEvent.emit({ filterSectionsIDs: filteredIDs });
      });
  }

  private _getSections(): void {
    this._user.getSections().pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(res => this.sections = res);
  }
}
