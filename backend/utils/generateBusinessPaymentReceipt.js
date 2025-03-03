const { BusinessPermit } = require('../index/models');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const streamBuffers = require('stream-buffers');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const generateBusinessPaymentReceipt = async (id) => {
    try {
        const businessPermit = await BusinessPermit.findById(id);
        if (!businessPermit) {
            throw new Error('Business permit not found');
        }

        // Create a PDF document in memory
        const doc = new PDFDocument();
        const bufferStream = new streamBuffers.WritableStreamBuffer({
            initialSize: (100 * 1024), // 100KB
            incrementAmount: (10 * 1024) // 10KB
        });

        doc.pipe(bufferStream);
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

        // Wait for the buffer to be filled
        await new Promise((resolve) => bufferStream.on('finish', resolve));
        const pdfBuffer = bufferStream.getContents();

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'raw', format: 'pdf' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(pdfBuffer);
        });

        console.log(`Business Permit Receipt uploaded to Cloudinary: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error('Error generating Business Permit Receipt PDF:', error);
        throw error;
    }
};

module.exports = { generateBusinessPaymentReceipt };



