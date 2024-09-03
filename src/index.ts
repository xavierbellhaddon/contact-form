const inputs = document.querySelectorAll("input");

const message = document.getElementById("message");

const fields: Record<any, any> = [...inputs, message];

const submit = document.getElementById("submit");

const consent = document.getElementById("consent") as HTMLInputElement;

const consentLabel = document.getElementById("consent-label-span");

const successPopup = document.getElementById("success-popup");

const emailRegex = new RegExp(
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

consent.addEventListener("change", () => {
  consent.checked
    ? (consentLabel.innerHTML =
        'I hereby consent to being contacted by the team <span class="asterisk">*</span></span>')
    : (consentLabel.innerHTML =
        'I consent to being contacted by the team <span class="asterisk">*</span></span>');
});

const handleError = (input, hasError: boolean) => {
  if (hasError) {
    document.getElementById(`${input.name}-error`).classList.add("error");
    document
      .querySelectorAll(`input[name="${input.name}"]`)
      .forEach((field) => {
        field.setAttribute("aria-describedby", `${input.name}-error`);
        field.setAttribute("aria-invalid", "true");
      });
  } else {
    document.getElementById(`${input.name}-error`).classList.remove("error");

    document
      .querySelectorAll(`input[name="${input.name}"]`)
      .forEach((field) => {
        field.removeAttribute("aria-describedby");
        field.setAttribute("aria-invalid", "false");
      });
  }
};

const handleSubmit = (e) => {
  let radio;
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
        radio = field;
        field.checked && (radioIsChecked = true);
      }

      if (field.type === "checkbox") {
        if (!field.checked) {
          handleError(field, true);
          checkboxIsChecked = false;
        } else {
          handleError(field, false);
        }
      }

      if (field.type === "text" || field.type === "textarea") {
        if (
          field.value === "" ||
          (field.name === "email" && !emailRegex.test(field.value))
        ) {
          handleError(field, true);
          hasFieldValue = false;
        } else {
          handleError(field, false);
        }
      }
    }
  });

  if (!radioIsChecked) {
    handleError(radio, true);
  } else {
    handleError(radio, false);
  }

  if (!radioIsChecked || !checkboxIsChecked || !hasFieldValue) {
    hasError = true;
    return;
  }

  successPopup.classList.add("success");
};

submit.addEventListener("click", handleSubmit);
