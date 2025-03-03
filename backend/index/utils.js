const generateUserId = require('../utils/generateUserId'); 
const generateWorkPermitID = require('../utils/generateWorkPermitID'); 
const {generateWorkPermitPDF} = require('../utils/generateWorkPermitPDF'); 
const generateBusinessPermitID = require('../utils/generateBusinessPermitID'); 
const { computeTax } = require('../utils/computeTax');
const { generateBusinessPermitPDF } = require('../utils/generateBusinessPermitPDF');
const { generateBusinessPermitNumber } = require('../utils/generateBusinessPermitNumber');
const { generateBusinessPaymentReceipt } = require('../utils/generateBusinessPaymentReceipt');
const { generateStatementofAccount } = require('../utils/generateStatementofAccount');

module.exports = {generateUserId,
    generateWorkPermitID,
    generateWorkPermitPDF,
    generateBusinessPermitID,
    generateBusinessPermitPDF,
    generateBusinessPermitNumber,
    generateBusinessPaymentReceipt,
    generateStatementofAccount,
    computeTax};