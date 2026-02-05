// Days of the week
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const workdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const LUNCH_DEDUCTION_MINUTES = 30;

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    days.forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        
        startInput.addEventListener('change', () => calculateDayHours(day));
        endInput.addEventListener('change', () => calculateDayHours(day));
    });
});

/**
 * Calculate hours for a specific day
 * @param {string} day - The day to calculate hours for
 */
function calculateDayHours(day) {
    const startInput = document.getElementById(`${day}-start`);
    const endInput = document.getElementById(`${day}-end`);
    const hoursDisplay = document.getElementById(`${day}-hours`);
    
    if (!startInput.value || !endInput.value) {
        hoursDisplay.textContent = '0.00 hrs';
        updateTotals();
        return;
    }
    
    const start = parseTime(startInput.value);
    const end = parseTime(endInput.value);
    
    if (end <= start) {
        hoursDisplay.textContent = '0.00 hrs (Invalid time range)';
        hoursDisplay.style.color = '#e74c3c';
        updateTotals();
        return;
    }
    
    let totalMinutes = end - start;
    
    // Subtract 30 minutes for lunch on workdays
    if (workdays.includes(day)) {
        totalMinutes -= LUNCH_DEDUCTION_MINUTES;
    }
    
    const hours = (totalMinutes / 60).toFixed(2);
    hoursDisplay.textContent = `${hours} hrs`;
    hoursDisplay.style.color = '#2ecc71';
    
    updateTotals();
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 * @param {string} timeStr - Time string in HH:MM format
 * @returns {number} Minutes since midnight
 */
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * Update the total hours summary
 */
function updateTotals() {
    let totalGrossMinutes = 0;
    let workdaysWithHours = 0;
    
    days.forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        
        if (startInput.value && endInput.value) {
            const start = parseTime(startInput.value);
            const end = parseTime(endInput.value);
            
            if (end > start) {
                totalGrossMinutes += (end - start);
                
                // Count workdays that have hours entered
                if (workdays.includes(day)) {
                    workdaysWithHours++;
                }
            }
        }
    });
    
    const totalGrossHours = totalGrossMinutes / 60;
    const lunchDeductionMinutes = workdaysWithHours * LUNCH_DEDUCTION_MINUTES;
    const lunchDeductionHours = lunchDeductionMinutes / 60;
    const totalNetHours = (totalGrossMinutes - lunchDeductionMinutes) / 60;
    
    document.getElementById('total-gross').textContent = totalGrossHours.toFixed(2);
    document.getElementById('lunch-deduction').textContent = lunchDeductionHours.toFixed(2);
    document.getElementById('total-net').textContent = totalNetHours.toFixed(2);
}

/**
 * Clear all timesheet entries
 */
function clearTimesheet() {
    if (confirm('Are you sure you want to clear all entries?')) {
        days.forEach(day => {
            document.getElementById(`${day}-start`).value = '';
            document.getElementById(`${day}-end`).value = '';
            const hoursDisplay = document.getElementById(`${day}-hours`);
            hoursDisplay.textContent = '0.00 hrs';
            hoursDisplay.style.color = '';
        });
        updateTotals();
    }
}

/**
 * Submit the timesheet
 */
function submitTimesheet() {
    const totalNet = parseFloat(document.getElementById('total-net').textContent);
    
    if (totalNet === 0) {
        alert('Please enter at least one day of work before submitting.');
        return;
    }
    
    // Collect timesheet data
    const timesheetData = {};
    days.forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        
        if (startInput.value && endInput.value) {
            timesheetData[day] = {
                start: startInput.value,
                end: endInput.value,
                hours: document.getElementById(`${day}-hours`).textContent
            };
        }
    });
    
    const summary = {
        days: timesheetData,
        totalGross: document.getElementById('total-gross').textContent,
        lunchDeduction: document.getElementById('lunch-deduction').textContent,
        totalNet: document.getElementById('total-net').textContent
    };
    
    console.log('Timesheet Submitted:', summary);
    alert(`Timesheet submitted successfully!\n\nNet Hours: ${summary.totalNet}\n\nCheck the console for full details.`);
}
