export const base_url = 'http://localhost:6001/api/'

export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name
}