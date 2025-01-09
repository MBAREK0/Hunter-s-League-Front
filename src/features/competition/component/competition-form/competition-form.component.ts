  import {Component, EventEmitter, Input, Output} from '@angular/core';
  import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
  } from "@angular/forms";
  import { Competition } from "../../../../core/models/competition";
  import {CommonModule} from "@angular/common";
  import {SpeciesTypes} from "../../../../core/models/enums/species-types";
  import {ButtonLoaderComponent} from "../../../../shared/components/buttons/button-loader/button-loader.component";

  @Component({
    selector: 'app-competition-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonLoaderComponent],
    templateUrl: './competition-form.component.html'
  })
  export class CompetitionFormComponent {
    @Output() createCompetitionFormSubmit = new EventEmitter<Competition>();
    @Output() updateCompetitionFormSubmit = new EventEmitter<Competition>();

    createCompetitionForm: FormGroup;
    speciesTypes = Object.keys(SpeciesTypes);
    @Input() serverErrorMessage: string | null | undefined ;
    @Input() loading: boolean | undefined;
    @Input() formMode: 'create' | 'edit' = 'create'; // Default to "create"
    @Input() set competition(data: Competition | null) {
      if (data && this.formMode === 'edit') {

        this.createCompetitionForm.patchValue(data);
      }
    }


    constructor(private fb: FormBuilder) {
      this.createCompetitionForm = this.fb.group({
        id: [null],
        location: ['', Validators.required],
        date: ['', [Validators.required,this.futureDateValidator]],
        speciesType: ['', Validators.required],
        minParticipants: [0, [Validators.required, Validators.min(1)]],
        maxParticipants: [0, [Validators.required, Validators.min(1)]]
      });
    }

    onSubmit(): void {

      if (this.createCompetitionForm.valid && this.formMode === 'create') {

        this.createCompetitionFormSubmit.emit(this.createCompetitionForm.value);
      } else if (this.createCompetitionForm.valid && this.formMode === 'edit') {
        this.updateCompetitionFormSubmit.emit(this.createCompetitionForm.value);
      }
      else {
        this.serverErrorMessage = "Please fill in all required fields correctly.";
      }
    }
    futureDateValidator(control: AbstractControl): ValidationErrors | null {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate > today ? null : { invalidDate: true };
    }
  }
