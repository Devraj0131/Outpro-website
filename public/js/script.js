const form = document.querySelector('.contact-form');
const links = document.querySelectorAll('.nav-links a');
const messageDiv = document.getElementById('form-message');
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});



if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        };

        try {
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.text();

            // Clear previous message
            if (messageDiv) {
                messageDiv.innerHTML = "";
            }

            // Create new div
            const msg = document.createElement("div");
            msg.textContent = result;
            msg.style.color = "green";
            msg.style.marginTop = "10px";

            messageDiv.appendChild(msg);

            form.reset();

        } catch (err) {
            if (messageDiv) {
                messageDiv.innerHTML = "<div style='color:red;'>Something went wrong!</div>";
            }
        }
    });
}

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle) {
    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}