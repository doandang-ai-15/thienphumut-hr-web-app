// Global Date Formatting System
// Default format: DD/MM/YYYY

// Get current date format from localStorage or default to DD/MM/YYYY
function getDateFormat() {
    return localStorage.getItem('dateFormat') || 'DD/MM/YYYY';
}

// Format a date string or Date object according to user preference
function formatDate(date, includeTime = false) {
    if (!date) return '';

    // Convert to Date object if it's a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if valid date
    if (isNaN(dateObj.getTime())) return '';

    const format = getDateFormat();

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    let formattedDate = '';

    switch (format) {
        case 'MM/DD/YYYY':
            formattedDate = `${month}/${day}/${year}`;
            break;
        case 'YYYY-MM-DD':
            formattedDate = `${year}-${month}-${day}`;
            break;
        case 'DD/MM/YYYY':
        default:
            formattedDate = `${day}/${month}/${year}`;
            break;
    }

    if (includeTime) {
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        formattedDate += ` ${hours}:${minutes}`;
    }

    return formattedDate;
}

// Convert date string from YYYY-MM-DD to user format
function convertDateToUserFormat(dateString) {
    if (!dateString) return '';

    // Handle ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)
    const date = new Date(dateString);
    return formatDate(date);
}

// Convert user input date to YYYY-MM-DD for API
function convertUserDateToISO(dateString) {
    if (!dateString) return '';

    const format = getDateFormat();
    let day, month, year;

    switch (format) {
        case 'MM/DD/YYYY': {
            const parts = dateString.split('/');
            if (parts.length !== 3) return '';
            month = parts[0];
            day = parts[1];
            year = parts[2];
            break;
        }
        case 'YYYY-MM-DD': {
            // Already in ISO format
            return dateString;
        }
        case 'DD/MM/YYYY':
        default: {
            const parts = dateString.split('/');
            if (parts.length !== 3) return '';
            day = parts[0];
            month = parts[1];
            year = parts[2];
            break;
        }
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Format date for input[type="date"] value (always YYYY-MM-DD)
function formatDateForInput(date) {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Auto-format all date elements on page
function formatAllDatesOnPage() {
    // Format all elements with data-date attribute
    const dateElements = document.querySelectorAll('[data-date]');
    dateElements.forEach(element => {
        const dateValue = element.getAttribute('data-date');
        if (dateValue) {
            element.textContent = formatDate(dateValue);
        }
    });

    // Format all elements with data-datetime attribute
    const dateTimeElements = document.querySelectorAll('[data-datetime]');
    dateTimeElements.forEach(element => {
        const dateValue = element.getAttribute('data-datetime');
        if (dateValue) {
            element.textContent = formatDate(dateValue, true);
        }
    });
}

// Get relative time (e.g., "2 days ago", "in 3 days")
function getRelativeTime(date, lang = 'vi') {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const now = new Date();
    const diffMs = dateObj - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (lang === 'vi') {
        if (diffDays === 0) return 'Hôm nay';
        if (diffDays === 1) return 'Ngày mai';
        if (diffDays === -1) return 'Hôm qua';
        if (diffDays > 0) return `Trong ${diffDays} ngày`;
        return `${Math.abs(diffDays)} ngày trước`;
    } else {
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 0) return `In ${diffDays} days`;
        return `${Math.abs(diffDays)} days ago`;
    }
}

// Calculate days between two dates
function daysBetween(startDate, endDate) {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; // Include both start and end date
}

// Initialize date formatting on page load
document.addEventListener('DOMContentLoaded', function() {
    formatAllDatesOnPage();
});
