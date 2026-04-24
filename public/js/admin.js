let allData = [];

async function loadData() {
    const res = await fetch("/api/contacts");
    const data = await res.json();

    allData = data; // store full data
    displayData(data);

    // update count
    const countEl = document.getElementById("count");
    if (countEl) {
        countEl.textContent = "Total Messages: " + data.length;
    }
}

// display table data
function displayData(data) {
    const table = document.getElementById("table-body");
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No messages found</td></tr>";
        return;
    }

    data.forEach(c => {
        const row = `
            <tr>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.message}</td>
                <td>
                    <button onclick="deleteMsg('${c._id}')">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// delete function
async function deleteMsg(id) {
    if (!confirm("Delete this message?")) return;

    await fetch("/delete/" + id, {
        method: "POST"
    });

    loadData(); // reload after delete
}

// search functionality
const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();

        const filtered = allData.filter(c =>
            c.name.toLowerCase().includes(value) ||
            c.email.toLowerCase().includes(value) ||
            c.message.toLowerCase().includes(value)
        );

        displayData(filtered);
    });
}

// initial load
loadData();