import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {

  @Input() label : string;
  @Input() maxDate: Date;
  bsConfig?: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-green';
  constructor(@Self() public ngControl : NgControl) 
  {
    this.ngControl.valueAccessor = this;
    this.bsConfig = 
    {
      containerClass:'theme-green',
      dateInputFormat:'DD MMMM YYYY'
    }
   }

   applyTheme(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      pop.show();
    });
  }


  writeValue(obj: any): void 
  {
    
  }
  registerOnChange(fn: any): void 
  {
    
  }
  registerOnTouched(fn: any): void 
  {
    
  }


  ngOnInit(): void 
  {
  }

}
