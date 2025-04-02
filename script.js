/*function fetchOpportunities() {
    let opportunities = [
        "Teach English to refugees",
        "Help at a food bank",
        "Clean up a local park",
        "Mentor a student online"
    ];

    let list = document.getElementById("opportunities");
    list.innerHTML = ""; 
    opportunities.forEach(opportunity => {
        let li = document.createElement("li");
        li.textContent = opportunity;
        list.appendChild(li);
    });
}

function fetchCharities() {
    let charities = [
        "Save The Children",
        "Local Food Bank",
        "Animal Shelter Rescue",
        "Education for All Foundation"
    ];

    let list = document.getElementById("charities");
    list.innerHTML = ""; 
    charities.forEach(charity => {
        let li = document.createElement("li");
        li.textContent = charity;
        list.appendChild(li);
    });
}*/
const ACCESS_TOKEN = "patAbCdEfGHiJkLmNOpQrStUvWxYz123456";  // Replace with your real token
const BASE_ID = "YOUR_AIRTABLE_BASE_ID";  // Get from Step 5
const TABLE_NAME = "Table 1";  // Change if needed

async function addVolunteer(name, email, role) {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    const body = {
        fields: {
            "Full Name": name,
            "Email": email,
            "Role (Volunteer/Charity)": role
        }
    };

    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    alert("Data saved to Airtable!");
}

document.getElementById("submit").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    addVolunteer(name, email, role);
});

