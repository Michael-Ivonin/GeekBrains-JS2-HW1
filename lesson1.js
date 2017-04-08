/**
 * Created by Michael on 07.04.2017.
 */

function Output(elementClass, checkBoxText, placeHolderText, buttonText, outputFieldText, emptyInputText) {
	var inputField = document.querySelector(elementClass),
		checkBox,
		label,
		outputButton,
		outputField;

	function disableInputFieldAndRemoveOutput() {
		inputField.setAttribute("disabled", "disabled");
		inputField.removeAttribute("placeholder");
		inputField.value = null;
		if (outputButton || outputField) {
			outputButton.remove();
			outputButton = undefined;
			outputField.remove();
			outputField = undefined;
		}
	}

	disableInputFieldAndRemoveOutput();

	function enableInputField() {
		inputField.removeAttribute("disabled");
		inputField.setAttribute("placeholder", placeHolderText);
		inputField.onkeydown = createOutputButton;
	}

	function disableOrEnableInputField() {
		(checkBox.checked) ? enableInputField() : disableInputFieldAndRemoveOutput();
	}

	function createCheckBoxAndLabel() {
		checkBox = document.createElement("input");
		inputField.parentNode.insertBefore(checkBox, inputField);
		checkBox.setAttribute("type", "checkbox");
		checkBox.setAttribute("id", "checkbox");
		checkBox.onclick = disableOrEnableInputField;

		label = document.createElement("label");
		inputField.parentNode.insertBefore(label, inputField);
		label.setAttribute("for", "checkbox");
		label.innerHTML = checkBoxText;
		inputField.parentNode.insertBefore(document.createElement("br"), inputField);
	}

	createCheckBoxAndLabel();

	function createOutputButton() {
		if (!outputButton) {
			outputButton = document.createElement("button");
			inputField.parentNode.insertBefore(outputButton, this.nextElementSibling);
			outputButton.innerHTML = buttonText;
			outputButton.onclick = createOrUpdateOutputField;
		}
	}

	function createOrUpdateOutputField() {
		if (!outputField) {
			outputField = document.createElement("p");
			outputButton.parentNode.insertBefore(outputField, this.nextElementSibling);
			outputField.innerHTML = outputFieldText + ": " + inputField.value;
		} else {
			outputField.innerHTML = (inputField.value.length === 0) ?
				(outputFieldText + ": " + emptyInputText) :
				(outputFieldText + ": " + inputField.value);
		}

	}
}

var output = new Output(".inputField", "Input text", "Your text", "Show result", "Result", "no data");