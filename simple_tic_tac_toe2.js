var winningCombos = [[1,2,3], [1,5,9],[3,5,7],[4,5,6], [7,8,9],[1,4,7],[2,5,8],[3,6,9]];
 
var team = [
      {
      name:      'Ernie',
      marker:    '&times;',
      img_url:   '/ernie.jpg',
      id:         '1', 
      current:    'true',
      sign:        'X',
      wins:        []
      // indicator: $(status_indicators[0])
    },
    {
      name:      'Bert',
      marker:    '&oslash;',
      img_url:   '/bert.jpg',
      id:         '2' ,
      current:    'false',
      sign:       '0',
      wins:        []    

      // indicator: $(status_indicators[1])
    }];
var used = []; 
// var sign = "";  

var current_player = team[0];
var update_current_player = function(){
  if (current_player === team[0]){
    current_player = team[1];
  }else{
    current_player = team[0];
  }
};
var switch_current = function(name){
  var value = $('#' + name).attr('class');
  if (value === 'true'){
    $('#' + name).removeClass('true').addClass('false');
  }else{
     $('#' + name).removeClass('false').addClass('true');
  }
};


   //method to check that an array is a subarray of another array


function isSubArray(subArray, array){
  for (var i = 0, len = subArray.length; i < len; i++){
    if (array.indexOf(subArray[i]) < 0){
      return false;
    }
  }
  return true;
}

function checkWin(player){
    for(var i = 0; i < winningCombos.length; i++){
      if (isSubArray(winningCombos[i], player.wins)){ 
        return true;
      }
    }
    return false
  }  



if (Meteor.isClient) {

  Template.teams.helpers({
    players: function () {
       return team;
      }
     
  });
  //action onload
  Template.mainBoard.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $('#newWin').hide();
   }
}

 

  Template.mainBoard.events({

    'click td': function (e) {
      //get the number of the tile that was clicked, and add it to the wins of current_player
        var value = $(e.currentTarget).attr('id')[4];
        //turn value from a string into an integer (ex "5" to 5)
        value = parseInt(value);
        if (used.indexOf(value) === -1){
            used.push(value);
            var el = $(e.currentTarget);
            $(el).html(current_player.sign);
            current_player.wins.push(value);
            if(!checkWin(current_player)){
              console.log(current_player.name + ' loses ')
              console.log(current_player.wins);
              console.log(isSubArray(current_player.wins, winningCombos));
              switch_current('Ernie');
              switch_current('Bert');
              update_current_player();
            }else{
              console.log(current_player.name + ' wins!');
              $('#winnerBoard').html(current_player.sign);
              $('#firstBoard').hide();
              $('#newWin').show();

            }
         }
        
     }
  
    });
  }

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


