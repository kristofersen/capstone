const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to generate Statement of Account PDF and upload to Cloudinary
const generateStatementofAccount = async (ContentData, BusinessPermitContent) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const receiptFileName = `statementofaccount_${Date.now()}.pdf`;

      // Create a buffer to store the PDF in memory
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);

          // Upload to Cloudinary
          const uploadResponse = await cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              folder: 'statements_of_account',
              public_id: receiptFileName
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary Upload Error:', error);
                return reject(error);
              }
              resolve(result.secure_url); // Return the Cloudinary URL
            }
          );

          uploadResponse.end(pdfBuffer);
        } catch (uploadError) {
          console.error('Error uploading PDF to Cloudinary:', uploadError);
          reject(uploadError);
        }
      });

      // Generate PDF content
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
    } catch (error) {
      console.error('Error generating statement of account PDF:', error);
      reject(error);
    }
  });
};

module.exports = { generateStatementofAccount };
