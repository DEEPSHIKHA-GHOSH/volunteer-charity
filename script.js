const ACCESS_TOKEN = "YOUR_AIRTABLE_ACCESS_TOKEN"; // Replace with actual API key
const BASE_ID = "YOUR_AIRTABLE_BASE_ID"; // Replace with actual Base ID
const TABLE_NAME = "Table 1"; // Adjust if needed

async function addAndMatchUser(name, email, role, skillsNeeds) {  
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    const userData = {  
        fields: {  
            "Full Name": name,  
            "Email": email,  
            "Role (Volunteer/Charity)": role,  
            "Skills/Needs": skillsNeeds  
        }  
    };  

    // Store user in Airtable
    await fetch(url, {  
        method: "POST",  
        headers: {  
            "Authorization": `Bearer ${ACCESS_TOKEN}`,  
            "Content-Type": "application/json"  
        },  
        body: JSON.stringify(userData)  
    });

    alert("Your details have been saved! Searching for matches...");

    // Find matches
    findMatches(role, skillsNeeds);
}

async function findMatches(role, skillsNeeds) {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    const response = await fetch(url, {  
        headers: {  
            "Authorization": `Bearer ${ACCESS_TOKEN}`  
        }  
    });  
    const data = await response.json();  

    const matchResults = document.getElementById("matchResults");
    matchResults.innerHTML = "";

    const searchFor = role === "Volunteer" ? "Charity" : "Volunteer";

    data.records.forEach(record => {
        const recordRole = record.fields["Role (Volunteer/Charity)"];
        const recordSkills = record.fields["Skills/Needs"];

        if (recordRole === searchFor && recordSkills.toLowerCase().includes(skillsNeeds.toLowerCase())) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${record.fields["Full Name"]}</strong> - ${record.fields["Email"]} (${recordSkills})`;
            matchResults.appendChild(listItem);
        }
    });

    if (matchResults.innerHTML === "") {
        matchResults.innerHTML = "<li>No matches found. Try a different skill.</li>";
    }
}

// Event Listener for Submit Button
document.getElementById("submit").addEventListener("click", () => {  
    const name = document.getElementById("name").value;  
    const email = document.getElementById("email").value;  
    const role = document.querySelector('input[name="role"]:checked').value;  
    const skillsNeeds = document.getElementById("skills").value;

    addAndMatchUser(name, email, role, skillsNeeds);
});
