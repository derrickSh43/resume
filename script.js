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

// Add event listener to load content when the page is loaded
document.addEventListener("DOMContentLoaded", loadContent);
