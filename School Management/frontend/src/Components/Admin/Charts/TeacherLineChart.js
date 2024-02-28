import React from 'react';
import { Line } from 'react-chartjs-2';

const TeacherLineChart = ({ teacherData }) => {
    // Process the teacherData to count teachers added per month
    const teacherCountsPerMonth = processTeacherData(teacherData);

    // Prepare data for the chart
    const chartData = {
        labels: Object.keys(teacherCountsPerMonth),
        datasets: [
            {
                label: 'Teachers Added',
                data: Object.values(teacherCountsPerMonth),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return <Line data={chartData} />;
};

// Function to process teacherData and count teachers added per month
const processTeacherData = (teacherData) => {
    const teacherCountsPerMonth = {};

    teacherData.forEach((teacher) => {
        const date = new Date(teacher.createdAt);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        if (teacherCountsPerMonth[monthYear]) {
            teacherCountsPerMonth[monthYear]++;
        } else {
            teacherCountsPerMonth[monthYear] = 1;
        }
    });

    return teacherCountsPerMonth;
};

export default TeacherLineChart;
