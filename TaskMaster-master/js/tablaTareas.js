function getData() {
    fetch('http://localhost:8000/task/tasks')
      .then((response) => response.json())
      .then((res) => {
        const html = res.map(item => `
          <div class="swim-lane p-3 bg-light border rounded m-2 text-center">
            <h3 class="heading">${item.status}</h3>
            <p class="task bg-white border rounded p-2 m-1" draggable="true">${item.title}</p>
          </div>
        `).join("");
  
        document.querySelector("#status").insertAdjacentHTML("afterbegin", html);  
      });
  }
  

  
  
  document.addEventListener('DOMContentLoaded', getData);
  

