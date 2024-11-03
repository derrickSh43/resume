// Import Amplify from AWS Amplify library
import { Amplify } from 'aws-amplify';
// Import the Amplify configuration file
import amplifyconfig from './amplifyconfiguration.json'; // Adjust path as needed

// Configure Amplify with your configuration
Amplify.configure(amplifyconfig);

// Your existing JavaScript code starts here...

// Section 1: Initial Setup and Event Listener
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    loadAllProjects(category);
    loadFeaturedProjects();
});

// Section 2: Load All Projects Based on Category
function loadAllProjects(category = null) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    let filteredProjects = projects;

    // Filter projects based on category if provided
    if (category) {
        filteredProjects = projects.filter(project => project.category === category);
    }

    // Populate the side menu with project titles
    const projectMenu = document.getElementById("project-menu");
    projectMenu.innerHTML = filteredProjects.map((project, index) => `
        <li><a href="project-details.html?projectIndex=${index}" class="text-blue-300 hover:underline">${project.title.slice(0, 20)}</a></li>
    `).join("");

    // Render the paginated projects
    renderProjects(filteredProjects);
}

// Section 3: Render Paginated Projects
function renderProjects(projects) {
    const start = (currentPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const paginatedProjects = projects.slice(start, end);
    const projectContainer = document.getElementById("project-container");

    projectContainer.innerHTML = paginatedProjects.map((project, index) => `
        <a href="project-details.html?projectIndex=${start + index}" class="project-box">
            <h3 class="text-xl font-bold text-blue-300 mb-2">${project.title}</h3>
            <p>${project.description}</p>
        </a>
    `).join("");

    // Render pagination controls
    renderPagination(projects.length);
}

// Section 4: Render Pagination Controls
function renderPagination(totalProjects) {
    const totalPages = Math.ceil(totalProjects / projectsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");
        button.onclick = () => {
            currentPage = i;
            loadAllProjects();
        };
        paginationContainer.appendChild(button);
    }
}

// Section 5: Load Featured Projects
function loadFeaturedProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const featuredProjects = projects.filter(project => project.featured).slice(0, 6);
    const featuredGrid = document.getElementById("featured-grid");

    featuredGrid.innerHTML = featuredProjects.map((project, index) => `
        <a href="project-details.html?projectIndex=${index}" class="project-box">
            <h3 class="text-xl font-bold text-blue-300 mb-2">${project.title}</h3>
            <p>${project.description}</p>
        </a>
    `).join("");
}

// Section 6: Search Projects by Title or Description
function filterProjects() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm) || project.description.toLowerCase().includes(searchTerm)
    );

    // Render the filtered projects
    renderProjects(filteredProjects);
}

// Section 7: Contact Form Submission Logic
document.getElementById('contact-form')?.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        message: formData.get('message').trim()
    };

    // Basic client-side validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Replace 'https://your-api-id.amazonaws.com/contact' with your actual Amplify API endpoint
        const response = await fetch('https://your-api-id.amazonaws.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Your message has been sent successfully!');
            this.reset(); // Clear the form
        } else {
            alert('Failed to send the message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
// Sample backend logic for reCAPTCHA validation (Node.js example)
const axios = require('axios');
const verifyReCAPTCHA = async (recaptchaToken) => {
    const secretKey = 'your-recaptcha-secret-key'; // Replace with your secret key
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
            secret: secretKey,
            response: recaptchaToken
        }
    });
    return response.data.success;
};
