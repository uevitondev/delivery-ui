import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  splitStringBySpaceAndJoinByIfenLower(stringValue: String) {
    return stringValue.split(' ').join('-').toLowerCase();
  }

  splitStringByIfenAndJoinBySpaceLower(stringValue: string) {
    return stringValue.split('-').join(' ').toLowerCase();
  }
}
