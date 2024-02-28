export const getErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message || 'Server Error';
    } else {
        return 'Network Error';
    }
};

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
export const getPerformanceColor = (performance) => {
    switch (performance.toLowerCase()) {
        case 'outstanding':
            return 'blue.500';
        case 'excellent':
            return 'green';
        case 'good':
            return 'yellow.400';
        case 'average':
            return 'orange.400';
        case 'needs improvement':
            return 'red.400';
        default:
            return 'red.400'; // Gray for unknown performance levels
    }
}



// count males and females
export const countGenders = (data) => {
    let maleCounts = 0;
    let femaleCounts = 0;
    let otherCounts = 0;

    data.forEach((item) => {
        if (item.gender === "male") {
            maleCounts++
        } else if (item.gender === "other") {
            otherCounts++
        } else if (item.gender === "female") {
            femaleCounts++
        }
    })

    return { femaleCounts, maleCounts, otherCounts }
}

export const subjects = [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Civics",
    "Economics",
    "Physical Education",
    "Computer Science",
    "Art / Drawing",
    "Hindi",
    "Music",
    "Environmental Science",
    "Moral Science / Ethics",
    "Health Education",
    "Home Science",
    "General Knowledge",
    "Sanskrit",
    "Psychology",
    "Business Studies",
    "Accounting",
    "Economics",
    "Political Science",
    "Sociology",
    "Legal Studies",
    "Statistics",
    "Agricultural Science",
    "Engineering Drawing",
    "Information Technology",
    "Design and Technology",
    "Religious Studies",
    "Media Studies",
    "Theater Studies",
    "Games"
];

export const teacherResponsibilities = [
    "Lesson planning",
    "Classroom management",
    "Teaching curriculum",
    "Grading assignments",
    "Providing feedback",
    "Parent-teacher communication",
    "Professional development",
    "Creating learning materials",
    "Differentiated instruction",
    "Student assessment",
    "Curriculum development",
    "Maintaining student records",
    "Adapting to student needs",
    "Promoting student engagement",
    "Fostering a positive learning environment"
];

export const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI Commerce",
    "XI Science",
    "XII Commerce",
    "XII Science"
];
