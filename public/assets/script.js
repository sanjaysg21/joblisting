 window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('fade-out', window.scrollY > 0);
  });
  // Get the footer element
  function isScrolledToBottom() {
    var contentHeight = document.body.clientHeight;
    var yOffset = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var y = yOffset + windowHeight;
    return y >= contentHeight;
  }
  
  window.onscroll = function() {
    if (isScrolledToBottom()) {
      document.querySelector(".footer").classList.add("fade-in");
    } else {
      document.querySelector(".footer").classList.remove("fade-in");
    }
  };
  
  // Get all the cards on the page
var currentDate = new Date();
var cards = document.querySelectorAll('.card');

// Loop through each card and set the color based on the deadline date
cards.forEach(function(card) {
  // Get the deadline date from the card
  var deadlineStr = card.querySelector('li:first-of-type').textContent.split(': ')[1];
  var deadlineDate = new Date(deadlineStr);

  // Calculate the difference between the deadline and current date
  var timeDiff = Math.abs(deadlineDate.getTime() - currentDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Set the card background color based on the difference in days
  if (diffDays >= 21) {
    card.style.backgroundColor = "rgba(144, 238, 144, 0.5)";
  } else if (diffDays<=15 && diffDays>=3){
    card.style.backgroundColor="rgba(255, 255, 153, 0.5)";
  }
  else{
    card.style.backgroundColor="rgba(255, 102, 102, 0.5)"
  }
});
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.parentNode.insertBefore(document.getElementById(data), event.target.nextSibling);
}
