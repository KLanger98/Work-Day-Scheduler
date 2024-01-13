
$(function () {
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
            hourDescriptions.push(hourInfo);
        }
    }
    
    localStorage.setItem('hourDescriptions', JSON.stringify(hourDescriptions));
    let localStorageText = $('<span>').text('local Storage')
    console.log(localStorageText.text())
    $("#saveSuccessful").text("Saved to Local Storage");
    

    setTimeout(function(){
        $('#saveSuccessful').text(' ');
    }, 5000);
    

  }

  function timeBlockColor(){

    let currentTime = dayjs().hour();

    console.log()
    let block;
    for(let i = 9; i < 18; i ++){
        if(i > 12){
            block = $("#hour-" + (i - 12));
        } else{
            block = $("#hour-" + i);
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
  function loadTimeBlocks(){
    let hourDescriptions = JSON.parse(localStorage.getItem("hourDescriptions"));

    if(!hourDescriptions){
        return;
    } else {
        for(let i = 0; i < hourDescriptions.length; i++){
            let idTag = hourDescriptions[i].currentHour;
            $(('#' + idTag)).children('textArea').text(hourDescriptions[i].description);
        }
    }
  }
  function displayDate(){
    let currentDay = $('#currentDay');

    let today = dayjs();
    let day = dayjs(today.format('MMM D, YYYY')).format('dddd, MMMM D YYYY');
    
    currentDay.text(day);
  }

  loadTimeBlocks()
  timeBlockColor();
  displayDate();
});
