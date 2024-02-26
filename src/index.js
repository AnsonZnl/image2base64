let fileInput = document.getElementById("file-input");
let outputImage = document.getElementById("output-image");
let outputText = document.getElementById("output-text");
let copyButton = document.getElementById("copy-button");
let clipboardIcon = document.getElementById("clipboard-icon");
let checkIcon = document.getElementById("check-icon");

outputImage.src = defaultBase64;
outputText.value = outputImage.src;

fileInput.addEventListener("change", function (event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    outputText.value = reader.result;

    if (file.type && file.type.indexOf("image") !== -1) {
      outputImage.src = reader.result;
      outputImage.style.display = "block";
    } else {
      outputImage.src = "";
      outputImage.style.display = "none";
    }
  };
  reader.readAsDataURL(file);
});

outputText.addEventListener("click", function () {
  outputText.setSelectionRange(0, outputText.value.length);
});

copyButton.addEventListener("click", function () {
  outputText.select();
  outputText.setSelectionRange(0, outputText.value.length);
  document.execCommand("copy");
  let originalTitle = copyButton.title;
  copyButton.title = "Copied!";
  clipboardIcon.style.display = "none";
  checkIcon.style.display = "inline-block";
  setTimeout(function () {
    copyButton.title = originalTitle;
    clipboardIcon.style.display = "inline-block";
    checkIcon.style.display = "none";
  }, 2000);
});
