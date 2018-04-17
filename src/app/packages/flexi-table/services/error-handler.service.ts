import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
	handleError(error) {
		console.log(error);
		throw new Error(error);
	}
}

//Insert into 'ngx-flexi-table.module.ts' when ready
// {
// 	provide: ErrorHandler, 
// 	useClass: GlobalErrorHandler
// }
