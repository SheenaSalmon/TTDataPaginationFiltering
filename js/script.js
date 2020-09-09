/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
heena Salmon
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const STUDENTS_NUM = 9;//Constant for how many students should be shown per page

function showPage(list, page) {
   const startIndex = (page * STUDENTS_NUM) - STUDENTS_NUM;
   let endIndex = (page * STUDENTS_NUM);
   if (endIndex > list.length)//adjust endIndex for times the has less students
   {
      endIndex = list.length;
   }
   const ul = document.querySelector('.student-list');
   ul.innerHTML = "";
   let text = ``;
   //shows students on page 
   if (list.length>0)
   {
   for (let i = startIndex; i < endIndex; i++) {
      text += `<li class="student-item cf">
      <div class="student-details"><img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture"><h3>${list[i].name.first} ${list[i].name.last}</h3><span class="email">${list[i].email}</span></div><div class="joined-details"><span class="date">${list[i].registered.date}</span><div></li>`;
   }
   }
   else{
      text +='No Students';
   }
   ul.innerHTML = text;
}




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numPages = list.length / STUDENTS_NUM;
   const ul = document.querySelector(".link-list");
   ul.innerHTML = "";
   let text = '';
   for (let i = 1; i <= numPages; i++) {
      if (i == 1) {

         text += `<li><button type ="button"   class="active">${i}</button></li>`
      }
      else {
         text += `<li><button type ="button"   >${i}</button></li>`
      }
   }
   ul.innerHTML = text;

   ul.addEventListener('click', (e) => {

      if (e.target.tagName == 'BUTTON') {
         //alert(e.target.tagName);
         const button = ul.querySelector(".active");
         button.className = "";
         const newbutton = e.target;
         newbutton.className = "active";
         let num = parseInt(newbutton.textContent);
         showPage(data, num)
      }
   })


}
function searchStudents(studentSearch)//Search the student data array and then return a new array of students that match the query

{
   let newData = [];

   for (let i = 0; i < data.length; i++) {
      let fullName = `${data[i].name.title} ${data[i].name.first} ${data[i].name.last}`; //First concatenate the stundent's whole name
      if (fullName.toUpperCase().includes(studentSearch.toUpperCase()))  //Change both the names to capital letters and see if the full name matches the query
      {
         console.log(i);
         newData.push(data[i]); //add the matched name to the new data array

      }

   }
   return newData;
}

/* Creates and add search component at the top of the page within the header div*/
function showSearchBar() {
   const header = document.querySelector('header');
   const labelSearch = document.createElement("LABEL");
   const searchBar = document.createElement("INPUT");



   labelSearch.setAttribute("id", "search");
   labelSearch.className = "student-search";

   searchBar.setAttribute("type", "search");
   searchBar.setAttribute("placeholder", "Search by name...");
   header.appendChild(labelSearch);
   labelSearch.appendChild(searchBar);


   const button = `<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
   searchBar.insertAdjacentHTML("afterend", button);
   //add an event listener to the label  
   labelSearch.addEventListener('click', (e) => {

      if (e.target.tagName == 'BUTTON' || e.target.tagName == 'IMG')//Check if the button or image in the button is clicked
      {
         let nameFilter = searchBar.value;
         let nF = searchStudents(nameFilter);//Send to searchStudent function to see if the entered name is in the student data array.  Receive the result in nF
         showPage(nF, 1);
         addPagination(nF); 
      
         
      }
   }

   )

   //event handler added for key up, results are shown as the user types
   searchBar.addEventListener('keyup', (e) => {

      
         let nameFilter = searchBar.value;
         let nF = searchStudents(nameFilter);//Send to searchStudent function to see if the entered name is in the student data array.  Receive the result in nF
         showPage(nF, 1);
         addPagination(nF); 
      
         
     
   }

   )

}


// Call functions
showPage(data, 1);
addPagination(data);
showSearchBar();