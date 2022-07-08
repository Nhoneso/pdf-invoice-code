const {createInvoice} = require("./file")
const invoice = {
	shipping: {
		name:('EJIOFOR NONSO OLUSEGUN'),
		address:'22B IBILE CLOSE',
		city:'LEKKI PHASE 1',
		state:'LAGOS',
		country: 'NIGERIA',
		postal_code:'94111',
		info:'info@botoffice.com'
	},
	items: [
		{
			item: 'TC 100',
			description: 'Toner Cartridge',
			quantity: 2,
			amount: 6000,
		},
		{
			item: 'USB_EXT',
			description: 'USB Cable Extender',
			quantity: 1,
			amount: 2000,
		},
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};

createInvoice(invoice, "BOTOFFICE.pdf")

















