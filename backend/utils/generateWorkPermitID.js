const { WorkPermit } = require('../index/models');

async function generateWorkPermitID(permitType) {
    const today = new Date();
    
    // Get the current date in DDMMYYYY format
    const year = today.getFullYear(); 
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${day}${month}${year}`;
  
    try {
        // Fetch the latest permit ID for the given permit type where the ID matches today's date exactly
        const latestPermit = await WorkPermit.findOne({
            permittype: permitType,
            id: { $regex: `^${permitType}\\d{4}${dateString}$` } // Match permits for today
        }).sort({ id: -1 }); // Sort to get the latest permit ID for today
  
        let sequenceNumber = 1; // Default to 1 if no permits exist for today
  
        if (latestPermit) {
            // Extract the sequence number from the latest permit ID
            const latestPermitID = latestPermit.id;
  
            // Use a regex to extract the 4-digit sequence part (assuming format: WP0001DDMMYYYY)
            const match = latestPermitID.match(new RegExp(`^${permitType}(\\d{4})${dateString}$`));
  
            if (match) {
                sequenceNumber = parseInt(match[1], 10) + 1; // Increment by 1
            }
        }
  
        // Pad sequence number to ensure it's always 4 digits
        const sequenceString = String(sequenceNumber).padStart(4, '0');
  
        // Construct the final permit ID
        const permitID = `${permitType}${sequenceString}${dateString}`;
  
        // Return the constructed permit ID
        return permitID; 
    } catch (error) {
        console.error('Error generating permit ID:', error);
        throw error; // or handle the error as needed
    }
  }

  module.exports = generateWorkPermitID;