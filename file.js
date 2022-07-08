 
const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ margin: 50 });

	generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}
function generateHeader(doc) {
	doc.image('logo.png', 50, 35, { width:100 })
		.fillColor('#444444')
		.fontSize(20)
		.text('BOTOFFICE.LTD', 160, 37)
		.fontSize(10)
		.text('7, SAHEED OLA ADELEKAN', 60, 190, { align: 'left' })
		.text(' CITY : LEKKI PHASE 1',60 , 200, { align: 'left' }) 
		.text(' INVOICE : INV00066958', 60, 210, { align: 'left'})
		.text(' DATE : July 7, 2022', 60, 220, { align: 'left'})
		.moveDown();
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	doc.fontSize(10)
		.text(c1, 50, y, {width: 90, align: 'right'})
		.text(c2, 150, y, {width: 90, align: 'right'})
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(c4, 370, y, { width: 90, align: 'right' })
		.text(c5, 0, y, { align: 'right' });
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		600,
		{ align: 'left', width: 500 },
	);
}
function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;

	doc.text(`Invoice Number: ${invoice.invoice_nr}`, 60, 120, {align: 'left'}) 
		.text(`Invoice Date: ${new Date()}`, 60, 140, { align: 'left'})
		.text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 60, 180, { align: 'left'})
        .moveDown()

		.text(shipping.name, 170, 60, )
		.text(shipping.address, 170, 70,)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}, ${shipping.info}`,
			170, 80, { align: 'left'}
			
		)
		.moveDown();
}


function generateInvoiceTable(doc, invoice) {
	let i,
		invoiceTableTop = 330;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.item,
			item.description,
			item.amount / item.quantity,
			item.quantity,
			item.amount,
		);
	}
}
module.exports = {
	createInvoice
};