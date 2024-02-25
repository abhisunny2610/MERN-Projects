export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Construct the date string in YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

export const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
};

const colorSchemes = ['blue', 'green', 'yellow', 'red', 'purple', 'teal', 'orange', 'cyan', 'gray', 'pink'];

export const getRandomColorScheme = () => {
  // Generate a random index to select a color scheme from the array
  const randomIndex = Math.floor(Math.random() * colorSchemes.length);
  return colorSchemes[randomIndex];
};