 
const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 20, 35, { width: 130, height: 100})
    .fillColor("#444444")
    .fontSize(20)
    .text("BOTOFFICE.LTD.", 160, 37)
    .fontSize(10)
    .text("DATE:\n July 18, 2022.", 200, 40, { align: "right" })
    .text("INVOICE:\n INVO00066958", 200, 70, { align: "right" })
    .text("DUE:\n on Receipt ", 200, 100, { align: "right" })
    .text("BALANCE DUE:\n On Receipt...", 200, 130, { align: "right"})
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(10)
    .text("bills to: .", 50, 200)
    .fontSize(20)
    .text("UBA ZAMBIA LIMITED", 50, 220)
    .fontSize(10)
    .text("Stand 22768 , Thabo Mbeki Road Lusaka Zambia")


  generateHr(doc, 185);

  const customerInformationTop = (200,100)

  doc
    .fontSize(10)
    .text("BUSINESS NUMBER RC3457789", 160,57)
    .text("Lekki Phase 1", 160,117)
    .text("7, Saheed Ola Adelekan Close", 160, 77)
    .text("+2349017164283", 160 , 137)
    .text("info@botoffice.com", 160, 97)
    
    
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .font("Helvetica-Bold")
    .text("DETAILS ON ACCOUNT.", 50 , 480, {align: "left"})
    .fontSize(10)
    .text("ACCOUNT NUMBER: 2179757798", 50, 530 ,{align: "left"})
    .text("ACCOUNT NAME: BOTOFFICE LIMITED", 50, 550,{align: "left"})
    .text("TAX IDENTIFICATION NUMBER (TIN): 20674757-0001", 50, 570, {align: "left"});

    
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
