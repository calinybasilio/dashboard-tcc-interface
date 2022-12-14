import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ErroInputComponent } from './erro-input.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ ErroInputComponent ],
    exports: [ ErroInputComponent ]
})
export class ErroInputModule {}