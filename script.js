const steps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");
let currentStep = 0;
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      steps[currentStep].classList.remove("active");
      stepIndicators[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
      stepIndicators[currentStep].classList.add("active");
      if (currentStep === 3) showReview();
    }
  });
});
document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    stepIndicators[currentStep].classList.remove("active")
    currentStep--;
    steps[currentStep].classList.add("active");
    steps[currentStep].classList.add("active");
    stepIndicators[currentStep].classList.add("active");
  });
});
function validateStep(step) {
  let valid = true;
  const error = steps[step].querySelector(".error");
  error.textContent = "";

  if (step === 0) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "") {
      error.textContent = "Name is required";
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      error.textContent = "Invalid email format";
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      error.textContent = "Phone must be 10 digits";
      return false;
    }
  }
  if (step === 1) {
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value;
    if (street === "" || city === "" || country === "") {
      error.textContent = "Please fill all address fields";
      return false;
    }
  }

  if (step === 2) {

    const username = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (username.length < 4) {
      error.textContent = "Username must be at least 4 characters";
      return false;
    }

    if (pass.length < 6) {
      error.textContent = "Password must be at least 6 characters";
      return false;
    }

    if (pass !== confirm) {
      error.textContent = "Passwords do not match";
      return false;
    }

  }

  return valid;
}

function showReview() {

  const review = document.getElementById("review");

  review.innerHTML = `
    <p><strong>Name:</strong> ${document.getElementById("name").value}</p>
    <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
    <p><strong>Phone:</strong> ${document.getElementById("phone").value}</p>
    <p><strong>Street:</strong> ${document.getElementById("street").value}</p>
    <p><strong>City:</strong> ${document.getElementById("city").value}</p>
    <p><strong>Country:</strong> ${document.getElementById("country").value}</p>
    <p><strong>Username:</strong> ${document.getElementById("username").value}</p>
  `;

}
fetch("https://restcountries.com/v3.1/all")
.then(res => res.json())
.then(data => {

  const countrySelect = document.getElementById("country");

  data.sort((a,b)=>a.name.common.localeCompare(b.name.common));

  data.forEach(c => {

    const option = document.createElement("option");

    option.value = c.name.common;
    option.textContent = c.name.common;

    countrySelect.appendChild(option);

  });

});



document.getElementById("regForm").addEventListener("submit", e => {

  e.preventDefault();

  const formData = {

    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    street: document.getElementById("street").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
    username: document.getElementById("username").value,

  };


  fetch("https://jsonplaceholder.typicode.com/posts", {

    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }

  })
  .then(res => res.json())
  .then(() => {

    document.getElementById("formContainer").style.display = "none";
    document.getElementById("successPage").style.display = "block";

  });

});



document.getElementById("goHome").addEventListener("click", () => {

  location.reload();

});