// Function to load resume and project content from localStorage
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
    const featuredProjects = projects.filter(project => project.featured);
    const allProjects = projects.slice(3);

    const portfolioGrid = document.getElementById("portfolio-grid");
    portfolioGrid.innerHTML = featuredProjects.map((project, index) => `
        <div class="bg-gray-800 p-4 rounded-md shadow project-tile">
            <h3 class="text-lg font-bold text-blue-300 mb-2">
                <a href="project-details.html?projectIndex=${index}" class="text-blue-300 hover:underline">${project.title}</a>
            </h3>
            <img src="${project.image}" alt="${project.title}" class="w-full h-32 object-cover mb-2 rounded">
            <p>${project.description}</p>
        </div>
    `).join("");

    const allProjectsGrid = document.getElementById("all-projects-grid");
    allProjectsGrid.innerHTML = allProjects.map((project, index) => `
        <div class="bg-gray-800 p-4 rounded-md shadow project-tile">
            <h3 class="text-lg font-bold text-blue-300 mb-2">
                <a href="project-details.html?projectIndex=${index + 3}" class="text-blue-300 hover:underline">${project.title}</a>
            </h3>
            <img src="${project.image}" alt="${project.title}" class="w-full h-32 object-cover mb-2 rounded">
            <p>${project.description}</p>
        </div>
    `).join("");
}

// Load individual project details
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectIndex = urlParams.get('projectIndex');
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (projectIndex !== null && projects[projectIndex]) {
        const project = projects[projectIndex];
        document.getElementById("project-details").innerHTML = `
            <h1 class="text-3xl font-bold text-blue-400 mb-4">${project.title}</h1>
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover mb-4 rounded">
            <p>${project.description}</p>
        `;
    } else {
        document.getElementById("project-details").innerHTML = '<p>Project not found.</p>';
    }
}
function checkFeaturedLimit() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const featuredCount = projects.filter(project => project.featured).length;

    if (featuredCount >= 3 && !document.getElementById("edit-feature").checked) {
        alert("Only three projects can be featured at a time.");
        document.getElementById("edit-feature").checked = false;
    }
}

function saveEditedProject(index) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const currentProject = projects[index];

    currentProject.title = tinymce.get("edit-title").getContent();
    currentProject.image = tinymce.get("edit-image").getContent();
    currentProject.description = tinymce.get("edit-description").getContent();
    currentProject.category = document.getElementById("edit-category").value;
    currentProject.featured = document.getElementById("edit-feature").checked;

    const featuredCount = projects.filter(project => project.featured).length;
    if (currentProject.featured && featuredCount > 3) {
        alert("You cannot have more than three featured projects.");
        currentProject.featured = false;
    }

    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project updated successfully!");
    document.getElementById("project-select").value = "";
    document.getElementById("project-details-container").innerHTML = '';
}

// Add event listener to load content when the page is loaded
document.addEventListener("DOMContentLoaded", loadContent);
