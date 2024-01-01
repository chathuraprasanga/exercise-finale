// show modal and hide modal
function openModal() {
    document.querySelector(".popup").classList.add("active")
}
function closeModal() {
    document.querySelector(".popup").classList.remove("active")
}

// database
const objects = [
    { "organization": "Bank of America", "code": "SFAW", "handler": "Svannah Nguyen" },
    { "organization": "Google", "code": "GSLK", "handler": "Michael Johnson" },
    { "organization": "Apple Inc", "code": "APLQ", "handler": "Emily Roberts" },
    { "organization": "Microsoft", "code": "MSFT", "handler": "David Thompsonn" },
    { "organization": "Amazon", "code": "AMZN", "handler": "Jessica Anderson" },
    { "organization": "Facebook", "code": "FBKL", "handler": "Christopher Davis" },
    { "organization": "Tesla", "code": "TSLA", "handler": "Oliva Willson" },
    { "organization": "Netflix", "code": "NFLX", "handler": "William Martinez" },
    { "organization": "IBM", "code": "IBMQ", "handler": "Sophia Lee" },
    { "organization": "Intel", "code": "INTC", "handler": "Daniel Hernandez" },
    { "organization": "HP inc.", "code": "HPIN", "handler": "Evelyn Davis" },
    { "organization": "Salestone", "code": "SFRC", "handler": "Benjamin Anderson" }
];



const pageSize = 5;
let currentPage = 1;
let slideIndex = 1;

// Selected checkboxes - edited
let selectedCheckboxes = [];

// Send database data to HTML - updated
function updateTable() {
    const table = document.getElementById("object-table");
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const filteredObjects = objects.filter(object => object.organization.toLowerCase().includes(getFilterInput().toLowerCase()));

    let tableContent = "<tr><th> </th><th>Organization</th><th>Code</th><th>Handler</th></tr>";
    for (let i = start; i < end && i < filteredObjects.length; i++) {
        const isChecked = selectedCheckboxes.includes(filteredObjects[i].code);
        tableContent += `<tr><td><input type="checkbox" name="selectedObject" id="${filteredObjects[i].code}" ${isChecked ? 'checked' : ''}></td><td>${filteredObjects[i].organization}</td><td>${filteredObjects[i].code}</td><td>${filteredObjects[i].handler}</td></tr>`;
    }

    table.innerHTML = tableContent;
    updatePaginationInfo();
    updateCloseButtonVisibility();
    addCheckboxEventListeners();
}

// Set pagination to database table - updated
function updatePaginationInfo() {
    const infoDiv = document.getElementById("pagination-info");
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, objects.length);

    infoDiv.innerText = `${start} - ${end} of ${objects.length}`;
}
function firstPage() {
    currentPage = 1;
    updateTable();
}
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}
function nextPage() {
    if (currentPage < Math.ceil(objects.length / pageSize)) {
        currentPage++;
        updateTable();
    }
}
function lastPage() {
    currentPage = Math.ceil(objects.length / pageSize);
    updateTable();
}

// filter function in data table
function getFilterInput() {
    return document.getElementById("filter-input").value.trim();
}

// clear filter in search bar
function clearFilter() {
    document.getElementById("filter-input").value = "";
    currentPage = 1;
    updateTable();
}

// set clear button visibility
function updateCloseButtonVisibility() {
    const closeButton = document.querySelector(".close-button");
    closeButton.style.display = getFilterInput() ? "block" : "none";
}

// Add event listeners for input changes - updated
document.getElementById("filter-input").addEventListener("input", function () {
    currentPage = 1; 
    updateTable();
});

// Function to remember selected checkboxes - edited
function addCheckboxEventListeners() {
    const checkboxes = document.getElementsByName("selectedObject");
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                selectedCheckboxes.push(this.id);
            } else {
                selectedCheckboxes = selectedCheckboxes.filter(id => id !== this.id);
            }
        });
    });
}

// Function to clear selected checkboxes - edited
function clearSelectedCheckboxes() {
    selectedCheckboxes = [];
}

// slide changing function
function showSlides() {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');

    if (slideIndex > slides.children.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.children.length;
    }

    slides.style.transform = `translateX(${-100 * (slideIndex - 1)}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex - 1].classList.add('active');
}

// next slide function
function nextSlide() {
    const nextBtn = document.getElementById('next-page-btn')
    slideIndex += 1;
    if (slideIndex === 3) {
        hideAllDivs()
        nextBtn.textContent = 'Create job'
    }
    if (slideIndex === 4) {
        document.querySelector(".popup").classList.remove("active");
        // alert('Job Created')
        window.location.reload();
    }
    showSlides();
    setCarouselHeight();
}

// appear template function
function handleOptionChange() {
    // Get the selected option value
    var selectedOption = document.getElementById("select-option").value;

    // Hide all divs
    hideAllDivs();

    // Show the corresponding div based on the selected option
    if (selectedOption === "true") {
        document.getElementById("change-template").style.display = "block";
    } else if (selectedOption === 'false') {
        document.getElementById("change-template").style.display = 'none';
    }
}

// Function to hide all divs
function hideAllDivs() {
    var allDivs = document.querySelector(".change-template");
    allDivs.style.display = "none";
}

// radio button functioning
function handleRadioClick(selectedRadioId) {

    var radio1 = document.getElementById('radio1');
    var radio2 = document.getElementById('radio2');

    if (selectedRadioId === 'radio1') {
        radio2.checked = false;
    } else if (selectedRadioId === 'radio2') {
        radio1.checked = false;
    }
}


document.getElementById("select-option").addEventListener("change", handleOptionChange);

// Initial hideAllDivs 
hideAllDivs();

// Initial table update
updateTable();

// Initial slide display
showSlides();


