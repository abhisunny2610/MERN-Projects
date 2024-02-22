function calculateAge(dateOfBirth) {
    // Convert the date of birth string to a Date object
    const dob = new Date(dateOfBirth);
    
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in years between the current date and the date of birth
    let age = currentDate.getFullYear() - dob.getFullYear();
    
    // Adjust the age if the birthday hasn't occurred yet this year
    const currentMonth = currentDate.getMonth();
    const dobMonth = dob.getMonth();
    
    if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDate.getDate() < dob.getDate())) {
        age--;
    }
    
    return age;
}

function generateRandomId() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {calculateAge, generateRandomId}