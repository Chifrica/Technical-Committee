document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.getElementById('members-container');
  const searchInput = document.getElementById('search-input');
  let allMembers = []; // This will store all members fetched from JSON

  // Fetch data from the JSON file
  fetch('members.json')
    .then(response => response.json())
    .then(data => {
      allMembers = data; // Store the fetched data
      displayMembers(allMembers); // Display all members initially
    })
    .catch(error => {
      console.error('Error fetching members data:', error);
      membersContainer.innerHTML = '<p>Sorry, could not load member data.</p>';
    });

  // Function to display members on the page
  function displayMembers(members) {
    membersContainer.innerHTML = ''; // Clear any existing content

    if (members.length === 0) {
      membersContainer.innerHTML = '<p>No members found.</p>';
      return;
    }

    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'card'; // Use the 'card' class from your CSS

      card.innerHTML = `
        <img src="${member.picture}" alt="Photo of ${member.name}">
        <h4>${member.name}</h4>
        <p><strong>Position:</strong> ${member.position}</p>
        <p><strong>Department:</strong> ${member.department}</p>
      `;
      membersContainer.appendChild(card);
    });
  }

  // Add an event listener for the search input
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    
    const filteredMembers = allMembers.filter(member => 
      member.name.toLowerCase().includes(searchTerm) ||
      member.position.toLowerCase().includes(searchTerm) ||
      member.department.toLowerCase().includes(searchTerm)
    );
    
    displayMembers(filteredMembers);
  });
});