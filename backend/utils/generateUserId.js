const { User } = require('../index/models');

async function generateUserId(role) {
    const today = new Date();
  
    // Get the current date in YYYYMMDD format
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`; // YYYYMMDD format
  
    try {
        // Fetch the latest user ID for the given role
        const latestUser = await User.findOne({
            userId: { $regex: `^USER${role}\\d{4}${formattedDate}$` } // Match users for today
        }).sort({ userId: -1 }); // Sort to get the latest user ID for today
  
        let sequenceNumber = 1; // Default to 1 if no users exist for today
  
        if (latestUser) {
            // Extract the sequence number from the latest user ID
            const latestUserID = latestUser.userId;
  
            // Use a regex to extract the 4-digit sequence part (assuming format: USER<role><seq><date>)
            const match = latestUserID.match(new RegExp(`^USER${role}(\\d{4})${formattedDate}$`));
  
            if (match) {
                sequenceNumber = parseInt(match[1], 10) + 1; // Increment by 1
            }
        }
  
        // Pad sequence number to ensure it's always 4 digits
        const sequenceString = String(sequenceNumber).padStart(4, '0');
  
        // Construct the final user ID
        const userID = `USER${role}${sequenceString}${formattedDate}`;
  
        // Return the constructed user ID
        return userID; 
    } catch (error) {
        console.error('Error generating user ID:', error);
        throw error; // or handle the error as needed
    }
  }

  module.exports = generateUserId;