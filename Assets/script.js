// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.saveBtn').on('click', saveBtn);

  function saveBtn(){

    let currentHourId = $(this).parent().attr('id');
    let content = $(this).siblings('textArea').val();

    let hourInfo = {
        currentHour: currentHourId,
        description: content
    }

    let hourDescriptions = JSON.parse(localStorage.getItem("hourDescriptions"));

    
    if(!hourDescriptions){
        hourDescriptions = [hourInfo];
    } else{
        let counter = 0;
        for(let i = 0; i < hourDescriptions.length; i++){
            if(hourDescriptions[i].currentHour === currentHourId){
                hourDescriptions[i].description = content;
                counter++
            }
        }
        if(counter == 0){
            hourDescriptions.push(hourInfo)
        }
    }
    
    localStorage.setItem('hourDescriptions', JSON.stringify(hourDescriptions))
  }
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function timeBlockColor(){

    let currentTime = dayjs().hour();

    console.log()
    let block;
    for(let i = 9; i < 18; i ++){
        if(i > 12){
            block = $("#hour-" + (i - 12))
        } else{
            block = $("#hour-" + i)
        }
        if(currentTime > i){
            block.addClass('past');
        } else if(currentTime == i){
            block.addClass('present');
        } else if(currentTime < i){
            block.addClass('future');
        }
    }

  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function loadTimeBlocks(){
    let hourDescriptions = JSON.parse(localStorage.getItem("hourDescriptions"));

    if(!hourDescriptions){
        return;
    } else {

        for(let i = 0; i < hourDescriptions.length; i++){
            let idTag = hourDescriptions[i].currentHour;
            $(('#' + idTag)).children('textArea').text(hourDescriptions[i].description)
        }

    }
  }
  // TODO: Add code to display the current date in the header of the page.
  function displayDate(){
    let currentDay = $('#currentDay');

    let today = dayjs();
    let day = dayjs(today.format('MMM D, YYYY')).format('dddd, MMMM D YYYY');
    console.log(day);
    
    currentDay.text(day);
  }
  console.log(dayjs(dayjs().hour()).format('h'));
  loadTimeBlocks()
  timeBlockColor();
  displayDate();
});
