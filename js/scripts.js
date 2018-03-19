var context = new (window.AudioContext || window.webkitAudioContext)();

var get_song = new XMLHttpRequest();


var alma_mater = { audio: context.createBufferSource(),
	     audioData: context.createBufferSource(),
	     modifier: context.createGain(),
	     file: "../resources/Alma_Mater.mp3",
	     vocal: "solo",
	     request: new XMLHttpRequest(),
	     isPlaying: false,
	     startTime: null,
	     seekAsOfLastPause: 0,
	     duration: 0
}

allParts = [alma_mater];

get_song.open("GET", "resources/Alma_Mater.mp3", true);
get_song.responseType = "arraybuffer";
get_song.onload = function(){
	//request.response is audio
	context.decodeAudioData(get_song.response, onDecoded);
}

function onDecoded(buffer){
	alma_mater.audioData.buffer = buffer;
	window.setTimeout(playPause,1000);
}

get_song.send();

function playPause(){
	if(alma_mater.isPlaying == false) {
		alma_mater.isPlaying = true;
		alma_mater.audio = context.createBufferSource();
		alma_mater.audio.loop = true;
		alma_mater.audio.buffer = alma_mater.audioData.buffer;
		alma_mater.startTime = context.currentTime;
		alma_mater.audio.connect(alma_mater.modifier);
		alma_mater.modifier.connect(context.destination);
		alma_mater.audio.start(0,alma_mater.duration);
	} else {
		alma_mater.isPlaying = false;
		alma_mater.audio.stop();
		alma_mater.seekAsOfLastPause = context.currentTime - alma_mater.startTime;
		alma_mater.duration += alma_mater.seekAsOfLastPause;
	}
}

function animateRotate(spawn) {
    // caching the object for performance reasons
    var $elem = spawn;

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: 2880}, {
        duration: 40000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

function fun(){
	var num = Math.random();
	var spawn;
	var offset = (Math.floor(Math.random()*100)%95)
	if(num <= .33){
		$('body').append('<img class="spawn kent" style="left:'+ offset + '%" src="resources/kent.png">');
	} else if( num > .33 && num <= .66){
		$('body').append('<img class="spawn otto" style="left:'+ offset + '%" src="resources/otto.png">');
	} else{
		$('body').append('<img class="spawn jimbo" style="left:'+ offset + '%" src="resources/jimbo.png">');
	}
	$('.spawn').animate({
		top: $(window).height()
	}, 10000, function(){
		$(this).remove();
	});
}

function animation(spawn){
	$(spawn).css('position-x',)
}




window.setInterval(fun,1000);
