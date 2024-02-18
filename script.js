let lastButton = null;
let imageNumber = 0;
let isSet = Array(11).fill(false);


let buttonstylewidth = "94px"; 
let buttonstyleheight = "85px"; 
let imgstylewidth = "94px"; 
let imgstyleheight = "85px"; 
let buttonstylefontSize = "10px";
let currentTab_ = 1;

const lastImage = {};  
let currentButtonClickName = '';
let lastButtonElement = null; 

const loadingMessages = [
    "Loading Technique...",
    "Preparing Workout...",
    "Setting Up Exercise...",
    "Getting Ready...",
    "One Moment Please...",
    "Warming Up...",
    "In Motion...",
    "Flexing Muscles...",
    "Activating Workout...",
    "Gearing Up..."
];


function handleTab(currentTab) {
    currentTab_ = currentTab;

    // Define an array of setup functions for each tab.
    // The index in the array corresponds to the tab number minus one (since arrays are zero-indexed).
    const setupFunctions = [
        setGlutesTable,  // Tab 1
        setLegs,         // Tab 2
        setChestTable,   // Tab 3
        setBackTable,    // Tab 4
        setShouldersTable, // Tab 5
        setArmsTable,    // Tab 6
        setStomachTable, // Tab 7
        setCardioTable   // Tab 8
        // Add more as needed
    ];

    
    if (currentTab >= 1 && currentTab <= setupFunctions.length && !isSet[currentTab]) {

        //alert(" if (currentTab_  " + currentTab + " >= 1 && <= setupFunctions.length: " + setupFunctions.length + " && isSet[currentTab]: " + isSet[currentTab] );

        setupFunctions[currentTab - 1](); // Call the corresponding setup function
        isSet[currentTab] = true; // Mark as set
    }
}

function drawDefaultImage(currentTab){
    
    const imageFrame = document.getElementById("imageFrame");
    imageFrame.innerHTML = '';
    let imagename = '';
    currentTab_ = currentTab;
    if(currentTab == 1){ 
        imagename = 'glutes.png';
    }
    else if(currentTab == 2){
        imagename = 'squats.png';
    }
    else if(currentTab == 3){
        imagename = 'chest.png';
    }
    else if(currentTab == 4){
        imagename = 'back.png';
    }
    else if(currentTab == 5){
        imagename = 'shoulders.png';
    }   
    else if(currentTab == 6){
        imagename = 'arms.png';
    } 
    else if(currentTab == 7){
        imagename = '';
    } 
    else{
        imagename = 'cardio.png';
    } 

    // Create new img element
    const img = new Image();
    img.src = imagename;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';


    imageFrame.appendChild(img);
}
// Function to set the current tab and refresh the table content
function setTab(tabNumber) {
    currentTab_ = tabNumber;
    imageNumber = 0;


    document.querySelectorAll('.table').forEach(function(table) {
        table.style.display = 'none';
    });
    var selectedTable = document.getElementById(getTableName(tabNumber));
    if (selectedTable) {
      selectedTable.style.display = 'block';
    }

    handleTab(currentTab_);
    drawDefaultImage(currentTab_)
}

function getTableName(tabNumber) {
    switch (tabNumber) {
        case 1: return 'GlutesTable';
        case 2: return 'LegsTable';
        case 3: return 'ChestTable';
        case 4: return 'BackTable';
        case 5: return 'ShouldersTable';
        case 6: return 'ArmsTable';
        case 7: return 'StomachTable';
        case 8: return 'CardioTable';
        case 9: return 'MMATable';
        case 10: return 'NutritionTable';
        default: return '';
    }
}

