// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




goToNextStage = () => {
  window.location.replace(next_stage_url);
};

showSuccessUI = () => {
  play_pause_audio();
  document.getElementById("module1-panel").innerHTML = `
  <div class="success">
      <div class="star">
          <span> <i class="fa fa-star" style="font-size:48px;"></i></span>
          <span> <i class="fa fa-star" style="font-size:64px;"></i></span>
          <span> <i class="fa fa-star" style="font-size:48px;"></i></span>
          <p class="success-txt">Congratulations</p>
      </div>
  </div>
  <div class="col-sm">
      <button type="button" class="btn btn-primary btn-lg btn-block next-stage-btn" onclick="goToNextStage()">Go to next stage</button>
  </div>`;
};

// play-pause functionality
$("#cssHead").on("click", function () {
  var audio = document.getElementById("loop_audio_player");
  if (audio.paused) {
      audio.play();
      // $(".vol-btn__icon").removeClass("fa-volume-up").addClass("fa-pause");
  } else {
      audio.pause();
      // $("#caption_text_value").removeClass("highlight_audio3");
      // $(".letter__text").removeClass("highlight_audio3");
      // $(".vol-btn__icon").removeClass("fa-pause").addClass("fa-volume-up");
  }
});


function play123(audio_el, source, callback) {
  audio_el.setAttribute("src", source);
  audio_el.play();
  // $(".vol-btn__icon").removeClass("fa-volume-up").addClass("fa-pause");
  if (callback) {
      //When the audio object completes it's playback, call the callback
      //provided
      audio_el.addEventListener('ended', callback,{ once: true });
  }
}

//Changed the name to better reflect the functionality
function play_sound_queue(sounds) {
  var audio_el = document.getElementById("loop_audio_player");
  audio_el.loop = false;
  var index = 0;
  function recursive_play() {
      /*if(index == 0) {
          $("#caption_text_value").removeClass("highlight_audio3");
          $(".letter__text").addClass("highlight_audio3");
      }
      else if(index == 1) {
          $("#caption_text_value").addClass("highlight_audio3");
          $(".letter__text").removeClass("highlight_audio3");
      }*/
      //If the index is the last of the table
      if (index + 1 === sounds.length) {
          // play(sounds[index], null);
          cbfnc = function() {
              index=0;
              recursive_play();
          }
          play123(audio_el, sounds[index], cbfnc);
      } else {
          //Else, play the sound, and when the playing is complete
          //increment index by one and play the sound in the
          //indexth position of the array
          cbfnc = function() {
              index++;
              recursive_play();
          }
          play123(audio_el,sounds[index], cbfnc);
      }
  }

  //Call the recursive_play for the first time
  recursive_play();
}

// window.addEventListener('click',function(){play_sound_queue(audio_sources);},{ once: true });
// var audio_button = document.getElementById("audio_button");
// audio_button.addEventListener('click',function(){play_sound_queue(audio_sources);},{ once: true });

// play_sound_queue(audio_sources);


function audio_reinit_next_question() {
  if(!firstQuestion) {
      var audio_el = document.getElementById("loop_audio_player");
      audio_el.removeEventListener("ended",
          cbfnc);
      audio_el.pause();
      // play_sound_queue(audio_sources);
  }
  if(audio_sources.length==1) {
      audio_sources.push(APP_URL+"/storage/audio/500ms_silence.mp3");
  }
  play_sound_queue(audio_sources);

}


function option_click_sound(source) {

  var loop_audio_el = document.getElementById("loop_audio_player");
  var option_audio_el = document.getElementById("options_click_player");

  var is_loop_audio_paused = loop_audio_el.paused;

  if (!is_loop_audio_paused) {
      // console.log("pausing looped audio");
      loop_audio_el.pause();
  }

  option_audio_el.setAttribute("src", source);
  option_audio_el.play();
  option_audio_el.addEventListener('ended', function () {
      if (!is_loop_audio_paused) {
          // console.log("unpausing looped audio");
          loop_audio_el.play();
      }
  },{ once: true });

  /*if (!is_loop_audio_paused) {
      console.log("unpausing looped audio");
      loop_audio_el.play();
  }*/
}

