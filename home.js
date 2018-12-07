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

animatethis($('#img_ball'));

$("#btn_throw").click(function(){
    var x = $("#img_ball").offset();
    // alert("Top: " + x.top + " Left: " + x.left);
    handleThrow(x.top);
});

function handleThrow(pos) {
    let ball = document.getElementById("img_table");
    let num = Math.floor(Math.random() *4) + 1;
    if (pos < 550) {
        ball.src="img/pong_board_miss_" + num + ".png";
        handleScore(0, -1);
    }
    else if (pos < 575) {
        ball.src="img/pong_board_1.png";
        handleScore(4, 0);
    }
    else if (pos < 600) {
        ball.src="img/pong_board_2.png";
        handleScore(3, 0);
    }
    else if (pos < 625) {
        ball.src="img/pong_board_3.png";
        handleScore(2, 0);
    }
    else if (pos < 650) {
        ball.src="img/pong_board_4.png";
        handleScore(1, 0);
    }
    else {
        ball.src="img/pong_board_miss_" + num + ".png";
        handleScore(0, -1);
    }
}

function handleScore(score, throws) {
    let SCORE = document.getElementById("id_score");
    let THROWS = document.getElementById("id_throws"); 
    let throws_left = parseInt(THROWS.innerHTML, 10) + throws;
    SCORE.innerHTML = parseInt(SCORE.innerHTML, 10) + score;
    if (throws_left < 0)
        alert("YOU LOOOOSE");
    else 
        THROWS.innerHTML = parseInt(THROWS.innerHTML, 10) + throws;


}