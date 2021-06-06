import {flatten} from '@angular/compiler';

export class StringUtils {

  static capitalizeName(...names: string[]): string {
    return flatten(names.map(el => el.split(/\s+/)))
      .map(el => `${el.charAt(0).toUpperCase()}${el.substr(1).toLowerCase()}`)
      .join(' ');
  }

  static validEmail(email: string): boolean {
    return (email.match(/.+@.+\..+/) || []).length > 0;
  }

  static validPhoneNumber(phone: string): boolean {
    return this.trimPhoneNumber(phone).length >= 10;
  }

  static trimPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '').replace(/_/g,'')
  }
}
