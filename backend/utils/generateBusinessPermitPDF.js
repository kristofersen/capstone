const { BusinessPermit } = require('../index/models');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Define the directory where work permit PDFs will be stored
const businessPermitsDir = path.join(__dirname, '../documents/permits');

// Ensure the directory exists
if (!fs.existsSync(businessPermitsDir)) {
    fs.mkdirSync(businessPermitsDir, { recursive: true });
}

const generateBusinessPermitPDF = async (ContentData, permitNumber) => {
    const doc = new PDFDocument();
    const businessPermitFileName = `businessPermit_${ContentData}.pdf`; // File name based on the ID
    const businessPermitPath = path.join(businessPermitsDir, businessPermitFileName);
  
    try {
      // Fetch the business permit data by ID
      const businessPermit = await BusinessPermit.findById(ContentData);
  console.log(ContentData);
      if (!businessPermit) {
        throw new Error('Work permit not found');
      }
  

      const writeStream = fs.createWriteStream(businessPermitPath);
      doc.pipe(writeStream);
  
      // Header Content
      doc.fontSize(14).text('Republic of the Philippines', { align: 'center' });
      doc.text('Province of Cavite', { align: 'center' });
      doc.text('CITY OF DASMARIÑAS', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text('Business Permit and Licensing Office', { align: 'center', underline: true });
      doc.fontSize(18).text('BUSINESS PERMIT', { align: 'center' });
  
      doc.moveDown(2);
  
      // Body Content
      doc.fontSize(10).text(
        `In accordance with the provision of the City Ordinance No. 1 Series of 2024 as amended 
  under the provisions of RA 7160 of the City of Dasmariñas, Cavite and after having 
  satisfied the requirements provided therein, Business Permit to operate is hereby granted 
  to the name listed below, in the City of Dasmariñas, Cavite, subject to the Rules and 
  Regulation prescribed in said Ordinance and in all existing laws applicable thereto.`
      );
  
      doc.moveDown(2);
  
      // Business Details
      doc.text(`Business Name: ${businessPermit.name || 'N/A'}`);
      doc.text(`Location: ${businessPermit.location || 'N/A'}`);
      doc.text(`Taxpayer Name: ${businessPermit.owner?.fullname || 'N/A'}`);
      doc.text(`Business Class: ${businessPermit.classification || 'N/A'}`);
      doc.moveDown(2);
  
      // Table Headers
      const tableHeaders = [
        'Description', 'Tax Base', 'Amount', 'Surcharge',
        '1st Qtr.', '2nd Qtr.', '3rd Qtr.', '4th Qtr.'
      ];
  
      const rowData = ['Sample Desc', '1000', '500', '50', '125', '125', '125', '125'];
      const columnWidth = 60;
  
      // Render Table Headers
      tableHeaders.forEach((header, index) => {
        doc.text(header, 50 + index * columnWidth, doc.y, { width: columnWidth, align: 'center' });
      });
  
      doc.moveDown(1);
  
      // Render Table Data
      rowData.forEach((data, index) => {
        doc.text(data, 50 + index * columnWidth, doc.y, { width: columnWidth, align: 'center' });
      });
  
      doc.moveDown(3);
  
      // Footer (City Mayor Signature)
      doc.text('___________________________________', { align: 'left' });
      doc.text('Jennifer Austria - Barzaga', { align: 'left' });
      doc.text('City Mayor', { align: 'left' });
  
      doc.end();
  
      console.log(`Work Permit PDF created at ${businessPermitPath}`);
  
      return businessPermitFileName; // Return the file name
    } catch (error) {
      console.error('Error generating work permit PDF:', error);
      throw error;
    }
  };

  module.exports = {generateBusinessPermitPDF};