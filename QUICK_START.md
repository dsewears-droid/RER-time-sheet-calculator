# Quick Start Guide - RER Time Sheet Calculator

## Getting Started

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or server required

2. **Log Your First Entry**
   - The current date is pre-selected
   - The day of week auto-fills when you select a date
   - Enter your start time (e.g., 09:00)
   - Enter your end time (e.g., 17:00)
   - Type in the job site location
   - Describe the scope of work
   - Click "Add Entry"

3. **View Your Hours**
   - Your entry appears in the table below
   - The "Hours" column shows net hours (with 30 min deducted)
   - Weekly totals display above the table

## Example Entry

**Date:** February 5, 2026  
**Day:** Wednesday (auto-filled)  
**Start Time:** 09:00  
**End Time:** 17:00  
**Job Site:** Construction Site A  
**Scope of Work:** Foundation work and concrete pouring  

**Result:** 7.50 hours (8 hours - 30 minute break)

## Understanding the Calculations

### Hour Calculation
```
Work Time = End Time - Start Time
Break Time = 30 minutes (automatic)
Net Hours = Work Time - Break Time
```

**Examples:**
- 9:00 AM to 5:00 PM = 8 hours → **7.50 net hours**
- 8:00 AM to 4:00 PM = 8 hours → **7.50 net hours**
- 7:30 AM to 4:00 PM = 8.5 hours → **8.00 net hours**

### Weekly Totals
- Weeks start on **Monday**
- All entries for the same week are automatically grouped
- Totals display as "Week of [Monday's date]: X.XX hours total"

## Managing Entries

### Remove an Entry
- Click the "Remove" button next to any entry
- The entry is deleted immediately
- Weekly totals update automatically

### Data Persistence
- All entries are saved automatically in your browser
- Data persists even after closing the browser
- To clear all data, use your browser's "Clear browsing data" feature

## Tips

1. **Date Selection:** Click the calendar icon to pick a date easily
2. **Time Format:** Use 24-hour format (e.g., 14:00 for 2:00 PM)
3. **Decimal Hours:** 7.50 hours = 7 hours and 30 minutes
4. **Weekly View:** Entries are sorted by date (newest first)

## Troubleshooting

**Q: My entries disappeared**  
A: Check if you cleared browser data or switched browsers. Data is stored per browser.

**Q: Can I export my data?**  
A: Currently, data is stored locally. You can take screenshots or manually copy entries.

**Q: What if I work past midnight?**  
A: Enter the end time as a later time (e.g., start 22:00, end 06:00 won't work correctly - enter as two separate days).

**Q: Can I edit an entry?**  
A: Currently, you can remove and re-add. Delete the incorrect entry and add a new one.

## System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Local storage enabled
- Internet connection not required

## Support

For issues or questions, refer to:
- `README.md` - Full documentation
- `DEMONSTRATION.md` - Detailed test scenarios
