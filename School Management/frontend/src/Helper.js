export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
}