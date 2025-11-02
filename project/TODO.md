# TODO: Refactor Team Page to Department Cards and Individual Department Views

## Tasks
- [ ] Modify Team.jsx to display department cards instead of full member grid and pagination
- [ ] Create new TeamDepartment.jsx component for individual department views
- [ ] Update App.jsx to add route for /team/:department
- [ ] Test navigation and styling consistency

## Details
- Department cards should show name, icon, color, and member count
- Clicking a card navigates to /team/${encodeURIComponent(department.name)}
- TeamDepartment.jsx uses useParams to get department, filters teamData, renders members in grid
- Ensure styling matches original team page
