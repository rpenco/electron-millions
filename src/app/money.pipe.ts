import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  /**
   * Formate le nombre en devise (€)
   * @param value
   * @param args
   * @returns {string}
   */
  transform(value: number, args?: any): any {
    let formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }

}
