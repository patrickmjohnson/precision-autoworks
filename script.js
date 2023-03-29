//Preloader sessionStorage
sessionStorage.setItem('visited', 'true');


//GSAP Marquee
let object = {
  value: 1
};

let tl = gsap.timeline({
  repeat: -1,
  onReverseComplete: () => {
    tl.progress(1);
  }
});
tl.fromTo(
  ".marquee_track",
  {
    xPercent: 0
  },
  {
    xPercent: -50,
    duration: 40,
    ease: "none"
  }
);


//js clock & open/closed
function dateToText(date) {
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds();
  var day = date.getDay();
  var open = document.getElementsByClassName('.open_wrapper');
  var close = document.getElementsByClassName('.close_wrapper');
  
  // Check for daylight savings
  var dst = 0;
  var jan = new Date(date.getFullYear(), 0, 1);
  var jul = new Date(date.getFullYear(), 6, 1);
  var stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  if (date.getTimezoneOffset() < stdTimezoneOffset) {
      dst = 1;
  }
  
  // Adjust hours for daylight savings
  hours += dst;
  
  // Set open/close component
  if ((day == 1 || day == 2 || day == 3 || day == 4) // Mon - Thur
      && (hours >= 8 && hours < 17 // from 8AM to 4:59:59PM
      || hours == 7 && minutes <= 30)) { // OR if it's 7:30AM to 7:59AM
      $('.close_wrapper').hide();
      $('.open_wrapper').show();
  } else if ((day == 5) // Fri
      && (hours >= 8 && hours < 15 // from 8AM to 2:59:59PM
      || hours == 7 && minutes <= 30)) { // OR if it's 7:30AM to 7:59AM
      $('.close_wrapper').hide();
      $('.open_wrapper').show();
  } else {
      $('.close_wrapper').show(); // any other time, closed
      $('.open_wrapper').hide();
  }
            
  // Display clock 12 hour format
  if (seconds < 10) seconds = '0'+seconds;
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // changes hour '0' to '12'
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  if (hours < 10) hours = '0'+hours;
  return hours + ":" + minutes + " " + ampm;
}

    

//Display clock in Central Standard Timezone
function updateClocks() {
	for (var i = 0; i < window.arrClocks.length; i++) {
		var clock = window.arrClocks[i];
		var offset = window.arrOffsets[i];
		clock.innerHTML = dateToText(new Date(new Date().getTime()+offset));
	}
}
function startClocks() {
	clockElements = document.getElementsByClassName('clock');
	window.arrClocks = []
	window.arrOffsets = [];
	var j = 0;
	for(var i = 0; i < clockElements.length; i++) {
		el = clockElements[i];
		timezone = parseInt(el.getAttribute('timezone'));
		if (!isNaN(timezone)) {
			var tzDifference = timezone * 60 + (new Date()).getTimezoneOffset();
			var offset = tzDifference * 60 * 1000;
			window.arrClocks.push(el);
			window.arrOffsets.push(offset);
		}
	}
	updateClocks();
	clockID = setInterval(updateClocks, 1000);
}
setTimeout(startClocks, 100);



// when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // set the fs-hacks selector
  const YEAR_SELECTOR = '[fs-hacks-element="hack14-year"]';
  // get the the span element
  const yearSpan = document.querySelector(YEAR_SELECTOR);
  if (!yearSpan) return;
  // get the current year
  const currentYear = new Date().getFullYear();
  // set the year span element's text to the current year
  yearSpan.innerText = currentYear.toString();
});


//Transition
let transitionTrigger = $(".transition_trigger");
let introDurationMS = 800;
let exitDurationMS = 800;
let excludedClass = "no-transition";
  
// On Page Load
if (transitionTrigger.length > 0) {
	transitionTrigger.click();
	$("body").addClass("no-scroll-transition");
	setTimeout(() => {$("body").removeClass("no-scroll-transition");}, introDurationMS);
}
// On Link Click
$("a").on("click", function (e) {
  if ($(this).prop("hostname") == window.location.host && $(this).attr("href").indexOf("#") === -1 &&
      !$(this).hasClass(excludedClass) && $(this).attr("target") !== "_blank" && transitionTrigger.length > 0) {
    e.preventDefault();
		$("body").addClass("no-scroll-transition");
    let transitionURL = $(this).attr("href");
    transitionTrigger.click();
    setTimeout(function () {window.location = transitionURL;}, exitDurationMS);
  }
});
// On Back Button Tap
window.onpageshow = function(event) {if (event.persisted) {window.location.reload()}};
// Hide Transition on Window Width Resize
setTimeout(() => {$(window).on("resize", function () {
setTimeout(() => {$(".transition").css("display", "none");}, 50);});
}, introDurationMS);


//Open Modal with "S" key
document.addEventListener('keydown', function(event) {
  // Check if the pressed key is the "S" key
  if (event.key === 's' || event.key === 'S') {
    // Check if the event target is a form field
    const isFormField = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
    if (!isFormField) {
      // Get the element with the ID of 'modal'
      const modal = document.getElementById('modal');
      if (modal && modal.style.display === 'none') {
        // Get the element with the ID of 'schedule-btn'
        const scheduleBtn = document.getElementById('schedule-btn');
        if (scheduleBtn) {
          // Simulate a click on the 'schedule-btn' element
          scheduleBtn.click();
        }
      }
    }
  }
});
