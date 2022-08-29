function openDropDown(dropDown) {
  $(dropDown).toggle();
  $('#menu-overlay').show();

  $('#menu-overlay').click(
    function (e) {
      e.stopPropagation();
      $(dropDown).hide()
      $('#menu-overlay').hide();
    }
  )
}

document.getElementById('drop-down-gio').onclick = function(e) {
  e.stopPropagation();
}

document.getElementById('drop-down-giay').onclick = function(e) {
  e.stopPropagation();
}
document.getElementById('drop-down-phut').onclick = function(e) {
  e.stopPropagation();
}


function searchInput(idSearch, idSelect) {
  var input = document.getElementById(idSearch).value;
  option = document.getElementById(idSelect);
  for (let i = 0; i < option.length; i++) {
    if (option[i].innerText.includes(input)) {
      option[i].style.display = 'block';
    }
    else{
      option[i].style.display = 'none';
    }
  }
}

function selectTime(idSelect, idInput, idDropDown) {
  var time = document.getElementById(idSelect);
  var value = time.value;
  var text = time.options[time.value].text;
  document.getElementById(idInput).innerText = text;
  if (value >= 0 && value <= 9) {
    if (text.includes('Giờ') == true) {
      document.getElementById('hour-output').innerText = '0' + value;
    }
    else if (text.includes('Phút') == true) {
      document.getElementById('min-output').innerText = '0' + value;
    }
    else {
      document.getElementById('sec-output').innerText = '0' + value;
    }
  }
  else {
    if (text.includes('Giờ') == true) {
      document.getElementById('hour-output').innerText = value;
    }
    else if (text.includes('Phút') == true) {
      document.getElementById('min-output').innerText = value;
    }
    else {
      document.getElementById('sec-output').innerText = value;
    }
  }
  $(idDropDown).hide();

}
function totalTime(params) {
  var totalTime = Number(document.getElementById('giay').value) + Number(document.getElementById('phut').value * 60) + Number(document.getElementById('gio').value * 3600)
  return totalTime;
}

function selectSounds(params) {
    var values = document.getElementById('list-sounds').value;
    $('.drop-down-chuong').hide()
    return values;
}

function playAudio() {
  var x = selectSounds();
  var sound = document.getElementById(x);
    sound.play();
}

function stopAudio() {
  var x = selectSounds();
  var sound = document.getElementById(x);
  sound.pause();
  sound.currentTime = 0;
}

var hour = null
var min = null
var sec = null
var timeout = null;
var percent = 0;


function start(params) {
  if (hour === null) {
    hour = document.getElementById('gio').value;
    min = document.getElementById('phut').value;
    sec = document.getElementById('giay').value;
  }

  if (hour === 0 && min === 0 && sec === 0) {
    return false;
  }
  else
  {
    if (sec === -1) {
      min--;
      sec = 59;
    }
    if (min === -1) {
      hour--;
      min = 59;
    }
    if (hour === -1) {
        playAudio();
        document.getElementById('bar').style.display = 'none';
        swal({
          title: 'ĐÃ HẾT GIỜ',
          text: 'Hết giờ rồi bạn ơi !!!',
          type: 'warning',
          confirmButtonText: 'Tắt chuông'
        }).then((result) => {
          if (result.value === true)
          {
            stopAudio();
            hour = null
            min = null
            sec = null
            percent = 0;
            document.getElementById('pause').style.cursor = 'no-drop';
            document.getElementById('start').style.cursor = 'default';
          }
        })
      return false;
    }
    
    if (hour >= 0 && hour <= 9) {
      document.getElementById('hour-output').innerText = '0' + hour;
    }
    else
    {
      document.getElementById('hour-output').innerText = hour;
    }
    if (min >= 0 && min <= 9) {
      document.getElementById('min-output').innerText = '0' + min;
    }
    else
    {
      document.getElementById('min-output').innerText = min;
    }
    if (sec >= 0 && sec <= 9) {
      document.getElementById('sec-output').innerText = '0' + sec;
    }
    else
    {
      document.getElementById('sec-output').innerText = sec;
    }
    timeout = setTimeout(function () {
      document.getElementById('start').style.cursor = 'no-drop';
      document.getElementById('pause').style.cursor = 'default';
      document.getElementById('bar').style.display = 'block';
      percent = percent + 1;
      sec--;
      start();
      document.getElementById('bar-run').style.width = Number(percent/totalTime() * 100) + '%'; 
      $('#pause').on('click', function () {
        clearInterval(timeout);
        document.getElementById('start').style.cursor = 'default';
        document.getElementById('pause').style.cursor = 'no-drop';
      })
    }, 1000);
  }
}


function stop() {
  clearTimeout(timeout);
}

$("#bar > #bar-run").each(function () {
  $(this)
    .data("origWidth", $(this).width())
    .width(0)
    .animate(
      {
        width: $(this).data("origWidth")
      },
      1200
    );
})