function play_star_success_sound() {
  var star_audio_el = document.getElementById("star_player");
  star_audio_el.setAttribute("src", APP_URL+"/storage/audio/success_ding.mp3");
  star_audio_el.play();
}


var num_correct_answers = 0;
function star_success() {
  var star_el = document.getElementById("star");
  var star_counter_el = document.getElementById("star_counter");

  star_el.classList.remove('bounce-in-top');
  void star_el.offsetWidth;
  star_el.classList.add('bounce-in-top');

  star_el.innerHTML = '★';

  num_correct_answers = num_correct_answers + 1;
  star_counter_el.innerHTML = num_correct_answers;
  play_star_success_sound();

}


function play_pause_audio() {
  var audio = document.getElementById("loop_audio_player");
  if (audio.paused) {
      audio.play();
      $(".vol-btn__icon").removeClass("fa-volume-up").addClass("fa-pause");
  } else {
      audio.pause();
      $(".vol-btn__icon").removeClass("fa-pause").addClass("fa-volume-up");
  }
}

$(".audio-btn").on("click", function(){
  play_pause_audio();
});

// play-pause functionality
$("#cssHead").on("click", function(){
  play_pause_audio();
});




  // image_association_js
  // Dom Elements
const eleBlanks = document.getElementById('fillBlanks'),
eleShuffledArray = document.getElementById('shuffledArray'),
eleNextStageButton = document.getElementById('nextStageButton'),
eleCssHead = document.getElementById('cssHead'),
eleResetButton = document.getElementById('resetButton'),
eleImage = document.getElementById('question_image')

var startBtnClickCount = 0;
// const eleImageCaption = document.getElementById('captionImage')


// audio looping elements
var audio_sources;
var firstQuestion = true;
var cbfnc;

var api_token;

// static elements
const domainName = APP_URL
let getURL = domainName + "/api/v2/english/" + module_id + "/1/get_data"
let postURL = domainName + "/api/v2/english/" + module_id + "/1/post_user_response"
let currentData,
startTime, correctAnswer, userAnswer, questionId, status, isAnswerCorrect = false;

api_token = getCookie('api_token');

const makeElement = (type, elementID, elementClass, value = "", text = "", width = null)=>{
let element = document.createElement(type)
element.id = elementID
element.className = elementClass
element.value = value
element.innerText = text
if(width != null){
    element.width = width
}
return element
}

const updateInput = (event) =>{
// console.log('fired updateInput');
let input = eleBlanks.getElementsByTagName('input')[0]
input.value = event.target.innerText
userAnswer = input.value
}

const setModule = () =>{

eleBlanks.innerHTML = ""
eleShuffledArray.innerHTML=""

// const question = currentData.question
correctAnswer = currentData.answer.toString()
correctAnswer = correctAnswer.toLowerCase()
const optionsArray = currentData.options

eleImage.setAttribute("src",currentData.asset)

const requiredAnswer = makeElement('input', `question`, 'col-auto blank-input')
// requiredAnswer.addEventListener('change', speakWord)
eleBlanks.append(requiredAnswer)

for (let i = 0; i < optionsArray.length; i++) {
    const day = makeElement('div', `day${i}`, 'col-auto box', "", optionsArray[i])
    day.addEventListener('click', updateInput)
    day.addEventListener('click', function (){option_click_sound(currentData.options_mp3[i]);})
    eleShuffledArray.append(day)
}   
}

const resetModule = (event) =>{
eleBlanks.getElementsByTagName('input')[0].value = ""
}

const updateUserData = (dataObject) => {
startTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
currentData = dataObject
questionId = currentData.question_id

audio_sources = [currentData.answer_mp3];
audio_reinit_next_question();

setModule()
}

