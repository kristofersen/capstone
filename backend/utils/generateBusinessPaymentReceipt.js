const { BusinessPermit } = require('../index/models');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');

// Define the directory where work permit PDFs will be stored
const businessReceiptsDir = path.join(__dirname, '../documents/receipts');

// Ensure the directory exists
if (!fs.existsSync(businessReceiptsDir)) {
    fs.mkdirSync(businessReceiptsDir, { recursive: true });
}

const generateBusinessPaymentReceipt = async (id) => {
    const doc = new PDFDocument();
    const receiptFileName = `businesspermit_receipt_${id}.pdf`;
    const receiptPath = path.join(businessReceiptsDir, receiptFileName);

        try {
            // Fetch the work permit data by ID
            const businessPermit = await BusinessPermit.findById(id);
      
            if (!businessPermit) {
                throw new Error('Business permit not found');
            }
      
            const writeStream = fs.createWriteStream(receiptPath);
            doc.pipe(writeStream);
            doc.fontSize(25).text('Official Receipt', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
            doc.text(`Receipt ID: ${uuidv4()}`);
            doc.text(`Business Owner: ${businessPermit.owner.lastname} ${businessPermit.owner.firstname}`);
            doc.text(`Business Permit ID: ${businessPermit.id}`);
            doc.text(`Mode of Payment: ${businessPermit.business.paymentmethod}`);
            doc.moveDown();
            doc.text(`Total Amount: ₱${businessPermit.totaltax}`, { bold: true });
          
      
            doc.end();
      
            console.log(`BusinessPermitReceipt PDF created at ${receiptFileName}`);
      
            return receiptFileName;  // Return the path to the generated PDF
        } catch (error) {
            console.error('Error generating BusinessPermitReceipt PDF:', error);
            throw error;
        }

};

module.exports = {generateBusinessPaymentReceipt};