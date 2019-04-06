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

function serveUpFruityGifs(event) {
    if (event.target.classList.contains("fruit")) {
        // do i have to use "this"? it seems to work with event.target instead >_>
        var getFruitGifs = event.target.dataset.name.replace(' ', '+');
        console.log(getFruitGifs);

        // request gifs from giphy using the fruit name as the query
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${getFruitGifs}&api_key=fdYHoYcYVDFUlKAY767cni3noXeN0Kkd&limit=10`;

        // make fetch / XHR request

        // add section for the gifs to appear (side by side and spill over?)

        // need to be still (stationary) on load -- we will add in the start/stop toggle
    }
    
}

// click event for adding fruits form
document.getElementById("addFruit").addEventListener("click", function(event){
    

    // // since we are submitting a form, we don't want to refresh the page, so we prevent that default action
    event.preventDefault();

    var fruit = document.getElementById("newGifs").value;
    // check that the value of the form isn't empty
    if (fruit.length > 2) {
        // grab the text entered into the form
        fruit = document.getElementById("newGifs").value.trim();
        // add the entered fruit to our list of fruits
        fruits.push(fruit);
        // generate the buttons using our updated list
        populateButtonList();
        // clear the text field of the input form for easier follow-up use
        document.getElementById("newGifs").value = "";
    } else {
        alert("Your input makes me feel empty inside... please enter the name of the fruit.");
    };
});

// click event for fruit buttons
document.getElementById("container").addEventListener("click", serveUpFruityGifs);

// initial call of our button generation function
populateButtonList();