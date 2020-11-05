// VARIABLES -------------------------------------
const replaceAllButton = document.querySelector(".replace-all-button");
const replaceOneButton = document.querySelector(".replace-one-button");
const rowElements = document.querySelectorAll(".row");
const caseSensitive = document.querySelector("#case-sensitive");
let count = 0;
let done = false;
let buttonType = "";

// EVENT LISTENERS --------------------------------
replaceAllButton.addEventListener("click", function () {
  buttonType = "all";
  findAndReplace();
});

replaceOneButton.addEventListener("click", function () {
  findAndReplace();
});

// caseSensitive.addEventListener("change", function (e) {
//   if (!caseSensitive.checked) caseSensitive.value = false;
//   else caseSensitive.value = true;
// });

// FUNCTIONS --------------------------------------------
const getCellElements = function (currentRowElement) {
  return currentRowElement.querySelectorAll(".cell");
};

const replacer = function (obj, findInput, replaceInput) {
  obj.innerHTML = obj.innerHTML.replace(findInput, replaceInput);
  count++;
};

// const finder = function (obj, findInput, replaceInput) {
//   if (!caseSensitive.value) {
//     if (obj.innerHTML.toLower.includes(findInput.toLower())) {
//       obj.innerHTML = obj.innerHTML.toLower();
//       replacer(obj, findInput, replaceInput);
//     }
//   } else {
//     if (obj.innerHTML.includes(findInput)) {
//       replacer(obj, findInput, replaceInput);
//     }
//   }
// };

const showReplaceCount = function (count) {
  let fieldElement = document.querySelector("fieldset");
  fieldElement.innerHTML +=
    count > 0
      ? `<div class='green'>Times replaced: ${count}</div>`
      : "<div class='red'>No matches found</div>";
};

const findAndReplace = function () {
  const findInput = document.querySelector(".find-input").value;
  const replaceInput = document.querySelector(".replace-input").value;
  for (let rowIndex = 0; rowIndex < rowElements.length; rowIndex++) {
    const currentRow = getCellElements(rowElements[rowIndex]);
    for (let cellIndex = 0; cellIndex < currentRow.length; cellIndex++) {
      const currentCell = currentRow[cellIndex];
      if (buttonType === "all") {
        while (currentCell.innerHTML.includes(findInput)) {
          replacer(currentCell, findInput, replaceInput);
        }
      } else {
        if (currentCell.innerHTML.includes(findInput) && !done) {
          done = true;
          replacer(currentCell, findInput, replaceInput);
        }
      }
    }
  }
  showReplaceCount(count);
};
