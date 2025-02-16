    const { BusinessPermit } = require('../index/models');
    const path = require('path');
    const fs = require('fs');
    const PDFDocument = require('pdfkit');
    const { v4: uuidv4 } = require('uuid');
    
    // Define the directory where work permit PDFs will be stored
    const receiptsDir = path.join(__dirname, '../documents/receipts');
    
    // Ensure the directory exists
    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir, { recursive: true });
    }
    
    // Function to generate Statement of Account PDF
    const generateStatementofAccount = (ContentData, BusinessPermitContent) => {
        const doc = new PDFDocument();
        const receiptFileName = `statementofaccount_${Date.now()}.pdf`;
        const receiptPath = path.join(receiptsDir, receiptFileName);
    
        const writeStream = fs.createWriteStream(receiptPath);
        doc.pipe(writeStream);
        doc.fontSize(25).text('Statement of Account', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
        doc.text(`Receipt ID: ${uuidv4()}`);
        doc.text(`Business Owner: ${BusinessPermitContent.owner.lastname} ${BusinessPermitContent.owner.firstname}`);
        doc.text(`Business Permit ID: ${BusinessPermitContent.id}`);
        doc.text(`Mode of Payment: ${BusinessPermitContent.business.paymentmethod}`);
        doc.moveDown();
        doc.text(`Total Amount: ₱${ContentData.total}`, { bold: true });
        doc.end();
    
        return receiptFileName;
    };

    module.exports = {generateStatementofAccount};
    