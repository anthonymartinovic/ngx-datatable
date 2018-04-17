import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

	constructor() {
		super();
	}

	handleError(errorMessage: string) {
		super.handleError(`:: HANDLER :: 'ngx-flexi-table' : ${errorMessage}`);
	}
}