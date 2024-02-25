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
  