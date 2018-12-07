let clock = 10;
let timer = document.getElementById("id_timer");
let SCORE = document.getElementById("id_score");

function animatethis(targetElement) {
    $(targetElement).animate({ "top": "-=150px"},
    {
        duration: 1500,
        complete: function ()
        {
            targetElement.animate({ "top": "+=150px"},
            {
                duration: 1500,
                complete: function ()
                {
                    animatethis(targetElement);
                }
            });
        }
    });
};
$("#btn_begin").click(function() {
    animatethis($('#img_ball'));
    handleBegin();
});

$("#btn_throw").click(function(){
    var x = $("#img_ball").offset();
    // alert("Top: " + x.top + " Left: " + x.left);
    handleThrow(x.top);
});
function handleBegin() {
    document.getElementById("btn_begin").style.display = "none";
    document.getElementById("btn_throw").style.display = "block";
    let elements = document.getElementsByClassName("info");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
    setInterval(decrement, 1000);
}

function decrement() {
    clock--;
    if (clock <= 0) {
        handleGameOver();
    }
    else if (clock == 1)
        timer.innerHTML = clock + " sec";
    else
        timer.innerHTML = clock + " secs";    
}

function handleReset() {
    /*document.getElementById("btn_begin").style.display = "block";
    document.getElementById("btn_throw").style.display = "none";
    timer.innerHTML = "10 secs";
    document.getElementById("id_throws").innerHTML = "3";
    let elements = document.getElementsByClassName("info");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    $("#img_ball").finish();
    */
    window.location.href = "home.html";
}

function handleThrow(pos) {
    let ball = document.getElementById("img_table");
    let num = Math.floor(Math.random() *4) + 1;
    // /alert(pos);
    if (pos < 490) {
        ball.src="img/pong_board_miss_" + num + ".png";
        handleScore(0, -1);
    }
    else if (pos < 515) {
        ball.src="img/pong_board_1.png";
        handleScore(4, 0);
    }
    else if (pos < 540) {
        ball.src="img/pong_board_2.png";
        handleScore(3, 0);
    }
    else if (pos < 565) {
        ball.src="img/pong_board_3.png";
        handleScore(2, 0);
    }
    else if (pos < 590) {
        ball.src="img/pong_board_4.png";
        handleScore(1, 0);
    }
    else {
        ball.src="img/pong_board_miss_" + num + ".png";
        handleScore(0, -1);
    }
}

function handleScore(score, throws) {
    let THROWS = document.getElementById("id_throws"); 
    let throws_left = parseInt(THROWS.innerHTML, 10) + throws;
    SCORE.innerHTML = parseInt(SCORE.innerHTML, 10) + score;
    
    if (throws_left <= 0) {
        setTimeout(handleGameOver, 100);        
    }
    
    THROWS.innerHTML = throws_left;

}

function handleGameOver() {
    alert("Game Over!\nYou Scored " + SCORE.innerHTML);
    handleReset();  
}