const {createInvoice} = require("./file")
const invoice = {
	shipping: {
		
	
	
		
		postal_code:'94111',
		info:'info@botoffice.com'
	},
	items: [
		{
			description: 'APPLE STORES',
			quantity: 2,
			amount: 6000,
		},
		
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};

createInvoice(invoice, "BOTOFFICE.pdf")

















