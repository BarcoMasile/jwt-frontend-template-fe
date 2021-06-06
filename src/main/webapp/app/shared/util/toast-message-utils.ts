import {Message, MessageService} from 'primeng/api';
import {TranslateWrapperService} from 'app/shared/service/translate-wrapper.service';

const LIFE_DURATION = 3500;

type ChildRoute = 'profile-info' | 'otp-manager' | 'session-manager';

export class ToastMessageUtils {

  static successToast(service: MessageService, trans: TranslateWrapperService, childRoute: ChildRoute, info?: string) {
    const message = trans.retrieve(this.key(childRoute, 'success', info))
    service.add(this.success(message));
  }

  static failureToast(service: MessageService, trans: TranslateWrapperService, childRoute: string, info?: string) {
    const message = trans.retrieve(this.key(childRoute, 'failure', info));
    service.add(this.failure(message));
  }

  static success(msg: string): Message {
    return { severity:'success', summary: 'Success', detail: msg, life: LIFE_DURATION };
  }

  static failure(msg: string): Message {
    return { severity:'error', summary: 'Error', detail: msg, life: LIFE_DURATION };
  }

  static key(childRoute: string, eventType: 'success' | 'failure', info?: string): string {
    return `user.${childRoute}.${eventType}-toast${info ? '.' : ''}${info ? info : ''}`
  }
}
