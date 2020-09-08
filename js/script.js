/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
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
const STUDENTS_NUM=9;
function showPage(list,page){
   const startIndex=(page * STUDENTS_NUM)-STUDENTS_NUM;
   let endIndex = (page*STUDENTS_NUM);
   if(endIndex > list.length)
   {
      endIndex=list.length;
   }
   const ul =document.querySelector('.student-list');
   ul.innerHTML="";
let text=``;
   for(let i =startIndex; i < endIndex; i++)
   {
      text +=`<li class="student-item cf">
      <div class="student-details"><img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture"><h3>${list[i].name.first} ${list[i].name.last}</h3><span class="email">${list[i].email}</span></div><div class="joined-details"><span class="date">${list[i].registered.date}</span><div></li>`;
   }
  // console.log(text);
   ul.innerHTML=text;


}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   const numPages=list.length/STUDENTS_NUM;
   const ul=document.querySelector(".link-list");
   ul.innerHTML="";
   let text='';
   for(let i=1; i<=numPages; i++)
   {
      if(i==1)
      {

         text += `<li><button type ="button"   class="active">${i}</button></li>`
      }
      else{
      text += `<li><button type ="button"   >${i}</button></li>`
      }
   }
   ul.innerHTML=text;

   ul.addEventListener('click',(e)=>{

      if(e.target.tagName=='BUTTON')
      {
         //alert(e.target.tagName);
         const button=ul.querySelector(".active");
        // alert(button);
         button.className="";
         const newbutton=e.target;
         newbutton.className="active";
         
         let num=parseInt(newbutton.textContent);
         showPage(data,num)
      }
   })


}
function searchStudents()
{
   
}

//Create Search Component
function showSearchBar()
{
   const header=document.querySelector('header');
   const form=document.createElement("FORM");
   const labelSearch=document.createElement("LABEL");
   const searchBar=document.createElement("INPUT");


//for="search" class="student-search
labelSearch.setAttribute("id","search");
labelSearch.className="student-search";

   searchBar.setAttribute("type","search");
   searchBar.setAttribute("placeholder","Search by name...");
   header.appendChild(form);

   form.appendChild(labelSearch);
   labelSearch.appendChild(searchBar);
   

   const button=`<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
   searchBar.insertAdjacentHTML("afterend",button);
   labelSearch.addEventListener('click', (e)=>
   {
      //alert(e.target.tagName);
      if(e.target.tagName=='BUTTON' || e.target.tagName=='IMG')
      {
         //alert("hello");
      let nameFilter=searchBar.value;
      //alert(nameFilter);
      let newData=[];

      for(let i=0; i<data.length ; i++)
      {
        let fullName= `${data[i].name.title} ${data[i].name.first} ${data[i].name.last}`;
        if (fullName.toUpperCase().includes(nameFilter.toUpperCase()))
        {
           console.log(i);
           newData.push(data[i]);
          // console.log(newData);
        }

      }
      console.log(newData);
      showPage(newData,1);
      addPagination(newData);
      }
   }

   )

}


// Call functions
showPage(data,1);
addPagination(data);
showSearchBar();