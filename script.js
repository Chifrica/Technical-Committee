// Save new member
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("member-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const reader = new FileReader();
      const file = document.getElementById("picture").files[0];

      reader.onload = function() {
        const member = {
          name: document.getElementById("name").value,
          contact: document.getElementById("contact").value,
          email: document.getElementById("email").value,
          department: document.getElementById("department").value,
          graduation: document.getElementById("graduation").value,
          position: document.getElementById("position").value,
          picture: reader.result
        };

        let members = JSON.parse(localStorage.getItem("members")) || [];
        members.push(member);
        localStorage.setItem("members", JSON.stringify(members));
        alert("Member saved!");
        form.reset();
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  // Display members on index.html
  const container = document.getElementById("members-container");
  if (container) {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    container.innerHTML = members.map(m => `
      <div class="card">
        <img src="${m.picture}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p><strong>Contact:</strong> ${m.contact}</p>
        <p><strong>Email:</strong> ${m.email}</p>
        <p><strong>Dept:</strong> ${m.department}</p>
        <p><strong>Graduation:</strong> ${m.graduation}</p>
        <p><strong>Position:</strong> ${m.position}</p>
      </div>
    `).join("");
  }
});
