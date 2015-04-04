angular
  .module("gameApp")
  .controller("gameController", gameController);
gameController.$inject = ['$firebaseObject'];

function gameController($firebaseObject) {

  var self = this;

  var manateeImage = "images/black_manatee_icon.png";

  var boatImage = "images/motorboat-noun.png";

  self.gameObject = syncGame();


  //////////////////////////////////////////////////////////////////////////////////////
  // SYNCING TO FIREBASE
  //////////////////////////////////////////////////////////////////////////////////////

  function syncGame() {
    var ref = new Firebase('https://project-1-austen.firebaseio.com/');
    var syncedObject = $firebaseObject(ref);
    //////////////////////////////////////////////////////////////////////////////////////
    // SETTINGS ON LOAD
    //////////////////////////////////////////////////////////////////////////////////////
    syncedObject.$loaded(function() {
      syncedObject.winner = "";
      syncedObject.player = "manatee";
      syncedObject.counter = 0;
      syncedObject.playerDisplay = {
        turn: "MANATEE",
        image: manateeImage
      };
      //////////////////////////////////////////////////////////////////////////////////////
      // LIST OF CELLS
      //////////////////////////////////////////////////////////////////////////////////////

      syncedObject.listOfCells = [{
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }, {
        occupier: "",
        image: "images/blank.png"
      }];
      //end of listOfCells array
      syncedObject.$save();
    });

    return syncedObject;
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //DECIDING THE WINNER
  ////////////////////////////////////////////////////////////////////////////////////
  self.decideWinner = decideWinner;

  function checkWinner(c1, c2, c3) {

    if (self.gameObject.listOfCells[c1].occupier === self.gameObject.listOfCells[c2].occupier && self.gameObject.listOfCells[c1].occupier === self.gameObject.listOfCells[c3].occupier && self.gameObject.listOfCells[c1].occupier !== "") {
      if (self.gameObject.listOfCells[c1].occupier === "manatee") {
        self.gameObject.winner = "THE MANATEES SURVIVE!";
        self.gameObject.$save();
      } else {
        self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
        self.gameObject.$save();
      }
    }
  }

  function decideWinner() {
    //ROWS
    checkWinner(0, 1, 2);
    checkWinner(3, 4, 5);
    checkWinner(6, 7, 8);
    //COLLUMNS
    checkWinner(0, 3, 6);
    checkWinner(1, 4, 7);
    checkWinner(2, 5, 8);
    //DIAGONALS
    checkWinner(0, 4, 8);
    checkWinner(2, 4, 6);
    //CAT'S GAME
    if (self.gameObject.counter >= 9) {
      self.gameObject.winner = "STALEMATE";
      self.gameObject.$save();
    }
    console.log(self.gameObject.winner);
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //MAKES IMAGE APPEAR WHEN CELL IS CLICKED, THEN SWITCHES PLAYER
  ///////////////////////////////////////////////////////////////////////////////////
  self.showImage = function($index) {
    if (self.gameObject.winner === "") {
      if (self.gameObject.listOfCells[$index].image === "images/blank.png") {
        if (self.gameObject.player === "manatee") {
          self.gameObject.listOfCells[$index].image = manateeImage;
          self.gameObject.listOfCells[$index].occupier = "manatee";
          self.gameObject.player = "boat";
          self.gameObject.playerDisplay.turn = "BOAT";
          self.gameObject.playerDisplay.image = boatImage;
          self.gameObject.counter += 1;
          console.log(self.gameObject.counter);
          self.gameObject.$save();
          self.decideWinner();
        } else {
          self.gameObject.listOfCells[$index].image = boatImage;
          self.gameObject.listOfCells[$index].occupier = "boat";
          self.gameObject.player = "manatee";
          self.gameObject.playerDisplay.turn = "MANATEE";
          self.gameObject.playerDisplay.image = manateeImage;
          self.gameObject.counter += 1;
          console.log(self.gameObject.counter);
          self.gameObject.$save();
          self.decideWinner();
        }
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //RESET BUTTON
  ///////////////////////////////////////////////////////////////////////////////////

  self.restart = function() {
    for (var i = 0; i < 9; i++) {
      self.gameObject.listOfCells[i].occupier = "";
      self.gameObject.listOfCells[i].image = "images/blank.png";
    }
    self.gameObject.winner = "";
    self.gameObject.counter = 0;
    self.gameObject.$save();
    self.decideWinner();
  };
}
///////////////////////////////////////////////////////////////////////////////////
//end of gameController
///////////////////////////////////////////////////////////////////////////////////