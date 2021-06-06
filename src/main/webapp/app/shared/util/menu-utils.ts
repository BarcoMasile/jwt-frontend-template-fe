import {MenuItem} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';

export class MenuUtils {

  static setActiveMenuItem(path: string, menu: MenuItem[], activatedMenuMap: any): MenuItem {
    if (!path) {
      return menu[0];
    }

    const id: string = activatedMenuMap[path!];
    return menu.filter(el => el.id === id)[0];
  }

  static route(ar: ActivatedRoute): string {
    return ar.children[0].snapshot?.routeConfig?.path!;
  }
}
