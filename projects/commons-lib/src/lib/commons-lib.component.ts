import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-commons-lib',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      commons-lib works!
    </p>
  `,
  styles: ``
})
export class CommonsLibComponent {

}
