function getData() {
    fetch('http://localhost:8000/panel/panels')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        const response = res;
        const html = res.map(function(item) {
          return `
            <div class="card-body d-flex flex-column board-style">
              <h2 class="card-title">${item.title}</h2>
              <h6 class="card-subtitle mb-2 text-body-secondary">${item.subtitle}</h6>
              <p class="card-text flex-grow-1 pt-3 pb-3">${item.description}</p>
              <div class="mt-auto borrado">
                <a href="./board.html" class="btn" style="background-color: #6699cc; color: aliceblue; border: 0px;">Acceder</a>
                <button class="btn btn-danger" type="button" data-id="board-Programacion" data-bs-toggle="modal" data-bs-target="#deleteModal" style="background-color: #ff6666; border: 0px;">Borrar</button>
              </div>
            </div>`;
        }).join("");
        document.querySelector("#pizarras").insertAdjacentHTML("afterbegin", html);
        console.log(response);
      });
  }
  
  document.addEventListener('DOMContentLoaded', getData);
  