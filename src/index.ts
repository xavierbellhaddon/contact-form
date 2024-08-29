const successPopup = document.getElementById("success-popup");

const inputs = document.querySelectorAll("input");

const message = document.getElementById("message");

const fields: Record<any, any> = [...inputs, message];

const submit = document.getElementById("submit");

const emailRegex = new RegExp(
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

const consent = document.getElementById("consent") as HTMLInputElement;

const consentLabel = document.getElementById("consent-label-span");

consent.addEventListener("change", () => {
  consent.checked
    ? (consentLabel.innerHTML =
        'I hereby consent to being contacted by the team <span class="asterisk">*</span></span>')
    : (consentLabel.innerHTML =
        'I consent to being contacted by the team <span class="asterisk">*</span></span>');
});

const handleSubmit = (e) => {
  let radioName;
  let radioIsChecked = false;
  let checkboxIsChecked = true;
  let hasFieldValue = true;
  let hasError = false;

  e.preventDefault();

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
        if (
          field.value === "" ||
          (field.name === "email" && !emailRegex.test(field.value))
        ) {
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
};

submit.addEventListener("click", handleSubmit);
