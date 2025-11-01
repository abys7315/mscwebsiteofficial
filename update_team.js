const fs = require('fs');
const team = JSON.parse(fs.readFileSync('project/src/pages/team.json', 'utf8'));
const images = fs.readdirSync('project/public/images');
team.forEach(member => {
  const name = member.FullName.toUpperCase();
  const img = images.find(i => i.toUpperCase().includes(name));
  if (img) {
    member.image = '/images/' + img;
  }
});
fs.writeFileSync('project/src/pages/team.json', JSON.stringify(team, null, 2));
console.log('Updated team.json with local image paths');