const getMethod = (url) => {
/*fetch(url, {
    headers: {
        'Accept': 'application/json',
        'Authorization': api_token
    },        
})
    .then(res => res.json())
    .then(data => updateUserData(data.data))
    .catch(err => console.log('we got a error in Get Method', err))*/
set_load_screen();
$.ajax({
    url: url,
    type: 'GET',
    headers: {
        'Authorization': 'UKreajCWVVzA8vJ9ZB6oyFSvlqkINTHvD2vGeNxBcaG9UtJDxYnftOOc1yVt',
        'Accept': 'application/json'
    },
    success: function (response) {
        // console.log(response);
        // console.log("GOT GET RESPONSE SUCCESSFULLY");
        destroy_load_screen();
        updateUserData(response.data)
    },
    error: function (error) {
        console.log(error);
    }
})
}

const postMethod = (url) => {
let data = {
    start_time: startTime, 
    end_time: endTime, 
    user_response: userAnswer,
    question_id: questionId,  
}
// console.log(data);

set_load_screen();
$.ajax({
    url: url,
    type: 'POST',
    headers: {
        'Authorization': 'UKreajCWVVzA8vJ9ZB6oyFSvlqkINTHvD2vGeNxBcaG9UtJDxYnftOOc1yVt',
        'Accept': 'application/json'
    },
    data: data,
    // contentType: 'application/json; charset=utf-8',
    success: function (response) {
        // console.log("GOT POST RESPONSE SUCCESSFULLY",response);
        destroy_load_screen();
        handlePostResponse(response.data)
    },
    error: function (error) {
        console.log(error);
    }
})

}



const handlePostResponse = (dataObject) => {
// console.log(dataObject);
if (dataObject.state == 0){ //next question
    firstQuestion = false;
    getURL = dataObject.get_url
    postURL = dataObject.post_url
    getMethod(getURL)
}
else if (dataObject.state == 1){ //next module
    window.location = dataObject.get_url
}
else if (dataObject.state == 2){ // wrong answer
    startTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // resetModule()
    eleInput = eleBlanks.getElementsByTagName('input')[0]
    eleInput.classList.add('incorrect_answer')
    document.addEventListener('click',function(){eleInput.classList.remove('incorrect_answer');resetModule();},{once:true, capture:true})
    document.addEventListener('keydown',function(){eleInput.classList.remove('incorrect_answer');resetModule();},{once:true, capture:true})
}
}

const validateAnswer = (event)=>{
endTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
userAnswer = eleBlanks.getElementsByTagName('input')[0].value

if(userAnswer.toLowerCase() == correctAnswer){
    isAnswerCorrect = true
    eleNextStageButton.classList.remove('next-stage-btn-wobbel')
    // voiceAssistant(`Congratulations!! correct answer.`)
    // setUserData(new Date(), 0)
    
    
    eleCssHead.classList.add('right-ans')
    star_success();
    setTimeout(() => {
        // resetModule();
        eleCssHead.classList.remove('right-ans');
    }, 3000);
}
else{
    isAnswerCorrect = false
    eleNextStageButton.classList.add('next-stage-btn-wobbel')
    eleCssHead.classList.add('wrong-ans');
    setTimeout(() => { eleCssHead.classList.remove('wrong-ans'); }, 3000);
}

postMethod(postURL)
}

const renderInit = () => {
getMethod(getURL)
}

function renderStart(){
let btnStart = document.getElementById('startBtn');
let [a,b,c,d] = document.getElementsByClassName('not-start');

btnStart.onclick = ()=>{
    if (startBtnClickCount === 0){
        startBtnClickCount += 1;
        openNav();
    } else {
        renderInit();
        a.classList.remove('not-start');
        b.classList.remove('not-start');
        c.classList.remove('not-start');
        d.classList.remove('not-start');
        btnStart.classList.add('not-start');
        document.getElementById("day_bg").style.visibility="collapse";
    }
};
}



// Event Bindings here


window.addEventListener('load', renderStart)

eleNextStageButton.addEventListener('click', validateAnswer)

eleResetButton.addEventListener('click', resetModule)


// start quiz
// function quiz(){
//   document.getElementById("video_quiz").style.visibility="none";
//   document.getElementById("video_quiz").style.visibility="visible";

// }