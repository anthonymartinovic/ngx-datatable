import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG } from '../assets/images';

@Injectable()
export class ImgService {
	
	constructor(private _sanitizer: DomSanitizer) {}

	getSVG(img): object {
		return this._sanitizer.bypassSecurityTrustHtml(SVG[img]);
	}
}
