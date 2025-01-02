import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  splitAndJoinString(value: string, split: string, join: string) {
    return value.split(split).join(join).toLowerCase();
  }

}
