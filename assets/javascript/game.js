var gameStarted=false;
var enemyChosen=false;
var enemyCount=2;
var playerHp;
var playerAttack;
var defenderHp;
var defenderAttack;
var defenderName;
var defender;
var player;
$(document).ready(function(){
$('.player').on('click', function(){
    if(!gameStarted){
        $(this).toggleClass('player yours');
        playerHp=$(this).attr('hp');
        playerAttack=$(this).attr('attackPower');
        player=$(this);
        console.log('Your hp is '+playerHp+' Attack is '+playerAttack);
        $('.player').toggleClass('player enemy');
        $(this).appendTo($('#yourchoice'));
        $('.enemy').appendTo($('#enemies'));
        gameStarted=true;
        if(enemyCount>0){                    $('.enemy').on("click", function(){
            if(!enemyChosen){
                $(this).toggleClass('enemy defending');
                defender=$(this);
                defenderHp=$(this).attr('hp');
                defenderAttack=$(this).attr('attackPower');
                defenderName=$(this).attr('name');
                console.log('Enemy hp is '+defenderHp+' Attack is '+defenderAttack);
                $('#enemies').remove($(this));
                $('#defender').append($(this));
                enemyChosen=true;
            }
        
        });
        }
        else{
            alert('You win');
        }
    }
});
$('#killbutt').on('click', function(){
    if(enemyChosen){
        if(defenderHp>0&&playerHp>0){
            defenderHp-=playerAttack;
            playerHp-=defenderAttack;
            $('.yours span').text(playerHp);
            $('.defending span').text(Math.round(defenderHp*100)/100);
            console.log('Your hp is '+playerHp+' Attack is '+playerAttack);
            console.log('Enemy hp is '+defenderHp+' Attack is '+defenderAttack);
            $('#attackInfo').html('You attacked '+defenderName+' for '+playerAttack+' damage.<br>'+defenderName+' attacked you for '+defenderAttack+' damage.<br>')
            playerAttack*=1.2;
            if(playerHp<=0){
                var message = $("<div>");
                message.html("You have been defeated by "+defenderName+". You must now restart to play again. <br><button id=restart>Restart</button>")
                enemyChosen=false;
                $('#defender').empty();
                $('#defender').append('Defender<br>')
                message.appendTo($('#defender'));
                $('#restart').on("click", function(){
                location.reload(true);
            })
            }
            else if(defenderHp<=0){
                if(enemyCount>0){
                var message = $("<div>");
                console.log(enemyCount)
                message.html('You have defeated '+defenderName+'. You can now choose a new defender');
                enemyChosen=false;
                console.log(message)
                $('#defender').empty();
                    $('#defender').append('Defender<br>')
                message.appendTo($('#defender'));
                enemyCount--;
                }
                else{
                var message = $("<div>");
                message.html('You have defeated '+defenderName+'. You win <br><button id=restart>Restart</button>');
                enemyChosen=false;
                console.log(message)
                $('#defender').empty();
                $('#defender').append('Defender<br>')
                message.appendTo($('#defender'));
                $('#restart').on('click', function(){
                    location.reload(true);
                })
            }
            }
        }
        
    }
    else{
        console.log('enemy not chosen');

    }
})

});

