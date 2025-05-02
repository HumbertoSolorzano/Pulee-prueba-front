import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { HeaderComponent } from "./componentes/header/header.component";
import { FooterComponent } from "./componentes/footer/footer.component";
import { ToastComponent } from "./componentes/toast/toast.component";
import { GraphicComponent } from "./Graphics/graphic/graphic.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent, GraphicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pulee';
}