function setGlutesTable()
{
    try {
        const table = document.getElementById("GlutesTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) 
                || ((i === 0) && (j === 2)) 
                || ((i === 0) && (j === 4))
                || ((i === 1) && (j === 4))
                || ((i === 2) && (j === 0))
                || ((i === 2) && (j === 2))
                || ((i === 2) && (j === 4))
                || ((i === 3) && (j === 0))
                || ((i === 3) && (j === 3))
                || ((i === 4) && (j === 0))
                || ((i === 4) && (j === 2))
                || ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
                    
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Reverse Hack Squats"; 
                        lastImage["Reverse Hack Squats"] = 21;
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Good Mornings"; 
                        lastImage["Good Mornings"] = 14; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Cable Leg Extensions Side";  
                        lastImage["Cable Leg Extensions Side"] = 14;
                    }
                    if ((i === 1) && (j === 4)) {
                        button.textContent = "Cable Leg Extensions Back"; 
                        lastImage["Cable Leg Extensions Back"] = 30; 
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Bulgarian Split Squats"; 
                        lastImage["Bulgarian Split Squats"] = 14; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Single Angle Leg Press";  
                        lastImage["Single Angle Leg Press"] = 8;
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Hip Thrust"; 
                        lastImage["Hip Thrust"] = 35; 
                    }
                    if ((i === 3) && (j === 0)) {
                        button.textContent = "Step Ups";  
                        lastImage["Step Ups"] = 12;
                    }
                    if ((i === 3) && (j === 3)) {
                        button.textContent = "Single leg thrust"; 
                        lastImage["Single leg thrust"] = 7; 
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Hip Abductions"; 
                        lastImage["Hip Abductions"] = 16; 
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Donkey Kicks"; 
                        lastImage["Donkey Kicks"] = 21; 
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Back Extension";  
                        lastImage["Back Extension"] = 14;
                    }
                
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber, lastButtonElement); // Display the previous image
            }
        }
    };
}

function setLegs()
{
    try {
        
        const table = document.getElementById("LegsTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) 
                || ((i === 0) && (j === 2)) 
                || ((i === 0) && (j === 4))
                || ((i === 2) && (j === 0))
                || ((i === 2) && (j === 2))
                || ((i === 2) && (j === 4))
                || ((i === 4) && (j === 0))
                || ((i === 4) && (j === 2))
                || ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed

                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Squats"; 
                        lastImage["Squats"] = 35;
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Dead Lifts"; 
                        lastImage["Dead Lifts"] = 19;
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Calf Raises"; 
                        lastImage["Calf Raises"] = 6;
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Lunges"; 
                        lastImage["Lunges"] = 18;
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Angled Leg Press";
                        lastImage["Angled Leg Press"] = 11; 
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Lying Leg Curls"; 
                        lastImage["Lying Leg Curls"] = 15;
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Hack Squats"; 
                        lastImage["Hack Squats"] = 4;
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Leg Extensions"; 
                        lastImage["Leg Extensions"] = 6;
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Reverse Leg Extensions"; 
                        lastImage["Reverse Leg Extensions"] = 4;
                    }
                
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber, lastButtonElement); // Display the previous image
            }
        }
    };
}

