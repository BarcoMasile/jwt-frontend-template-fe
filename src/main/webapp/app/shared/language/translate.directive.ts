import { Input, Directive, ElementRef, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { translationNotFoundMessage } from 'app/config/translation.config';

/**
 * A wrapper directive on top of the translate pipe as the inbuilt translate directive from ngx-translate is too verbose and buggy
 */
@Directive({
  selector: '[arpaTranslate]',
})
export class TranslateDirective implements OnChanges, OnInit, OnDestroy {
  @Input() arpaTranslate!: string;
  @Input() translateValues?: { [key: string]: unknown };
  @Input() anchor?: boolean = false;
  @Input() samePage: boolean = false;

  private readonly directiveDestroyed = new Subject<never>();

  constructor(private el: ElementRef, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.directiveDestroyed)).subscribe(() => {
      this.getTranslation();
    });
  }

  ngOnChanges(): void {
    this.getTranslation();
  }

  ngOnDestroy(): void {
    this.directiveDestroyed.next();
    this.directiveDestroyed.complete();
  }

  private getTranslation(): void {
    this.translateService
      .get(this.arpaTranslate, this.translateValues)
      .pipe(takeUntil(this.directiveDestroyed))
      .subscribe(
        value => {
          if (this.anchor) {
            this.el.nativeElement.setAttribute('href', value);
            if(!this.samePage) {
              this.el.nativeElement.setAttribute('target', '_blank');
            }
          } else {
            this.el.nativeElement.innerHTML = value;
          }
        },
        () => `${translationNotFoundMessage}[${this.arpaTranslate}]`
      );
  }
}
