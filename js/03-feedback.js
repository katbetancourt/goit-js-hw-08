import throttle from "lodash.throttle";

// Obtén una referencia al formulario y sus elementos
const feedbackForm = document.querySelector(".feedback-form");
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

// Función para guardar el estado del formulario en el almacenamiento local
function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(formState));
}

// Función para cargar el estado del formulario desde el almacenamiento local
function loadFormState() {
  const storedState = localStorage.getItem("feedback-form-state");
  if (storedState) {
    const formState = JSON.parse(storedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
}

// Throttle la función saveFormState para no guardar más de una vez cada 500ms
const saveFormStateThrottled = throttle(saveFormState, 500);

// Cargar el estado del formulario al cargar la página
loadFormState();

// Escuchar el evento 'input' en los campos del formulario para guardar el estado
emailInput.addEventListener("input", saveFormStateThrottled);
messageTextarea.addEventListener("input", saveFormStateThrottled);

// Escuchar el evento 'submit' del formulario
feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  // Obtener el estado actual del formulario
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Limpiar el almacenamiento local
  localStorage.removeItem("feedback-form-state");

  // Emitir el objeto con los valores actuales a la consola
  console.log(formState);

  // Limpiar los campos del formulario
  emailInput.value = "";
  messageTextarea.value = "";
});
