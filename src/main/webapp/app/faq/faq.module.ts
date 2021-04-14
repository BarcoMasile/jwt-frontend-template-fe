import {NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {FaqComponent} from './faq.component';
import {RouterModule} from '@angular/router';
import {FAQ_ROUTES} from 'app/faq/faq.route';


@NgModule({
  imports: [RouterModule.forChild(FAQ_ROUTES)],
  declarations: [FaqComponent]
})
export class FaqModule { }
