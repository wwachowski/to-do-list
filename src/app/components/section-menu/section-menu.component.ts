import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Section } from 'src/app/data/models/section';

@Component({
  selector: 'app-section-menu',
  templateUrl: './section-menu.component.html',
  styleUrls: ['./section-menu.component.scss']
})
export class SectionMenuComponent implements OnInit {
  @Output() newSectionEvent = new EventEmitter<Section>();
  @Input() section?: Section;

  public sectionForm!: FormGroup;;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.sectionForm = this._createSectionForm();
  }

  public onSubmit(): void {
    if (this.sectionForm.invalid) return;
    this.newSectionEvent.emit(this._getWrappedSection());
  }

  private _createSectionForm(): FormGroup {
    const sectionForm = this._fb.group({
      title: this._fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern(/[\w]/)
        ]
      }),
      color: this._fb.control('', {
        validators: [
          Validators.required
        ]
      })
    });

    sectionForm.patchValue({
      title: this.section?.title || '',
      color: this.section?.color || '#000000'
    })

    return sectionForm;
  }

  private _getWrappedSection(): Section {
    return { ...this.section, ...this.sectionForm.value };
  } 
}