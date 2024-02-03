
export const editDate = (createdAt) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(createdAt);
    var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " ," + d.getFullYear()
    return datestring
}