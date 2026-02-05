// RER Time Sheet Calculator - Main Application Logic

const BREAK_DEDUCTION_MINUTES = 30;
const STORAGE_KEY = 'rer_timesheet_records';

class TimeSheetManager {
    constructor() {
        this.records = this.loadRecordsFromStorage();
        this.initializeEventListeners();
        this.renderAllRecords();
    }

    initializeEventListeners() {
        const formElement = document.getElementById('timeEntryForm');
        const dateInput = document.getElementById('workDate');
        
        formElement.addEventListener('submit', (e) => this.handleFormSubmission(e));
        dateInput.addEventListener('change', (e) => this.updateDayOfWeek(e.target.value));
        
        // Set today's date as default
        const currentDate = new Date().toISOString().split('T')[0];
        dateInput.value = currentDate;
        this.updateDayOfWeek(currentDate);
    }

    handleFormSubmission(event) {
        event.preventDefault();
        
        const formData = {
            workDate: document.getElementById('workDate').value,
            weekDay: document.getElementById('weekDay').value,
            clockIn: document.getElementById('clockIn').value,
            clockOut: document.getElementById('clockOut').value,
            location: document.getElementById('location').value,
            workDescription: document.getElementById('workDescription').value
        };

        const calculatedHours = this.computeNetHours(formData.clockIn, formData.clockOut);
        
        const newRecord = {
            id: Date.now(),
            ...formData,
            netHours: calculatedHours
        };

        this.records.push(newRecord);
        this.saveRecordsToStorage();
        this.renderAllRecords();
        this.clearFormInputs();
    }

    computeNetHours(startTime, endTime) {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        
        const totalStartMinutes = startHour * 60 + startMin;
        const totalEndMinutes = endHour * 60 + endMin;
        
        let workedMinutes = totalEndMinutes - totalStartMinutes;
        
        // Handle case when end time is on the next day
        if (workedMinutes < 0) {
            workedMinutes += 24 * 60;
        }
        
        // Deduct break time
        const netMinutes = workedMinutes - BREAK_DEDUCTION_MINUTES;
        const hoursDecimal = netMinutes / 60;
        
        return hoursDecimal.toFixed(2);
    }

    updateDayOfWeek(dateString) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDate = new Date(dateString + 'T00:00:00');
        const dayIndex = selectedDate.getDay();
        document.getElementById('weekDay').value = dayNames[dayIndex];
    }

    renderAllRecords() {
        const tableBody = document.getElementById('recordsBody');
        tableBody.innerHTML = '';

        // Sort records by date (newest first)
        const sortedRecords = [...this.records].sort((a, b) => 
            new Date(b.workDate) - new Date(a.workDate)
        );

        sortedRecords.forEach(record => {
            const row = this.createTableRow(record);
            tableBody.appendChild(row);
        });

        this.updateWeeklyTotals();
    }

    createTableRow(record) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${this.formatDisplayDate(record.workDate)}</td>
            <td>${record.weekDay}</td>
            <td>${record.clockIn}</td>
            <td>${record.clockOut}</td>
            <td>${record.location}</td>
            <td>${record.workDescription}</td>
            <td><strong>${record.netHours} hrs</strong></td>
            <td>
                <button class="btn-delete" onclick="timeSheetApp.removeRecord(${record.id})">
                    Remove
                </button>
            </td>
        `;
        return row;
    }

    formatDisplayDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    updateWeeklyTotals() {
        const weeklyData = this.groupRecordsByWeek();
        const displayElement = document.getElementById('weeklyDisplay');
        
        if (Object.keys(weeklyData).length === 0) {
            displayElement.innerHTML = 'No entries logged yet';
            return;
        }

        let displayHtml = '';
        Object.keys(weeklyData).sort().reverse().forEach(weekKey => {
            const weekTotal = weeklyData[weekKey].reduce((sum, rec) => 
                sum + parseFloat(rec.netHours), 0
            );
            displayHtml += `<div>Week of ${weekKey}: ${weekTotal.toFixed(2)} hours total</div>`;
        });
        
        displayElement.innerHTML = displayHtml;
    }

    groupRecordsByWeek() {
        const weekGroups = {};
        
        this.records.forEach(record => {
            const recordDate = new Date(record.workDate + 'T00:00:00');
            const weekStart = this.getWeekStartDate(recordDate);
            const weekKey = weekStart.toISOString().split('T')[0];
            
            if (!weekGroups[weekKey]) {
                weekGroups[weekKey] = [];
            }
            weekGroups[weekKey].push(record);
        });
        
        return weekGroups;
    }

    getWeekStartDate(date) {
        const dayOfWeek = date.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Start week on Monday
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() + diff);
        return weekStart;
    }

    removeRecord(recordId) {
        this.records = this.records.filter(rec => rec.id !== recordId);
        this.saveRecordsToStorage();
        this.renderAllRecords();
    }

    loadRecordsFromStorage() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : [];
    }

    saveRecordsToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
    }

    clearFormInputs() {
        document.getElementById('clockIn').value = '';
        document.getElementById('clockOut').value = '';
        document.getElementById('location').value = '';
        document.getElementById('workDescription').value = '';
    }
}

// Initialize the application
const timeSheetApp = new TimeSheetManager();
