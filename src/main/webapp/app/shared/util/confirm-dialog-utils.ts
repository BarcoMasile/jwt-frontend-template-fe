import {Confirmation, PrimeIcons} from 'primeng/api';
import {TranslateWrapperService} from 'app/shared/service/translate-wrapper.service';

export class ConfirmDialogUtils {
  static message(event: Event, trans: TranslateWrapperService, info = 'profile-info'): Confirmation {
    return {
      target: event.target! ,
      message: trans.retrieve(`user.${info}.confirm-dialog`),
      icon: PrimeIcons.QUESTION_CIRCLE,
      acceptIcon: PrimeIcons.CHECK,
      acceptButtonStyleClass: 'btn btn-outline-primary confirm-button',
      rejectIcon: PrimeIcons.BAN,
      rejectButtonStyleClass: 'btn btn-outline-secondary confirm-button',
      accept: () => {},
      reject: () => {},
      key: 'confirm'
    }
  }

  static deleteMessage(event: Event, trans: TranslateWrapperService, info = 'profile-info'): Confirmation {
    return {
      target: event.target! ,
      message: trans.retrieve(`user.${info}.deletion.confirm-dialog`),
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptIcon: PrimeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'btn btn-danger confirm-button',
      rejectIcon: PrimeIcons.BAN,
      rejectButtonStyleClass: 'btn btn-outline-secondary confirm-button',
      accept: () => {},
      reject: () => {},
      key: 'deletion'
    }
  }
}
