const { WorkPermit } = require('../index/models');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Define the directory where work permit PDFs will be stored
const workPermitsDir = path.join(__dirname, '../documents/permits');

// Ensure the directory exists
if (!fs.existsSync(workPermitsDir)) {
    fs.mkdirSync(workPermitsDir, { recursive: true });
}

const generateWorkPermitPDF = async (id) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    
    const workPermitFileName = `workpermit_${id}.pdf`;
    const workPermitPath = path.join(workPermitsDir, workPermitFileName);
    const workPermit = await WorkPermit.findById(id);


    const placeOfEmployment = workPermit?.formData?.employmentInformation?.place || 'N/A';
    try {
        // Fetch the work permit data by ID
        const workPermit = await WorkPermit.findById(id);
        if (!workPermit) {
            throw new Error('Work permit not found');
        }

        // Create a write stream for the PDF
        const writeStream = fs.createWriteStream(workPermitPath);
        doc.pipe(writeStream);

        // Page 1 Left Column Content
        const leftColumnX = doc.page.margins.left + 20;
        let currentY = doc.page.margins.top + 20;

        doc.fontSize(15).text('EXPIRATION OF PERMIT', leftColumnX, currentY);
        currentY += 30;
        doc.fontSize(12).text(`Issuance date: ${new Date(workPermit.issueDate).toLocaleDateString()}`, leftColumnX, currentY);
        currentY += 20;
        doc.text(`Expiration date: ${new Date(workPermit.expirationDate).toLocaleDateString()}`, leftColumnX, currentY);
        currentY += 20;
        doc.text(`Place of employment: ${placeOfEmployment}`, leftColumnX, currentY);
        currentY += 40;

        doc.text(
            'Note: The occupation or calling fee shall be payable annually on or before the thirty-first (31st) day of January every year.',
            leftColumnX, currentY, { width: 280 }
        );
        currentY += 80;

        doc.text('Received by:', leftColumnX, currentY);
        doc.text('BPLO Clerk: ________________________', leftColumnX, currentY + 20);
        currentY += 60;
        doc.text('Recommending Approval:', leftColumnX, currentY);
        doc.text('Edith T. Herrera BPLO, CGDH1: _______________________', leftColumnX, currentY + 20);
        currentY += 60;

        doc.text('Amount: _________________', leftColumnX, currentY);
        doc.text('O.R No: ___________________', leftColumnX, currentY + 20);
        doc.text('Date: _____________________', leftColumnX, currentY + 40);

        // Page 1 Right Column Content
        const rightColumnX = doc.page.width / 2 + 20;
        currentY = doc.page.margins.top + 20;

        doc.fontSize(15).text('Province of Cavite', rightColumnX, currentY);
        currentY += 20;
        doc.text('City of Dasmariñas', rightColumnX, currentY);
        currentY += 20;
        doc.text('OFFICE OF THE MAYOR', rightColumnX, currentY);
        currentY += 20;
        doc.text('Business Permits and Licensing Office', rightColumnX, currentY);
        currentY += 40;

        doc.fontSize(20).text('OCCUPATION PERMIT', rightColumnX, currentY, { align: 'left' });
        currentY += 40;

        doc.fontSize(15).text(`_________________________`, rightColumnX, currentY);
        doc.text('(Holder/Permittee)', rightColumnX, currentY + 20);

        // Add a new page for more content
        doc.addPage({ size: 'A4', layout: 'landscape' });

        // Page 2 Left Column Content
        currentY = doc.page.margins.top + 20;

        doc.fontSize(12).text(
            'This is to certify that the person whose name and identification appear herein is duly permitted by this OFFICE to work as',
            leftColumnX, currentY, { width: 280 }
        );
        currentY += 40;
        doc.text('_______________________________________', leftColumnX, currentY);
        currentY += 20;
        doc.text('up to date specified in this permit', leftColumnX, currentY);
        currentY += 40;
        doc.text('APPROVED:', leftColumnX, currentY);
        currentY += 20;
        doc.text('HON. JENNIFER AUSTRIA-BARZAGA', leftColumnX, currentY);
        doc.text('City Mayor', leftColumnX, currentY + 20);
        currentY += 60;
        doc.text('REMARKS:', leftColumnX, currentY);

        // Page 2 Right Column Content
        currentY = doc.page.margins.top + 20;

        doc.text('Name: ____________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Nationality: _______________________________ Age: _______', rightColumnX, currentY);
        currentY += 20;
        doc.text('Civil Status: _______________________________ Sex: ________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Date of Birth: __________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Residence: ______________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('_________________________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Res. Certificate No.: _____________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Date Issued: ____________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Place Issued: ___________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('SSS No.: _______________________________________________', rightColumnX, currentY);
        currentY += 20;
        doc.text('Tax Identification: _______________________________________', rightColumnX, currentY);

        // Finalize the PDF
        doc.end();

        console.log(`Work Permit PDF created at ${workPermitFileName}`);
        return workPermitFileName;
    } catch (error) {
        console.error('Error generating work permit PDF:', error);
        throw error;
    }
};  

module.exports = generateWorkPermitPDF;