function setChestTable()
{
    try {
        const table = document.getElementById("ChestTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) ||
                    ((i === 0) && (j === 2)) ||
                    ((i === 0) && (j === 4)) ||
                    ((i === 1) && (j === 2)) ||
                    ((i === 1) && (j === 4)) ||
                    ((i === 2) && (j === 0)) ||
                    ((i === 4) && (j === 2)) ||
                    ((i === 4) && (j === 0)) ||
                    ((i === 3) && (j === 2)) ||
                    ((i === 3) && (j === 4)) ||
                    ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
  
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Dumbbell Press";
                        lastImage["Dumbbell Press"] = 10; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Incline Dumbbell Press";
                        lastImage["Incline Dumbbell Press"] = 16; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Incline EZ-bar Skullcrusher";
                        lastImage["Incline EZ-bar Skullcrusher"] = 6; 
                    }
                    if ((i === 1) && (j === 2)) {
                        button.textContent = "Close-Grip Incline Dumbbell Press";
                        lastImage["Close-Grip Incline Dumbbell Press"] = 8; 
                    }
                    if ((i === 1) && (j === 4)) {
                        button.textContent = "EZ Bar Close Grip Bench Press";
                        lastImage["EZ Bar Close Grip Bench Press"] = 4; 
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Decline Bench Press";
                        lastImage["Decline Bench Press"] = 6; 
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Peck Deck Flys";
                        lastImage["Peck Deck Flys"] = 8; 
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Flys";
                        lastImage["Flys"] = 15; 
                    }
                    if ((i === 3) && (j === 2)) {
                        button.textContent = "Plate Front Raises";
                        lastImage["Plate Front Raises"] = 21; 
                    }
                    if ((i === 3) && (j === 4)) {
                        button.textContent = "Cross Over Chest Cables";
                        lastImage["Cross Over Chest Cables"] = 9; 
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Low Cable Cross Over";
                        lastImage["Low Cable Cross Over"] = 6; 
                    }
                   
                
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}

function setBackTable()
{
    try {
        const table = document.getElementById("BackTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) ||
                    ((i === 0) && (j === 2)) ||
                    ((i === 0) && (j === 4)) ||
                    ((i === 2) && (j === 0)) ||
                    ((i === 2) && (j === 2)) ||
                    ((i === 2) && (j === 4)) ||
                    ((i === 3) && (j === 0)) ||
                    ((i === 4) && (j === 0)) ||
                    ((i === 4) && (j === 2)) ||
                    ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
                
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Dumbbell Press";
                        lastImage["Dumbbell Press"] = 14; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "One Arm Dumbbell Rows";
                        lastImage["One Arm Dumbbell Rows"] = 24; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Reverse Fly";
                        lastImage["Reverse Fly"] = 12; 
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Lat Pulldowns";
                        lastImage["Lat Pulldowns"] = 8; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Lat Pulldowns Back";
                        lastImage["Lat Pulldowns Back"] = 6; 
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Seated Row";
                        lastImage["Seated Row"] = 12; 
                    }
                    if ((i === 3) && (j === 0)) {
                        button.textContent = "Lat Pullup";
                        lastImage["Lat Pullup"] = 12; 
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Close Grip Lat Pulldown";
                        lastImage["Close Grip Lat Pulldown"] = 8; 
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Straight Arm Lat Pulldown";
                        lastImage["Straight Arm Lat Pulldown"] = 18; 
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Face Pull";
                        lastImage["Face Pull"] = 21; 
                    }
                                     
                
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}

function setShouldersTable()
{
    try {
        const table = document.getElementById("ShouldersTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) ||
                    ((i === 1) && (j === 0)) ||
                    ((i === 0) && (j === 2)) ||
                    ((i === 0) && (j === 4)) ||
                    ((i === 2) && (j === 2)) ||
                    ((i === 2) && (j === 4)) ||
                    ((i === 3) && (j === 0)) ||
                    ((i === 4) && (j === 0)) ||
                    ((i === 4) && (j === 2)) ||
                    ((i === 3) && (j === 2)) ||
                    ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
                    
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Shoulder Press";
                        lastImage["Shoulder Press"] = 18; 
                    }
                    if ((i === 1) && (j === 0)) {
                        button.textContent = "Seated Neutral-Grip Dumbbell Overhead Press";
                        lastImage["Seated Neutral-Grip Dumbbell Overhead Press"] = 6; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Behind Neck Barbell Shoulder Press";
                        lastImage["Behind Neck Barbell Shoulder Press"] = 5; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Shrugs";
                        lastImage["Shrugs"] = 4; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Lateral Raises";
                        lastImage["Lateral Raises"] = 12; 
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Dumbell Front Raises";
                        lastImage["Dumbell Front Raises"] = 10; 
                    }
                    if ((i === 3) && (j === 0)) {
                        button.textContent = "Incline Front Raises";
                        lastImage["Incline Front Raises"] = 8; 
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Incline Reverse Flys";
                        lastImage["Incline Reverse Flys"] = 10; 
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Upright Rows";
                        lastImage["Upright Rows"] = 10; 
                    }
                    if ((i === 3) && (j === 2)) {
                        button.textContent = "Hamer Lat Pull Down Deltoids";
                        lastImage["Hamer Lat Pull Down Deltoids"] = 6; 
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Cable Rear Delt Fly";
                        lastImage["Cable Rear Delt Fly"] = 12; 
                    }
                    
                
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}

function setArmsTable()
{
    try {
        const table = document.getElementById("ArmsTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) ||
                    ((i === 0) && (j === 2)) ||
                    ((i === 0) && (j === 4)) ||
                    ((i === 2) && (j === 0)) ||
                    ((i === 2) && (j === 2)) ||
                    ((i === 2) && (j === 4)) ||
                    ((i === 4) && (j === 2))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
    
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Biceps Hammer Curls";
                        lastImage["Biceps Hammer Curls"] = 9; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Machine Tricep Dips";
                        lastImage["Machine Tricep Dips"] = 6; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Preacher Curl Bench";
                        lastImage["Preacher Curl Bench"] = 5; 
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Triceps Pushdowns";
                        lastImage["Triceps Pushdowns"] = 12; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Bicep Barbell Curls";
                        lastImage["Bicep Barbell Curls"] = 10; 
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Reverse EZ Barbell Curls";
                        lastImage["Reverse EZ Barbell Curls"] = 6; 
                    }
                    if ((i === 4) && (j === 2)) {
                        button.textContent = "Cable Overhead Bicep Curl";
                        lastImage["Cable Overhead Bicep Curl"] = 4; 
                    }
                    
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}

function setStomachTable()
{
    try {
        const table = document.getElementById("StomachTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) ||
                    ((i === 0) && (j === 2)) ||
                    ((i === 0) && (j === 4)) ||
                    ((i === 2) && (j === 0)) ||
                    ((i === 2) && (j === 4)) ||
                    ((i === 2) && (j === 2))
                    ) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
                    
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Upper Abs";
                        lastImage["Upper Abs"] = 22; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Lower Abs";
                        lastImage["Lower Abs"] = 38; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Six Pack";
                        lastImage["Six Pack"] = 13; 
                    }
                    if ((i === 2) && (j === 0)) {
                        button.textContent = "Obliques";
                        lastImage["Obliques"] = 13; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Complete";
                        lastImage["Complete"] = 10; 
                    }
                    if ((i === 2) && (j === 4)) {
                        button.textContent = "Core";
                        lastImage["Core"] = 13; 
                    }

                    
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}

function setCardioTable()
{
    try {
        const table = document.getElementById("CardioTable");
        for (let i = 0; i < 5; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                // Add buttons to corner, middle, and center cells
                if (((i === 0) && (j === 0)) || 
                    ((i === 0) && (j === 2)) || 
                    ((i === 0) && (j === 4)) || 
                    ((i === 2) && (j === 2)) || 
                    ((i === 4) && (j === 0)) || 
                    ((i === 4) && (j === 4))) {
                    // Button configuration
                    const button = document.createElement("button");
                    button.style.backgroundColor = 'rgba(211, 211, 211, 0.3)';
                    button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
                    button.style.backgroundImage = "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.style.width = buttonstylewidth; // Adjust based on your needs
                    button.style.height = buttonstyleheight; // Adjust based on your needs
                    button.style.position = "absolute";
                    button.style.top = "0"; // Anchor to top of cell
                    button.style.left = "0"; // Anchor to left of cell
                    button.style.zIndex = "2"; // Ensures button is above image
                    button.style.fontSize = buttonstylefontSize; // Adjust the font size as needed
                     
                    // Set button title
                    if ((i === 0) && (j === 0)) {
                        button.textContent = "Steps";
                        lastImage["Steps"] = 5; 
                    }
                    if ((i === 0) && (j === 2)) {
                        button.textContent = "Threadmill";
                        lastImage["Threadmill"] = 8; 
                    }
                    if ((i === 0) && (j === 4)) {
                        button.textContent = "Spinning";
                        lastImage["Spinning"] = 8; 
                    }
                    if ((i === 2) && (j === 2)) {
                        button.textContent = "Yoga";
                        lastImage["Yoga"] = 163; 
                    }
                    if ((i === 4) && (j === 0)) {
                        button.textContent = "Rowing";
                        lastImage["Rowing"] = 5; 
                    }
                    if ((i === 4) && (j === 4)) {
                        button.textContent = "Boxing";
                        lastImage["Boxing"] = 28; 
                    }
                    
                    // Image configuration
                    const img = document.createElement("img");
                    const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
                    const imageName = `1.png`;
                    img.style.width = imgstylewidth; // Adjust as needed
                    img.style.height = imgstyleheight; // Adjust as needed
                    img.alt = button.textContent;
                    img.src = `${folderPath}${imageName}`;
                    img.style.position = "absolute";
                    img.style.top = "0"; // Align with button
                    img.style.left = "0"; // Align with button
                    img.style.zIndex = "1"; // Ensures image is below button
                
                    // Append elements to cell
                    cell.style.position = "absolute"; // Needed for absolute positioning within cell
                    cell.appendChild(button);
                    cell.appendChild(img);
                
                    // Button click event
                    button.onclick = function () { handleButtonClick(this, i, j); };
                    img.addEventListener('click', function () { handleButtonClick(this, i, j); });
                }
            }
        }
    } catch (error) {
        alert("Error occurred while setting up the table: " + error.message);
    }

    const backButton = document.getElementById("backbtn");
    backButton.textContent = 'Back'; // Set the text for the back button
    backButton.onclick = function () {
        if (imageNumber > 1) { // Ensure imageNumber doesn't go below 1
            imageNumber--;
            if (lastButton) {
                const parts = lastButton.split('_'); // Assuming lastButton format is 'row_col'
                const row = parseInt(parts[0], 10);
                const col = parseInt(parts[1], 10);
                showImage(row, col, imageNumber,  lastButtonElement); // Display the previous image
            }
        }
    };
}


document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('resize', updateStylesBasedOnDevice);

    updateStylesBasedOnDevice();
    
    if (isSet[1] == false)
        {
            setGlutesTable();
            isSet[1] = 1;
        }

    drawDefaultImage(1);
    
});





function handleButtonClick(buttonElement, row, col) {
    try
    {
        //alert("handleButtonClick");

        lastButtonElement = buttonElement;

        const currentButtonClickName_ = buttonElement.innerHTML;
        if (currentButtonClickName != currentButtonClickName_)
        {
            imageNumber = 0
        }
        currentButtonClickName = currentButtonClickName_;

        const lastNumberOfImage = lastImage[currentButtonClickName]; 

        //alert("currentButtonClickName: " + currentButtonClickName + " imageNumber: " + imageNumber + " - lastNumberOfImage: " + lastNumberOfImage)

        if (imageNumber <= lastNumberOfImage)
        {
            const currentButton = `${row}_${col}`;
            if (imageNumber < lastNumberOfImage)
            {
                imageNumber++;
                lastButton = currentButton;
            }
            showImage(row, col, imageNumber, buttonElement);
        }
    }
    catch (exception) {
        alert('handleButtonClick Error:', exception);
    }  
}

function getRandomLoadingMessage() {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
}

const isTestingMode = false; // Set to false when not testing


function showImage(row, col, imgNumber, buttonElement) {
    try {
        const folderPath = `images_${currentTab_}/folder_${row}_${col}/`;
        const imageName = `${imgNumber}.png`;
        const imageFrame = document.getElementById("imageFrame");

        const IsBusyMessage = getRandomLoadingMessage(); // Get a random loading message
        imageFrame.innerHTML = '<div class="loading" style="color: white;"><div class="spinner"></div><div>'+ IsBusyMessage +'</div></div>';

        // Create new img element
        const img = new Image();
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        const loadImage = () => {
            const imageUrl = `${folderPath}${imageName}`;
            img.src = imageUrl;
            img.onload = () => {
                imageFrame.innerHTML = ''; // Clear loading indicator once the image has loaded
                imageFrame.appendChild(img);
                // Create and append the share icon
                const shareIcon = document.createElement("a");
                shareIcon.id = "shareIcon";
                shareIcon.innerHTML = '<img src="shareicon.svg" alt="Share" style="border: 2px solid white; border-radius: 50%;" />'; // Add border styling here
                shareIcon.style.position = "absolute";
                shareIcon.style.top = "5px";
                shareIcon.style.right = "5px";
                shareIcon.style.display = "block";
                shareIcon.style.cursor = "pointer";
                imageFrame.style.position = 'relative'; // Reinforce positioning context
                imageFrame.appendChild(shareIcon);

                shareIcon.addEventListener('click', function(event) {
                    try{
                    event.preventDefault();

                    downloadImage(imageUrl);

                    // Example: Share text via WhatsApp
                    const text = "Check out this image!";
                    const whatsappUrl = `https://wa.me/?image=${(imageUrl)}`;
                    window.open(whatsappUrl, '_blank');

                   
                 } catch (exception) {
                        alert('Error during sharing:', exception);
                    }   

                });
            };
            img.onerror = () => {
                imageFrame.innerHTML = '<div class="error">Error loading image</div>'; // Provide error handling
            };
        };

        if (isTestingMode) {
            // If in testing mode, delay loading
            setTimeout(loadImage, 2000); // Adjust delay as needed
        } else {
            // If not in testing mode, load immediately
            loadImage();
        }

        img.addEventListener('click', function () { handleButtonClick(buttonElement, row, col); });
    } catch (error) {
        alert("Error occurred while displaying the image: " + error.message);
    }
}

function downloadImage(imageUrl) {
    const imageDisplayUrl = 'image-display.html?image=' + encodeURIComponent(imageUrl);
    window.open(imageDisplayUrl, '_blank');
  }

document.getElementById('goToPaymentPage').addEventListener('click', function() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.country_code === "ZA") { // If the user is in South Africa
                window.location.href = 'payment.html'; // Redirect to Yoco payment
            } else { // If the user is not in South Africa
                window.location.href = 'payment_paypal.html'; // Redirect to PayPal payment
            }
        })
        .catch(error => {
            console.error('Error determining location:', error);
            // Fallback or default redirection in case the fetch fails
            window.location.href = 'payment_paypal.html';
        });
});

