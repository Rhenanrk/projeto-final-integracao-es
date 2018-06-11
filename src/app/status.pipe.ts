import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'new':
        return 'Novo';
      case 'running':
        return 'Executando';
      case 'finished':
        return 'Finalizado';
      case 'canceled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }

}
