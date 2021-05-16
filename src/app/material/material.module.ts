import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthComponent } from "../auth/auth/auth.component";


const modules = [
  MatProgressSpinnerModule
]

@NgModule({
  imports: [...modules],
  exports: [...modules]
})

export class MaterialModule {}
