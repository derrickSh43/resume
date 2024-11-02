// Save the resume and portfolio data
function saveContent() {
    // Retrieve content from TinyMCE editors
    const summary = tinymce.get("summary").getContent();
    const experience = tinymce.get("experience").getContent();
    const skills = tinymce.get("skills").getContent();
    const portfolio = tinymce.get("portfolio").getContent();

    // Save data to localStorage
    const contentData = { summary, experience, skills, portfolio };
    localStorage.setItem("contentData", JSON.stringify(contentData));
    alert("Content saved successfully!");

    // Redirect to admin dashboard or main page
    window.location.href = "admin-dashboard.html";
}

// Save new or edited projects
function saveProject() {
    const title = tinymce.get("project-title").getContent();
    const image = tinymce.get("project-image").getContent();
    const description = tinymce.get("project-description").getContent();

    const projectData = { title, image, description };
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(projectData);
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project saved successfully!");
    window.location.href = "admin-dashboard.html";
}

// Load resume and portfolio data onto the index page
function loadContent() {
    const savedData = JSON.parse(localStorage.getItem("contentData"));
    if (savedData) {
        document.getElementById("resume-content").innerHTML = `
            <h2 class="text-xl font-bold mb-2 text-blue-400">Summary</h2>${savedData.summary}
            <h2 class="text-xl font-bold mb-2 text-blue-400">Experience</h2>${savedData.experience}
            <h2 class="text-xl font-bold mb-2 text-blue-400">Skills</h2>${savedData.skills}
        `;
    }

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectGrid = document.getElementById("portfolio-grid");
    projectGrid.innerHTML = projects.map(project => `
        <div class="bg-gray-800 p-4 rounded-md shadow">
            <h3 class="text-lg font-bold text-blue-300 mb-2">${project.title}</h3>
            <img src="${project.image}" alt="${project.title}" class="w-full h-32 object-cover mb-2 rounded">
            <p>${project.description}</p>
        </div>
    `).join("");
}

// Call loadContent on the main page to display data
document.addEventListener("DOMContentLoaded", loadContent);
