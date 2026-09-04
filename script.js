let lastButton = null;
let lastNumberOfImage = 1;
let imageNumber = 0;
let isSet = Array(11).fill(false);

let buttonstylewidth = "94px";
let buttonstyleheight = "85px";
let imgstylewidth = "94px";
let imgstyleheight = "85px";
let buttonstylefontSize = "10px";
let currentTab_ = null;
const mediaVersion = "20260904-2";

const lastImage = {};
const lastVideo = {};
let imageMode = true;
let currentButtonClickName = "";
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
  "Gearing Up...",
];

function handleTab(currentTab) {
  currentTab_ = currentTab;

  // Define an array of setup functions for each tab.
  // The index in the array corresponds to the tab number minus one (since arrays are zero-indexed).
  const setupFunctions = [
    setGlutesTable, // Tab 1
    setLegs, // Tab 2
    setChestTable, // Tab 3
    setBackTable, // Tab 4
    setShouldersTable, // Tab 5
    setArmsTable, // Tab 6
    setStomachTable, // Tab 7
    setCardioTable, // Tab 8
    // Add more as needed
  ];

  if (
    currentTab >= 1 &&
    currentTab <= setupFunctions.length &&
    !isSet[currentTab]
  ) {
    //alert(" if (currentTab_  " + currentTab + " >= 1 && <= setupFunctions.length: " + setupFunctions.length + " && isSet[currentTab]: " + isSet[currentTab] );

    setupFunctions[currentTab - 1](); // Call the corresponding setup function
    isSet[currentTab] = true; // Mark as set
  }
}

function drawDefaultImage(currentTab) {
  const imageFrame = document.getElementById("imageFrame");
  imageFrame.innerHTML = "";
  let imagename = "";
  currentTab_ = currentTab;
  if (currentTab == 1) {
    imagename = "glutes.png";
  } else if (currentTab == 2) {
    imagename = "squats.png";
  } else if (currentTab == 3) {
    imagename = "chest.png";
  } else if (currentTab == 4) {
    imagename = "back.png";
  } else if (currentTab == 5) {
    imagename = "shoulders.png";
  } else if (currentTab == 6) {
    imagename = "arms.png";
  } else if (currentTab == 7) {
    imagename = "stomach.png";
  } else {
    imagename = "cardio.png";
  }

  // Create new img element
  const img = new Image();
  img.src = `${imagename}?v=${mediaVersion}`;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";

  imageFrame.appendChild(img);
}
// Function to set the current tab and refresh the table content
function setTab(tabNumber) {
  currentTab_ = tabNumber;
  imageNumber = 0;
  videoNumber = 0;
  imageMode = true;
  currentButtonClickName = "";
  lastButton = null;
  lastButtonElement = null;

  // Keep the landing page uncluttered until the user chooses a category.
  document.getElementById("workoutContent").hidden = false;
  document.getElementById("landingPrompt").hidden = true;

  document.querySelectorAll(".table").forEach(function (table) {
    table.style.display = "none";
  });
  var selectedTable = document.getElementById(getTableName(tabNumber));
  if (selectedTable) {
    selectedTable.style.display = "table";
  }

  handleTab(currentTab_);
  drawDefaultImage(currentTab_);
}

function showHomePage() {
  currentTab_ = null;
  document.getElementById("workoutContent").hidden = true;
  document.getElementById("landingPrompt").hidden = false;

  document.querySelectorAll(".table").forEach(function (table) {
    table.style.display = "none";
  });
}

function getTableName(tabNumber) {
  switch (tabNumber) {
    case 1:
      return "GlutesTable";
    case 2:
      return "LegsTable";
    case 3:
      return "ChestTable";
    case 4:
      return "BackTable";
    case 5:
      return "ShouldersTable";
    case 6:
      return "ArmsTable";
    case 7:
      return "StomachTable";
    case 8:
      return "CardioTable";
    case 9:
      return "MMATable";
    case 10:
      return "NutritionTable";
    default:
      return "";
  }
}

