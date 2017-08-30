var main = function() {
    'use strict';
    $('#login').show();
    $('#usersOnline').hide();

    //View Model
    function viewModel(){
    var self = this;
    self.imagePath = ko.observable('');
        /*self.player1 = ko.observable('Player 1'); 
        self.player2 = ko.observable('Player 2');
    self.player3 = ko.observable('Player 3');
    self.player4 = ko.observable('Player 4');
    self.player5 = ko.observable('Player 5');
    self.player1Price = ko.observable('0.00');
    self.player2Price = ko.observable('0.00');
    self.player3Price = ko.observable('0.00');
    self.player4Price = ko.observable('0.00');
    self.player5Price = ko.observable('0.00');*/
    }
     
    var vm = new viewModel(); //Hold the viewmodel in a variable so that it can be reffered inside socket.io events
    ko.applyBindings(vm);

    var currPrice;

    var socket = io.connect('http://localhost:3000', {
        reconnect: true
    });

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '/the-price-is-right-sound-byte_cutted.mp3');

    var homePageAudio = document.createElement('audio');
    homePageAudio.setAttribute('src', '/price_is_right.mp3');

    audioElement.addEventListener('ended', function() {
        homePageAudio.pause();
        homePageAudio.currentTime = 0;
    }, false)

    homePageAudio.addEventListener('ended', function() {
        homePageAudio.pause();
        homePageAudio.currentTime = 0;
    }, false)

    homePageAudio.play();

    $('#stopMusic').on('click', function(event) {
        homePageAudio.pause();
        homePageAudio.currentTime = 0;
    });

    $('#frontPageImage').click(function(){

        homePageAudio.pause();
        homePageAudio.currentTime = 0;
        audioElement.play();
        setTimeout(function(){
            window.location.href = '/gamePage.html'; },4000);

    });

    $('#inputBid').click( function(event) {
        if ($('#bid').val() !== '')
        {
            var usrBid = $('#bid').val();
            socket.emit('bid', usrBid);
        }
    });

    socket.on("update-bid", function(playerBids, userPlaying)
    {
        $('.game').show();
        $('.game #gameplay').show();

        if(playerBids[userPlaying[0]] !== null)
        {
            $('#p1-bid').text(playerBids[userPlaying[0]]);
        }
        if(playerBids[userPlaying[1]] !== null)
        {
            $('#p2-bid').text(playerBids[userPlaying[1]]);
        }
        if(playerBids[userPlaying[2]] !== null)
        {
            $('#p3-bid').text(playerBids[userPlaying[2]]);
        }
        if(playerBids[userPlaying[3]] !== null)
        {
            $('#p4-bid').text(playerBids[userPlaying[3]]);
        }
        if(playerBids[userPlaying[4]] !== null)
        {
            $('#p5-bid').text(playerBids[userPlaying[4]]);
        }                               
    }); 

    // Add New User
    $('#createUser').on('click', function(event) {
        if ($('#username').val() !== '') 
        {
            $('#login').hide();
            homePageAudio.pause();
            homePageAudio.currentTime = 0;
            audioElement.play();
            var username = $('#username').val();
            socket.emit('join', username);
            $('.game').show();
            $('.game #gameplay').hide();
            $('#usersOnline').show();
        }
        return false;
    });

    socket.on("update-users", function(user) {
        $("#users").empty();
        $.each(user, function(clientID, name) {
            $('#users').append("<li>" + name + "</li>");
            $('#users').css("color", "#FC8832");
            $('#users').css("font-size", "20px");
        });
    });

    socket.on("game_started", function(input) {
        vm.imagePath(input.image);
        currPrice = input.price;
    });

    socket.on("playing", function(users, userPlaying, input)
    {
        $('.game').show();
        $('.game #gameplay').show();
        $('#p1').text(users[userPlaying[0]]);
        $('#p2').text(users[userPlaying[1]]);
        $('#p3').text(users[userPlaying[2]]);
        $('#p4').text(users[userPlaying[3]]);
        $('#p5').text(users[userPlaying[4]]);                                
    });    

    socket.on("spectating", function(users, userPlaying)
    {
        $('.game').show();
        $('.game #gameplay #winnersCircle').hide();
        $('#roundBid').hide();
        $('#p1').text(users[userPlaying[0]]);
        $('#p2').text(users[userPlaying[1]]);
        $('#p3').text(users[userPlaying[2]]);
        $('#p4').text(users[userPlaying[3]]);
        $('#p5').text(users[userPlaying[4]]); 
    });
};



/*
//TRYING SOMETHING OUT

// Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'numSegments'  : 20,     // Specify number of segments.
    'outerRadius'  : 150,   // Set outer radius so wheel fits inside the background.
    'textFontSize' : 20,    // Set font size as desired.
    'segments'     :        // Define segments including colour and text.
    [
       {'fillStyle' : 'green', 'text' : '5¢'},
       {'fillStyle' : 'black', 'text' : '$1', 'textFillStyle' : 'white'},
       {'fillStyle' : 'green', 'text' : '15¢'},
       {'fillStyle' : 'black', 'text' : '80¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '35¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '60¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '20¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '40¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '75¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '55¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '95¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '50¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '85¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '30¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '65¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '10¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '45¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '70¢', 'textFillStyle' : 'white'},
       {'fillStyle' : 'white', 'text' : '25¢', 'textFillStyle' : 'black'},
       {'fillStyle' : 'black', 'text' : '90¢', 'textFillStyle' : 'white'}
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 5,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : 'alertPrize()'
    }
});

// Vars used by the code in this page to do power controls.
var wheelPower    = 0;
var wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false)
    {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1)
        {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2)
        {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3)
        {
            document.getElementById('pw3').className = "pw3";
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1)
        {
            theWheel.animation.spins = 3;
        }
        else if (wheelPower == 2)
        {
            theWheel.animation.spins = 8;
        }
        else if (wheelPower == 3)
        {
            theWheel.animation.spins = 15;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').src       = "spin_off.png";
        document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function alertPrize()
{
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = theWheel.getIndicatedSegment();

    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    alert("You have won " + winningSegment.text);
}

*/



$(document).ready(main);
