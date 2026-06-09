const eventList = document.querySelector("#event-list");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  eventList.appendChild(li);
}

function loadEvents() {
  fetch("http://localhost:5000/events")
    .then((response) => response.json())
    .then((events) => {
      eventList.innerHTML = "";
      events.forEach(renderEvent);
    })
    .catch((error) => {
      console.error("Error loading events:", error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    alert("Please enter an event title.");
    return;
  }

  fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      return response.json();
    })
    .then((newEvent) => {
      renderEvent(newEvent);
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding event:", error);
    });
});

loadEvents();