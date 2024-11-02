// script.js
const projects = [];

// Add Project
function addProject() {
    const projectTitle = prompt("Project Title:");
    const projectDesc = prompt("Project Description:");
    const projectLink = prompt("Project Link:");
    const newProject = { title: projectTitle, description: projectDesc, link: projectLink, imageUrl: "https://via.placeholder.com/200x150" };
    projects.push(newProject);
    displayProjects();
}

// Display Projects
function displayProjects() {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = projects.map(project => `
        <div class="bg-gray-800 p-4 rounded-md shadow flex">
            <img src="${project.imageUrl}" alt="Project Image" class="w-32 h-24 mr-4 rounded">
            <div>
                <h3 class="text-xl font-bold text-blue-300">${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="text-blue-500 hover:text-blue-700">View Project</a>
            </div>
        </div>
    `).join("");
}

// Edit Resume
function editResume() {
    const resumeContent = document.getElementById("resume-content");
    const newContent = prompt("Update your resume content:", resumeContent.textContent);
    if (newContent) resumeContent.textContent = newContent;
}

// Initial Render
displayProjects();


function saveResume() {
    const summary = document.getElementById("summary").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;

    // Save data to localStorage
    const resumeData = { summary, experience, skills };
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");

    // Optionally, redirect to the main page
    window.location.href = "index.html";
}

// Load resume data on the main page
function loadResume() {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData) {
        document.getElementById("resume-content").textContent = `
            Summary: ${savedData.summary}\n
            Experience: ${savedData.experience}\n
            Skills: ${savedData.skills}
        `;
    }
}

// Call loadResume on the main page to display the saved content
document.addEventListener("DOMContentLoaded", loadResume);
