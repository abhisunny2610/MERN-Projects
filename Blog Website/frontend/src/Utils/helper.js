export const formatDate = (dateString) => {
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };

    const date = new Date(dateString);
    const day = date.getDate();
    const formattedDate = date.toLocaleDateString('en-US', options);

    const suffix = getDaySuffix(day);
    return formattedDate.replace(/\b\d{1,2}\b/, `${day}${suffix}`);
};

const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};