function setGlutesTable() {
  try {
    const table = document.getElementById("GlutesTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 1 && j === 4) ||
          (i === 1 && j === 0) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 4) ||
          (i === 2 && j === 0) ||
          (i === 1 && j === 2) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 2) ||
          (i === 3 && j === 2) ||
          (i === 3 && j === 4) ||
          (i === 4 && j === 4)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Reverse Hack Squats";
            lastImage["Reverse Hack Squats"] = 3;
            lastVideo["Reverse Hack Squats"] = 6;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Good Mornings";
            lastImage["Good Mornings"] = 3;
            lastVideo["Good Mornings"] = 8;
          }
          if (i === 0 && j === 4) {  // 0 4
            button.textContent = "Donkey Kicks";
            lastImage["Donkey Kicks"] = 3;
            lastVideo["Donkey Kicks"] = 7;
          }
          if (i === 2 && j === 4) {
            button.textContent = "Single Leg Glute Extensions Side";
            lastImage["Single Leg Glute Extensions Side"] = 3;
            lastVideo["Single Leg Glute Extensions Side"] = 6;
          }
          if (i === 1 && j === 4) {
            button.textContent = "Single Leg Glute Extensions Back";
            lastImage["Single Leg Glute Extensions Back"] = 3;
            lastVideo["Single Leg Glute Extensions Back"] = 7;
          }
          if (i === 1 && j === 0) {
            button.textContent = "Bulgarian Split Squats";
            lastImage["Bulgarian Split Squats"] = 3;
            lastVideo["Bulgarian Split Squats"] = 6;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Single Angle Leg Press";
            lastImage["Single Angle Leg Press"] = 3;
            lastVideo["Single Angle Leg Press"] = 5;
          }
         
         
          if (i === 2 && j === 0) {
            button.textContent = "Step Ups";
            lastImage["Step Ups"] = 3;
            lastVideo["Step Ups"] = 7;
          }

          if (i === 4 && j === 0) {
            button.textContent = "Side Lunge";
            lastImage["Side Lunge"] = 4;
            lastVideo["Side Lunge"] = 6;
          }
          if (i === 1 && j === 2) { 
            button.textContent = "Hip Thrust";
            lastImage["Hip Thrust"] = 3;
            lastVideo["Hip Thrust"] = 7;
          }

          if (i === 4 && j === 2) {
            button.textContent = "Hip Abductions";
            lastImage["Hip Abductions"] = 3;
            lastVideo["Hip Abductions"] = 7;
          }
          
      
          if (i === 4 && j === 4) {
            button.textContent = "Back Extension";
            lastImage["Back Extension"] = 3;
            lastVideo["Back Extension"] = 6;
          }

          if (i === 3 && j === 2) {
            button.textContent = "RDLs";
            lastImage["RDLs"] = 3;
            lastVideo["RDLs"] = 6;
          }
          if (i === 3 && j === 4) {
            button.textContent = "Reverse Leg Extensions";
            lastImage["Reverse Leg Extensions"] = 3;
            lastVideo["Reverse Leg Extensions"] = 6;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setLegs() {
  try {
    const table = document.getElementById("LegsTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 4) ||
          (i === 4 && j === 2) 
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Squats";
            lastImage["Squats"] = 3;
            lastVideo["Squats"] = 7;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Leg Press";
            lastImage["Leg Press"] = 3;
            lastVideo["Leg Press"] = 4;
          }
          if (i === 2 && j === 0) {
            button.textContent = "Calf Raises";
            lastImage["Calf Raises"] = 3;
            lastVideo["Calf Raises"] = 4;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Lunges";
            lastImage["Lunges"] = 3;
            lastVideo["Lunges"] = 9;
          }
         
          if (i === 2 && j === 4) {
            button.textContent = "Hack Squats";
            lastImage["Hack Squats"] = 3;
            lastVideo["Hack Squats"] = 6;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Lying Leg Curls";
            lastImage["Lying Leg Curls"] = 4;
            lastVideo["Lying Leg Curls"] = 6;
          }
          if (i === 4 && j === 2) {
            button.textContent = "Leg Extensions";
            lastImage["Leg Extensions"] = 3;
            lastVideo["Leg Extensions"] = 5;
          }
          

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setChestTable() {
  try {
    const table = document.getElementById("ChestTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 4) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 4) 
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Flat Bench Press";
            lastImage["Flat Bench Press"] = 3;
            lastVideo["Flat Bench Press"] = 7;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Incline Dumbell Press";
            lastImage["Incline Dumbell Press"] = 3;
            lastVideo["Incline Dumbell Press"] = 5;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Close-Grip Bench Press";
            lastImage["Close-Grip Bench Press"] = 3;
            lastVideo["Close-Grip Bench Press"] = 5;
          }
          if (i === 2 && j === 0) {
            button.textContent = "Decline Bench Press";
            lastImage["Decline Bench Press"] = 3;
            lastVideo["Decline Bench Press"] = 7;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Front Raises";
            lastImage["Front Raises"] = 4;
            lastVideo["Front Raises"] = 7;
          }
          if (i === 4 && j === 4) {
            button.textContent = "Cross Over Chest Cables";
            lastImage["Cross Over Chest Cables"] = 3;
            lastVideo["Cross Over Chest Cables"] = 5;
          }
          if (i === 2 && j === 4) {
            button.textContent = "Flys";
            lastImage["Flys"] = 3;
            lastVideo["Flys"] = 6;
          }
          if (i === 4 && j === 0) {
            button.textContent = "Peck Deck Flys";
            lastImage["Peck Deck Flys"] = 3;
            lastVideo["Peck Deck Flys"] = 5;
          }
        

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setBackTable() {
  try {
    const table = document.getElementById("BackTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 1 && j === 2) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 4) ||
          (i === 3 && j === 0) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 2) ||
          (i === 4 && j === 4)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Back Press";
            lastImage["Back Press"] = 3;
            lastVideo["Back Press"] = 6;
          }
          if (i === 0 && j === 2) {
            button.textContent = "One Arm Dumbbell Rows";
            lastImage["One Arm Dumbbell Rows"] = 3;
            lastVideo["One Arm Dumbbell Rows"] = 6;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Reverse Fly";
            lastImage["Reverse Fly"] = 3;
            lastVideo["Reverse Fly"] = 6;
          }
          if (i === 1 && j === 2) {
            button.textContent = "Dead Lifts";
            lastImage["Dead Lifts"] = 3;
            lastVideo["Dead Lifts"] = 6;
          }
          if (i === 2 && j === 0) {
            button.textContent = "Lat Pulldowns";
            lastImage["Lat Pulldowns"] = 3;
            lastVideo["Lat Pulldowns"] = 7;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Rear Lat Pulldowns";
            lastImage["Rear Lat Pulldowns"] = 3;
            lastVideo["Rear Lat Pulldowns"] = 4;
          }
          if (i === 2 && j === 4) {
            button.textContent = "Seated Row";
            lastImage["Seated Row"] = 3;
            lastVideo["Seated Row"] = 6;
          }
          if (i === 3 && j === 0) {
            button.textContent = "Lat Pullup";
            lastImage["Lat Pullup"] = 3;
            lastVideo["Lat Pullup"] = 10;
          }
          if (i === 4 && j === 0) {
            button.textContent = "Close Grip Lat Pulldown";
            lastImage["Close Grip Lat Pulldown"] = 3;
            lastVideo["Close Grip Lat Pulldown"] = 5;
          }
          if (i === 4 && j === 2) {
            button.textContent = "Straight Arm Lat Pulldown";
            lastImage["Straight Arm Lat Pulldown"] = 3;
            lastVideo["Straight Arm Lat Pulldown"] = 7;
          }
          if (i === 4 && j === 4) {
            button.textContent = "Face Pull";
            lastImage["Face Pull"] = 3;
            lastVideo["Face Pull"] = 5;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setShouldersTable() {
  try {
    const table = document.getElementById("ShouldersTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 4) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 2) ||
          (i === 4 && j === 4)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Shoulder Press";
            lastImage["Shoulder Press"] = 3;
            lastVideo["Shoulder Press"] = 8;
          }
          
          
          if (i === 0 && j === 4) {
            button.textContent = "Shrugs";
            lastImage["Shrugs"] = 3;
            lastVideo["Shrugs"] = 4;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Lateral Raises";
            lastImage["Lateral Raises"] = 3;
            lastVideo["Lateral Raises"] = 6;
          }
          if (i === 2 && j === 4) {
            button.textContent = "Dumbell Front Raises";
            lastImage["Dumbell Front Raises"] = 3;
            lastVideo["Dumbell Front Raises"] = 5;
          }
          if (i === 2 && j === 0) {
            button.textContent = "Incline Front Raises";
            lastImage["Incline Front Raises"] = 3;
            lastVideo["Incline Front Raises"] = 4;
          }
          if (i === 4 && j === 0) {
            button.textContent = "Incline Reverse Flys";
            lastImage["Incline Reverse Flys"] = 3;
            lastVideo["Incline Reverse Flys"] = 5;
          }
          if (i === 4 && j === 2) {
            button.textContent = "Upright Rows";
            lastImage["Upright Rows"] = 3;
            lastVideo["Upright Rows"] = 6;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Hamer Lat Pull Down Deltoids";
            lastImage["Hamer Lat Pull Down Deltoids"] = 3;
            lastVideo["Hamer Lat Pull Down Deltoids"] = 5;
          }
          if (i === 4 && j === 4) {
            button.textContent = "Cable Rear Delt Fly";
            lastImage["Cable Rear Delt Fly"] = 3;
            lastVideo["Cable Rear Delt Fly"] = 7;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setArmsTable() {
  try {
    const table = document.getElementById("ArmsTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 2) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 2) ||
          (i === 4 && j === 4)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Biceps Hammer Curls";
            lastImage["Biceps Hammer Curls"] = 3;
            lastVideo["Biceps Hammer Curls"] = 4;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Cable Overhead Bicep Curl";
            lastImage["Cable Overhead Bicep Curl"] = 3;
            lastVideo["Cable Overhead Bicep Curl"] = 4;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Bicep Barbell Curls";
            lastImage["Bicep Barbell Curls"] = 3;
            lastVideo["Bicep Barbell Curls"] = 5;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Reverse EZ Barbell Curls";
            lastImage["Reverse EZ Barbell Curls"] = 3;
            lastVideo["Reverse EZ Barbell Curls"] = 4;
          }
          if (i === 4 && j === 0) {
            button.textContent = "Skullcrushers, Tricep Kickbacks and Overhead Extensions";
            lastImage["Skullcrushers, Tricep Kickbacks and Overhead Extensions"] = 3;
            lastVideo["Skullcrushers, Tricep Kickbacks and Overhead Extensions"] = 8;
          }
          
          if (i === 4 && j === 2) {
            button.textContent = "Machine Tricep Dips";
            lastImage["Machine Tricep Dips"] = 3;
            lastVideo["Machine Tricep Dips"] = 5;
          }

          if (i === 4 && j === 4) {
            button.textContent = "Triceps Pushdowns";
            lastImage["Triceps Pushdowns"] = 3;
            lastVideo["Triceps Pushdowns"] = 5;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setStomachTable() {
  try {
    const table = document.getElementById("StomachTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 4) ||
          (i === 2 && j === 2)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 2) {
            button.textContent = "Upper Abs";
            lastImage["Upper Abs"] = 4;
            lastVideo["Upper Abs"] = 5;
          }
          if (i === 0 && j === 0) {
            button.textContent = "Lower Abs";
            lastImage["Lower Abs"] = 4;
            lastVideo["Lower Abs"] = 5;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Six Pack";
            lastImage["Six Pack"] = 4;
            lastVideo["Six Pack"] = 5;
          }
          if (i === 2 && j === 0) {
            button.textContent = "Obliques";
            lastImage["Obliques"] = 5;
            lastVideo["Obliques"] = 6;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Complete";
            lastImage["Complete"] = 4;
            lastVideo["Complete"] = 6;
          }
          if (i === 2 && j === 4) {
            button.textContent = "Core";
            lastImage["Core"] = 5;
            lastVideo["Core"] = 6;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

function setCardioTable() {
  try {
    const table = document.getElementById("CardioTable");
    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 5; j++) {
        const cell = row.insertCell();
        // Add buttons to corner, middle, and center cells
        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 4) ||
          (i === 2 && j === 2) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 4)
        ) {
          // Button configuration
          const button = document.createElement("button");
          button.style.backgroundColor = "rgba(211, 211, 211, 0.3)";
          button.style.boxShadow =
            "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 5px 15px rgba(255, 255, 255, 0.3)";
          button.style.backgroundImage =
            "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(211, 211, 211, 0.3))";
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
          if (i === 0 && j === 0) {
            button.textContent = "Steps";
            lastImage["Steps"] = 4;
            lastVideo["Steps"] = 5;
          }
          if (i === 0 && j === 2) {
            button.textContent = "Treadmill";
            lastImage["Treadmill"] = 3;
            lastVideo["Treadmill"] = 4;
          }
          if (i === 0 && j === 4) {
            button.textContent = "Spinning";
            lastImage["Spinning"] = 3;
            lastVideo["Spinning"] = 4;
          }
          if (i === 2 && j === 2) {
            button.textContent = "Yoga";
            lastImage["Yoga"] = 3;
            lastVideo["Yoga"] = 5;
          }
          if (i === 4 && j === 0) {
            button.textContent = "Rowing";
            lastImage["Rowing"] = 4;
            lastVideo["Rowing"] = 5;
          }
          if (i === 4 && j === 4) {
            button.textContent = "Boxing";
            lastImage["Boxing"] = 3;
            lastVideo["Boxing"] = 5;
          }

          // Image configuration
          const img = document.createElement("img");
          const folderPath = `images_${currentTab_}/folder_${i}_${j}/`;
          const imageName = `1.png`;
          img.style.width = imgstylewidth; // Adjust as needed
          img.style.height = imgstyleheight; // Adjust as needed
          img.alt = button.textContent;
          img.src = `${folderPath}${imageName}?v=${mediaVersion}`;
          img.style.position = "absolute";
          img.style.top = "0"; // Align with button
          img.style.left = "0"; // Align with button
          img.style.zIndex = "1"; // Ensures image is below button

          // Append elements to cell
          cell.style.position = "relative"; // Needed for absolute positioning within cell
          cell.appendChild(button);
          cell.appendChild(img);

          // Button click event
          button.onclick = function () {
            handleButtonClick(this, i, j);
          };
          img.addEventListener("click", function () {
            handleButtonClick(this, i, j);
          });
        }
      }
    }
  } catch (error) {
    alert("Error occurred while setting up the table: " + error.message);
  }

  const backButton = document.getElementById("backbtn");
  backButton.textContent = "Back"; // Set the text for the back button
  backButton.onclick = function () { Back(); };
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("resize", updateStylesBasedOnDevice);

  updateStylesBasedOnDevice();
});

function getRandomLoadingMessage() {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  return loadingMessages[randomIndex];
}

function handleButtonClick(buttonElement, row, col) {
  try {
    //alert("handleButtonClick");

    lastButtonElement = buttonElement;

    const currentButtonClickName_ = buttonElement.innerHTML;

    const currentButton = `${row}_${col}`;

    if (currentButtonClickName != currentButtonClickName_) {
      imageNumber = 0;

      //alert(row + '_' + col);
    }
    currentButtonClickName = currentButtonClickName_;

    lastNumberOfImage = lastImage[currentButtonClickName];
    const lastNumberOfVideos = lastVideo[currentButtonClickName];

    //alert("currentButtonClickName: " + currentButtonClickName + " imageNumber: " + imageNumber + " - lastNumberOfImage: " + lastNumberOfImage)

    

    //alert("lastNumberOfVideos: " + lastNumberOfVideos + " videoNumber: " + videoNumber + " - imageNumber: " + imageNumber)

    if (imageNumber >= lastNumberOfImage) {
      imageMode = false;
    }
    if (imageNumber <= lastNumberOfImage) {
      if (imageNumber < lastNumberOfImage) {
        imageNumber++;
        lastButton = currentButton;
        showImage(row, col, imageNumber, buttonElement);
        imageMode = true;
      }
    }
    if (imageMode == false) {
      if (imageNumber <= lastNumberOfVideos) {
        if (imageNumber < lastNumberOfVideos) {
          imageNumber++;
          lastButton = currentButton;
        }
        showVideo(row, col, imageNumber, buttonElement);
        imageMode = false;
        //alert('imageMode: ' + imageMode);
      }
    }
  } catch (exception) {
    alert("handleButtonClick Error:", exception);
  }
}

const isTestingMode = false; // Set to false when not testing

function showImage(row, col, imgNumber, buttonElement) {
  try {
    const folderPath = `images_${currentTab_}/folder_${row}_${col}/`;
    const imageName = `${imgNumber}.png`;
    const imageFrame = document.getElementById("imageFrame");

    const IsBusyMessage = getRandomLoadingMessage(); // Get a random loading message
    imageFrame.innerHTML =
      '<div class="loading" style="color: white;"><div class="spinner"></div><div>' +
      IsBusyMessage +
      "</div></div>";

    // Create new img element
    const img = new Image();
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    const loadImage = () => {
      const imageUrl = `${folderPath}${imageName}?v=${mediaVersion}`;
      img.src = imageUrl;
      img.onload = () => {
        imageFrame.innerHTML = ""; // Clear loading indicator once the image has loaded
        imageFrame.appendChild(img);
        // Create and append the share icon
        const shareIcon = document.createElement("a");
        shareIcon.id = "shareIcon";
        shareIcon.innerHTML =
          '<img src="shareicon.svg" alt="Share" style="border: 2px solid white; border-radius: 50%;" />'; // Add border styling here
        shareIcon.style.position = "absolute";
        shareIcon.style.top = "5px";
        shareIcon.style.right = "5px";
        shareIcon.style.display = "block";
        shareIcon.style.cursor = "pointer";
        imageFrame.style.position = "relative"; // Reinforce positioning context
        imageFrame.appendChild(shareIcon);

        shareIcon.addEventListener("click", function (event) {
          try {
            event.preventDefault();

            downloadImage(imageUrl);

            // Example: Share text via WhatsApp
            const text = "Check out this image!";
            const whatsappUrl = `https://wa.me/?image=${imageUrl}`;
            window.open(whatsappUrl, "_blank");
          } catch (exception) {
            alert("Error during sharing:", exception);
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

    img.addEventListener("click", function () {
      handleButtonClick(buttonElement, row, col);
    });
  } catch (error) {
    alert("Error occurred while displaying the image: " + error.message);
  }
}

function showVideo(row, col, imgNumber, buttonElement) {
  try {
    const folderPath = `images_${currentTab_}/folder_${row}_${col}/`;
    const videoName = `${imgNumber}.mp4`;
    const videoUrl = `${folderPath}${videoName}?v=${mediaVersion}`;
    const imageFrame = document.getElementById("imageFrame");

    //alert("folderPath: " + folderPath + " videoName: " + videoName + " - videoUrl: " + videoUrl)

    imageFrame.innerHTML = "";

    const videoPlayer = document.createElement("video");
    videoPlayer.id = "videoPlayer";
    videoPlayer.autoplay = true;
    videoPlayer.muted = true;
    videoPlayer.controls = true;
    videoPlayer.playsInline = true;
    videoPlayer.preload = "auto";
    videoPlayer.style.width = "100%";
    videoPlayer.style.height = "100%";
    videoPlayer.style.objectFit = "contain";
    videoPlayer.src = videoUrl;

    videoPlayer.addEventListener("error", () => {
      imageFrame.innerHTML = `<div class="error">Error loading video: ${videoName}</div>`;
    });
    videoPlayer.addEventListener("ended", () => {
      //alert('Video playback finished.');
    });

    imageFrame.appendChild(videoPlayer);
    videoPlayer.load();
    videoPlayer.play().catch(() => {
      // Browser autoplay policies may require the user to press Play.
    });
  } catch (error) {
    alert("Error occurred while displaying the video: " + error.message);
  }
}

function Back() {
  try {
    if (imageNumber > 1) {
      // Ensure imageNumber doesn't go below 1
      imageNumber--;
      if (lastButton) {
        const parts = lastButton.split("_"); // Assuming lastButton format is 'row_col'
        const row = parseInt(parts[0], 10);
        const col = parseInt(parts[1], 10);

        if (imageNumber <= lastNumberOfImage) {
          imageMode = true;
        }

        if (imageMode == true) {
          showImage(row, col, imageNumber, lastButtonElement); // Display the previous image
        } else {
          showVideo(row, col, imageNumber, lastButtonElement); // Display the previous video
        }
      }
    }
  } catch (error) {
    alert("Error on back button: " + error.message);
  }
}

function downloadImage(imageUrl) {
  const imageDisplayUrl =
    "image-display.html?image=" + encodeURIComponent(imageUrl);
  window.open(imageDisplayUrl, "_blank");
}

//document.getElementById('goToPaymentPage').addEventListener('click', function() {
//    window.location.href = 'payment.html' or window.location.href = 'payment_paypale.html'; // Assuming 'payment.html' is the payment form page
//});
const homeButton = document.getElementById("homebtn");
if (homeButton) {
  homeButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Assuming 'payment.html' is the payment form page
  });
}

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

  // A resize should rebuild only a category the user has already selected.
  if (currentTab_ !== null) {
    handleTab(currentTab_);
  }
}

function clearTables() {
  const tables = [
    "GlutesTable",
    "LegsTable",
    "ChestTable",
    "BackTable",
    "ShouldersTable",
    "ArmsTable",
    "StomachTable",
    "CardioTable",
    "MMATable",
    "NutritionTable",
  ];
  tables.forEach(function (tableName) {
    const table = document.getElementById(tableName);
    while (table && table.rows.length > 0) {
      table.deleteRow(0);
    }
  });
  isSet.fill(false); // Reset the isSet array to indicate that tables need to be repopulated
}
