// WHEN the Submit button is clicked
// IF a required field is empty
// block submission
// and add "error" class to field
// and to error message
// ELSE show success message

// IF consent is checked
// change checkbox label

const successPopup = document.getElementById("success-popup");

const inputs = document.querySelectorAll("input");

const message = document.getElementById("message");

const fields: Record<any, any> = [...inputs, message];

const submit = document.getElementById("submit");

const handleSubmit = (e) => {
  let radioName;
  let radioIsChecked = false;
  let checkboxIsChecked = true;
  let hasFieldValue = true;
  let hasError = false;

  fields.map((field) => {
    if (field.type === "submit") {
      return;
    }

    if (field.hasAttribute("required")) {
      if (field.type === "radio") {
        radioName = field.name;
        field.checked && (radioIsChecked = true);
      }

      if (field.type === "checkbox") {
        if (!field.checked) {
          document.getElementById(`${field.name}-error`).classList.add("error");
          checkboxIsChecked = false;
        } else {
          document
            .getElementById(`${field.name}-error`)
            .classList.remove("error");
        }
      }

      if (field.type === "text" || field.type === "textarea") {
        if (field.value === "") {
          document.getElementById(`${field.name}-error`).classList.add("error");
          hasFieldValue = false;
        } else {
          document
            .getElementById(`${field.name}-error`)
            .classList.remove("error");
        }
      }
    }
  });

  if (!radioIsChecked) {
    document.getElementById(`${radioName}-error`).classList.add("error");
  } else {
    document.getElementById(`${radioName}-error`).classList.remove("error");
  }

  if (!radioIsChecked || !checkboxIsChecked || !hasFieldValue) {
    hasError = true;
    return;
  }

  successPopup.classList.add("success");
  e.preventDefault();
};

submit.addEventListener("click", handleSubmit);
