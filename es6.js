//Create Ticket class, we can pass 3 properties: title, assignee and description
// hint: use constructor()
class Ticket {
  constructor(title, assignee, description) {
    this.title = title;
    this.assignee = assignee;
    this.description = description;
  }
}

// Create UI class, we will use the UI class to manipulate the user interface (UI). Therefore, this must contain methods to add a ticket to the ticket list, delete a ticket from the list, clear all fields and lastly, a method to show an error or a success message (alert)
//addTicketToList(ticket){}
//deleteTicket(target){}
//showAlert(message,className){}
//clearAllFields(){}
class UI {
  addTicketToList(ticket) {
    //Select ticket-list
    const list = document.getElementById("ticket-list");
    // create new row => const row = document.createElement('tr')
    const row = document.createElement("tr");

    //Adding data to the newly created row
    row.innerHTML = `
          
          <td>${ticket.title}</td>
          <td>${ticket.assignee}</td>
          <td>${ticket.description}</td>
          <td><a href="" class="delete">X</a></td>
  
          `;
    //Adding the row to the ticket-list with all data included
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create a new empty div
    const div = document.createElement("div");

    //Add className to the div
    div.className = `alert ${className}`;

    //Add message as div child
    div.appendChild(document.createTextNode(message));

    //Get container
    const container = document.querySelector(".container");

    //Get Form
    const form = document.querySelector("#ticket-form");

    //Insert alert before the form
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteTicket(target) {

    //Check if the element we are passing as arguemnet (target) contains the class 'delete'
    if (target.className === "delete") {
      // Delete the created row (parent of parent): first parent is <td></td> greatParent is <tr></tr>
      console.log(target.parentElement.parentElement);
      target.parentElement.parentElement.remove();
      //Show Message
      this.showAlert("Ticket Removed!", "success");
    }
  }

  //Clear fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("assignee").value = "";
    document.getElementById("description").value = "";
  }
}

//Event Listening
document.getElementById("ticket-form").addEventListener("submit", function (e) {
  e.preventDefault();
  //Get form values (grab input values: title, assignee, description)
  const title = document.getElementById("title").value
  const assignee = document.getElementById("assignee").value
  const description = document.getElementById("description").value

 

  ////////Pro Tip:
  //An instance is an object containing data and behavior described by the class. The 'new' operator instantiates the class in JavaScript: instance = new Class()
  //Example:
  //const myUser = new User('Jane', 38); //new User() creates an instance of the User class with name and age as arguments.

  //Instantiate Ticket (new instance of Ticket class)
  const newTicket = new Ticket(title,assignee,description)

  //Instantiate UI
  const newUI = new UI()

  //Validate
  if (title === "" || assignee === "" || description === "") {
    //Show Error alert
    newUI.showAlert('Please fill in the field correctly', 'error')
  } else {
    //Add Ticket to list
    newUI.addTicketToList(newTicket)
    //show success
    newUI.showAlert('OK','success')
    // Clear Fields
    newUI.clearFields()
  }


});

//Event listening for delete
document.getElementById("ticket-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI()

  // Delete Ticket
ui.deleteTicket(e.target)

  e.preventDefault();
});
