

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year}_${hours}.${minutes}.${seconds}`;
}



module.exports = {
    randomNum,
    formatDate
};
