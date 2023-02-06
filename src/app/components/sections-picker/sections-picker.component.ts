import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Section } from 'src/app/data/models/section';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sections-picker',
  templateUrl: './sections-picker.component.html',
  styleUrls: ['./sections-picker.component.scss']
})
export class SectionsPickerComponent implements OnInit, OnDestroy {
  @ViewChild('menuTriggerRef') menu!: MatMenuTrigger;
  @Output('notifyEvent') newNotificationEvent = new EventEmitter<string>();
  @Output() newConfigEvent = new EventEmitter<TodoViewConfig>();
  public sectionForm!: FormGroup;
  public sections!: Array<Section>;
  private data$?: Observable<Array<Section>>;
  private unsub$ = new Subject<void>();

  ngOnInit(): void {
    this._setSections();
    this.newConfigEvent.emit({ filterSectionsIDs: this._getFilteredIDs() });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  constructor(private _fb: FormBuilder, private _user: UserService) { }

  public onEventEmit(newSection: Section): void {
    this.menu.closeMenu();

    const data$: Observable<boolean> = newSection.id
      ? this._user.updateSection(newSection) : this._user.addSection(newSection);

    data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    ).subscribe(res => {
      if (res) {
        this._setSections();
        this.newNotificationEvent.emit('Successfully updated');
        return;
      }
      this.newNotificationEvent.emit('Something went wrong');
    });
  }

  public onCheckboxToggle(section: Section) {
    const data$: Observable<boolean> = this._user.updateSection(section);

    data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    ).subscribe(_ => {
      this._setSections();
      this.newConfigEvent.emit({ filterSectionsIDs: this._getFilteredIDs() });
    });
  }

  private _getFilteredIDs(): Array<number> {
    const filteredList = this.sections.filter(sect => sect.visible).map(sect => sect.id);
    return filteredList ? filteredList as Array<number> : [];
  }

  private _setSections(): void {
    this.data$ = this._user.getSections();

    this.data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(res => this.sections = res);
  }
}
