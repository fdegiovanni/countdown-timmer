var Countdown = function (){
  //private
  var elem; //Element who display info
  var deadline, deadlineOriginal;
  var callbacks = {};
  var sound = new Audio('resources/bomb.mp3');
  var isAlarm = false;
  var messages = ['Y... soltaron el disco ', 'Estás a la mitad del tiempo para la charla ', 'Rápido, te quedan solo 5 minutos ', ' tenés un ratito para responder preguntas ;)'];

  var name = 'Che!!';

  function add(_case, fn) {
     callbacks[_case] = callbacks[_case] || [];
     callbacks[_case].push(fn);
  }

  function pseudoSwitch(value) {
     if (callbacks[value]) {
        callbacks[value].forEach(function(fn) {
            fn();
        });
     }
  }

  function getMinutes(number) {
    var n = Math.round(number);
    if (n < 10) {
      n = '0'+n;
    }
    return n;
  }

  var _init = function (t, h, e, a) {
    deadlineOriginal = parseInt(t);
    deadline = moment().minute(deadlineOriginal);
    deadline.seconds(0);
    name = h;
    elem = document.getElementById(e);
    isAlarm = a;
    _start();
  };

  var _start = function () {
    var seconds = 0, hit = false;
    var timer = setInterval(function () {
      deadline.subtract(1, 'seconds');
      var text = '';
      var color = '';
      var message = '';
      if (deadline.format('mm:ss') == '00:00') {
        text = '00:00';
        color = 'black';
        message = name + messages[3];
        if (isAlarm) {
          sound.play();
        }
        clearTimeout(timer);
      }else{
          if (deadlineOriginal >= 30) {
            switch (true) {
              case (deadline.minute() <= 5):
                text = deadline.format('mm:ss');
                color = 'red';
                message = ('05:00' >= deadline.format('mm:ss') && deadline.format('mm:ss') >= '04:45') ? name + messages[2] : '';
                break;
              case (deadline.minute() > 5 && deadline.minute() <= deadlineOriginal*0.25):
                  text = deadline.format('mm:ss');
                  color = 'orange';
                  message = '';
                  break;
              case (deadline.minute() > deadlineOriginal*0.25 && deadline.minute() <= deadlineOriginal*0.5):
                  text = deadline.format('mm');
                  color = 'yellow';
                  message = (getMinutes(deadlineOriginal*0.5)+'00' >= deadline.format('mm:ss') && deadline.format('mm:ss') >= getMinutes(deadlineOriginal*0.5-1)+':45') ? messages[1] + name : '';
                  break;
              case (deadline.minute() > deadlineOriginal*0.5 && deadline.minute() <= deadlineOriginal*1):
                  text = deadline.format('mm');
                  color = 'green';
                  message = (getMinutes(deadlineOriginal)+'00' >= deadline.format('mm:ss') && deadline.format('mm:ss') >= getMinutes(deadlineOriginal-1)+':45') ? messages[0] + name : '';
                  break;
          }
        }else{
          if (deadline.minute() <= 5) {
            text = deadline.format('mm:ss');
            color = 'red';
            message = ('05:00' >= deadline.format('mm:ss') && deadline.format('mm:ss') >= '04:45') ? messages[2] + name : '';
          }else{
            text = deadline.format('mm');
            color = 'green';
          }
        }
      }



    elem.innerHTML = text;
    document.body.style.backgroundColor = color;
    $('#clockMessage').text(message);

    }, 1000);
  };

  var _show = function () {

  };

  //public
    return {
        init: function (time, host, element, bomb) {
          _init(time, host, element, bomb);
        },
        start: function () {

        },
        show: function () {

        }
      }
}();
