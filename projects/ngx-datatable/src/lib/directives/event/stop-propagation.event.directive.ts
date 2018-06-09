import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[stopPropagationEvent]'
})
export class StopPropagationEventDirective {
	@HostListener("click", ["$event"]) onClick = (event: any): void => event.stopPropagation();
}
