// js for gif-Fruity app

// declare variables
var fruits = ["pumpkin", "cherry"]; // initial small set of fruits for testing

// function to generate buttons from fruits array
function populateButtonList() {
    // clear our button html area since it's about to get updated and rewritten
    document.getElementById("buttonList").innerHTML = "";

    for (let fruit of fruits) {
        // create a button for each fruit listed in our array
        var addedFruit = document.createElement("button");
        // add a class of "fruit" to the element for future use/styling
        addedFruit.classList.add("fruit");
        // add a data attribute of "fruit" to the element for future use/styling
        addedFruit.setAttribute("data-name", fruit);
        // update each button text to display the corresponding
        addedFruit.textContent = fruit;
        // update our html with our buttons
        document.getElementById("buttonList").appendChild(addedFruit);
    }
}

// click event for adding fruits form
document.getElementById("addFruit").addEventListener("click", function(event){
    // since we are submitting a form, we don't want to refresh the page, so we prevent that default action
    event.preventDefault();
    // grab the text entered into the form
    var fruit = document.getElementById("newGifs").value.trim();
    // add the entered fruit to our list of fruits
    fruits.push(fruit);
    // generate the buttons using our updated list
    populateButtonList();
    // clear the text field of the input form for easier follow-up use
    document.getElementById("newGifs").value = "";
});

// initial call of our button generation function
populateButtonList();