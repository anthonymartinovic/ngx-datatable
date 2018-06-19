export class DT_Styles {
	template: { use: boolean, layout: 'flex' | 'grid' | 'none', theme: 'basic' | 'qww-s' | 'none' };
	header: { height: string };
	content: { headHeight: string, groupRowHeight: string, rowHeight: string };
	footer: { height: string };

	constructor
	(styles: {
		template?: { use: boolean, layout: 'flex' | 'grid' | 'none', theme: 'basic' | 'qww-s' | 'none' },
		header?: { height: string },
		content?: { headHeight: string, groupRowHeight: string, rowHeight: string },
		footer?: { height: string }
	})
	{
		this.template = (styles.template) ? styles.template : { use: true, layout: 'flex', theme: 'basic' };
		this.header   = (styles.header) ? styles.header : { height: '50px' };
		this.content  = (styles.content) ? styles.content : { headHeight: '40px', groupRowHeight: '30px', rowHeight: '30px' };
		this.footer   = (styles.footer) ? styles.footer : { height: '40px' };
	}
}