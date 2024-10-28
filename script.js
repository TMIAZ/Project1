/* Checking if there is a list of purchased items in the local storage.
If there is, it will be parsed to JSON object and if not it will create one.*/

if (localStorage.getItem('purchaseList') === null) {
    var purchaseList = [];
    localStorage.setItem('purchaseList', JSON.stringify(purchaseList));
  } else {
    var purchaseList = JSON.parse(localStorage.getItem('purchaseList'));
  }
  
  /* Checking if there is a list of items to be packed in the local storage.
  If there is, it will be parsed to JSON object and if not it will create one.*/
  
  if (localStorage.getItem('packingList') === null) {
    var packingList = [];
    localStorage.setItem('packingList', JSON.stringify(packingList));
  } else {
    var packingList = JSON.parse(localStorage.getItem('packingList'));
  }
  
  /* Checking if there is a list of packed items in the local storage.
  If there is, it will be parsed to JSON object and if not it will create one.*/
  
  if (localStorage.getItem('packedList') === null) {
    var packedList = [];
    localStorage.setItem('packedList', JSON.stringify(packedList));
  } else {
    var packedList = JSON.parse(localStorage.getItem('packedList'));
  }
  
  // Adds event listener
  
  document.addEventListener(type="DOMContentLoaded", loadLists);
  
  /* Displays the lists with the displayList functions 
  and defines which function is added to the button*/
  
  function loadLists() {
    displayList(purchaseList, "purchaseList", addToPackingList, "Purchased");
    displayList(packingList, "packingList", markAsPacked, "Packed");
    displayList(packedList, "packedList", moveBackToPackingList, "Not yet packed", true);
  }
  
  // Gets the item that the user adds and defines the error message
  function addItem() {
    const itemInput = document.getElementById("itemInput");
    const errorMessage = document.getElementById("error-message");
  
    // Removes old errors so the error message is not visible when adding correct item
    
    itemInput.classList.remove("error");
    errorMessage.style.display = "none";
  
    // Downloads the user input to variable and checks if the checkbox is clicked
    
    const itemName = itemInput.value;
    const needsPurchase = document.getElementById("purchaseCheckbox").checked;
  
    /* Checks if the user input is empty or only 2 letters long.
    If it is, the error message is visible and red color is added.
    If not it returns the value*/
  
    if (itemName === "" || itemName.length <= 2) {
      errorMessage.style.display = "block";
      itemInput.classList.add("error");
      return;
    }
  
    /* Adds item to correct list. If the checkbox is clicked item will move to purchase list
    and if not, it will move to packing list. 
    Also saveList and displayList -functions are activated so item will be saved and displayd */
    if (needsPurchase) {
      purchaseList.push(itemName);
      saveList("purchaseList", purchaseList);
      displayList(purchaseList, "purchaseList", addToPackingList, "Purchased");
    } else {
      packingList.push(itemName);
      saveList("packingList", packingList);
      displayList(packingList, "packingList", markAsPacked, "Packed");
    }
  
    // Clears the input field and checkbox
    itemInput.value = "";
    document.getElementById("purchaseCheckbox").checked = false;
  }
  
  // Saves the updated list to the local storage
  
  function saveList(savedlist, list) {
    localStorage.setItem(savedlist, JSON.stringify(list));
  }
  
  /* Displays the correct list and adds it to correct element id.
   Defines the correct function to be used and adds the correct text to the button.
   Also checks 
  */
  function displayList(list, elementId, actionFunc, buttonText, isPacked = false) {
    let x = document.getElementById(elementId);
    x.innerHTML = ""; // clears the element
  
    //Goes through every item on a list and creates new element
    list.forEach((item, index) => {
      let y = document.createElement("li");
      y.textContent = item;
      
      // Adds "packed"-class to the item if it is packed
  
      if (isPacked) y.classList.add("packed");
  
      // Checks if actionFunc has any value
      if (actionFunc) {
        const button = document.createElement("button"); // Adds button
        button.textContent = buttonText; // Adds correct text to button
        button.onclick = () => actionFunc(index); // Adds correct function to button
        if (isPacked) {
          button.classList.remove("Packed"); // Removes "packed"- class which removes line-trough. 
        }
        y.appendChild(button);
      }
      x.appendChild(y);
    });
  }
  
  // Move item from the purchase list to packed list
  function addToPackingList(index) {
    const item = purchaseList.splice(index, 1)[0]; // Removes the item from the list
    packingList.push(item); // Adds the item to new list
    
     // Updates the both lists and loads the new view
    
    saveList("purchaseList", purchaseList);
    saveList("packingList", packingList);
    loadLists();
  }
  
  // Moves item from packing list to packed list
  function markAsPacked(index) {
    const item = packingList.splice(index, 1)[0]; // Removes the item from the list
    packedList.push(item); // Adds the item to new list
    
     // Updates the both lists and loads the new view
  
    saveList("packingList", packingList);
    saveList("packedList", packedList);
    loadLists();
  }
  
  // Moves item from the packed list back to packing list
  function moveBackToPackingList(index) {
    const item = packedList.splice(index, 1)[0]; // Removes the item from the list
    packingList.push(item); // Adds the item to new list
    
    // Updates the both lists and loads the new view
  
    saveList("packedList", packedList);
    saveList("packingList", packingList);
    loadLists();
  }
  
  // Clears only the packed list
  function clearPackedList() {
    
    //Asks if the user is sure about emptying the packed list
    const confirmation = confirm("Are you sure you want to empty the list?");
    
    /* If the user is sure, it will clear the list, saves the empty list
    and shows the updated (empty) list. It will also alert that the list have been emptied*/
    if (confirmation) {
      packedList = [];
      saveList("packedList", packedList);
      loadLists();
      alert("List has been emptied!");
    }
  }
  
  // Changes the visibility of a list
  function toggleList(containerId) {
    const container = document.getElementById(containerId); // Picks up the correct element
    
    // Checks the current value and changes the visibility if necessary.
    if (container.style.display === "none" || container.style.display === "") {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }