import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import {isNumber, padNumber, toInteger} from './number';
/**
* This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
*/
@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split(this.DELIMITER);
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return { day: toInteger(dateParts[0]), month: null, year: null };
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {
          day: toInteger(dateParts[0]),
          month: toInteger(dateParts[1]),
          year: null
        };
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {
          day: toInteger(dateParts[0]),
          month: toInteger(dateParts[1]),
          year: toInteger(dateParts[2])
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date
      ? `${date.year}${this.DELIMITER}${isNumber(date.month) ? padNumber(date.month) : ''}${this.DELIMITER}${isNumber(date.day) ? padNumber(date.day) : ''}`
      : '';
  }
}
