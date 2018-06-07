import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[stopPropagationClick]'
})
export class StopPropagationClickDirective {
	@HostListener("click", ["$event"])

	onClick = (event: any): void => event.stopPropagation();
}
