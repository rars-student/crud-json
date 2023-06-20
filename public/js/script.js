// public/js/script.js

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Enviar os dados para o servidor (usar AJAX ou Fetch)
  // Exemplo de requisição com Fetch:
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(response => response.json())
    .then(data => {
      // Exibir mensagem de sucesso ou erro na página
      const message = document.getElementById("message");
      if (data.error) {
        message.textContent = data.error;
        message.style.color = "red";
      } else {
        message.textContent = "Usuário cadastrado com sucesso!";
        message.style.color = "green";
        form.reset();
      }
    })
    .catch(error => {
      console.log(error);
      // Exibir mensagem de erro na página
      const message = document.getElementById("message");
      message.textContent = "Ocorreu um erro ao cadastrar o usuário.";
      message.style.color = "red";
    });
});