//document.getElementById('goToPaymentPage').addEventListener('click', function() {
//    window.location.href = 'payment.html' or window.location.href = 'payment_paypale.html'; // Assuming 'payment.html' is the payment form page
//});
document.getElementById('homebtn').addEventListener('click', function() {
window.location.href = 'index.html'; // Assuming 'payment.html' is the payment form page
});

function updateStylesBasedOnDevice() {
    // Define your media query for smaller devices like phones

    clearTables();

    const phoneMediaQuery = window.matchMedia("(max-width: 940px)");
    
    //alert("phoneMediaQuery.matches " + phoneMediaQuery.matches);


    if (phoneMediaQuery.matches) {
        
        buttonstylewidth = "94px"; 
        buttonstyleheight = "85px"; 
        imgstylewidth = "94px"; 
        imgstyleheight = "85px"; 
        buttonstylefontSize = "10px"; 
    } else {
        buttonstylewidth = "188px"; 
        buttonstyleheight = "170px"; 
        imgstylewidth = "188px"; 
        imgstyleheight = "170px"; 
        buttonstylefontSize = "18px"; 
    }

    handleTab(currentTab_);
}

function clearTables() {
    const tables = ["GlutesTable", "LegsTable", "ChestTable", "BackTable", "ShouldersTable", "ArmsTable", "StomachTable", "CardioTable", "MMATable", "NutritionTable"];
    tables.forEach(function(tableName) {
        const table = document.getElementById(tableName);
        while (table && table.rows.length > 0) {
            table.deleteRow(0);
        }
    });
    isSet.fill(false); // Reset the isSet array to indicate that tables need to be repopulated
}




