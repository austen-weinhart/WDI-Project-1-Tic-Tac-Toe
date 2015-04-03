angular
  .module("gameApp")
  .controller("gameController", gameController);
gameController.$inject = ['$firebaseObject'];

function gameController($firebaseObject) {

    var self = this;

    var manateeImage = "images/black_manatee_icon.png";

    var boatImage = "images/motorboat-noun.png";

    // var player = "manatee";

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
        syncedObject.playerDisplay = {
          turn: "MANATEE",
          image: manateeImage
        };
        //////////////////////////////////////////////////////////////////////////////////////
        // LIST OF CELLS
        //////////////////////////////////////////////////////////////////////////////////////

        syncedObject.listOfCells = [{
          occupier: "one",
          image: "images/blank.png"
        }, {
          occupier: "two",
          image: "images/blank.png"
        }, {
          occupier: "three",
          image: "images/blank.png"
        }, {
          occupier: "four",
          image: "images/blank.png"
        }, {
          occupier: "five",
          image: "images/blank.png"
        }, {
          occupier: "six",
          image: "images/blank.png"
        }, {
          occupier: "seven",
          image: "images/blank.png"
        }, {
          occupier: "eight",
          image: "images/blank.png"
        }, {
          occupier: "nine",
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

    function decideWinner() {
      //If top row is occupied
      if (self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[1].occupier && self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[2].occupier) {
        if (self.gameObject.listOfCells[0].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If middle row is occupied
      else if (self.gameObject.listOfCells[3].occupier === self.gameObject.listOfCells[4].occupier && self.gameObject.listOfCells[3].occupier === self.gameObject.listOfCells[5].occupier) {
        if (self.gameObject.listOfCells[3].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the bottom row is occupied
      else if (self.gameObject.listOfCells[6].occupier === self.gameObject.listOfCells[7].occupier && self.gameObject.listOfCells[6].occupier === self.gameObject.listOfCells[8].occupier) {
        if (self.gameObject.listOfCells[6].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the left column is occupied
      else if (self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[3].occupier && self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[6].occupier) {
        if (self.gameObject.listOfCells[0].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the middle column is occupied
      else if (self.gameObject.listOfCells[1].occupier === self.gameObject.listOfCells[4].occupier && self.gameObject.listOfCells[1].occupier === self.gameObject.listOfCells[7].occupier) {
        if (self.gameObject.listOfCells[1].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the right column is occupied
      else if (self.gameObject.listOfCells[2].occupier === self.gameObject.listOfCells[5].occupier && self.gameObject.listOfCells[2].occupier === self.gameObject.listOfCells[8].occupier) {
        if (self.gameObject.listOfCells[2].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the forward diagonal is occupied
      else if (self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[4].occupier && self.gameObject.listOfCells[0].occupier === self.gameObject.listOfCells[8].occupier) {
        if (self.gameObject.listOfCells[0].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //If the back diagonal is occupied
      else if (self.gameObject.listOfCells[6].occupier === self.gameObject.listOfCells[4].occupier && self.gameObject.listOfCells[6].occupier === self.gameObject.listOfCells[2].occupier) {
        if (self.gameObject.listOfCells[6].occupier === "manatee") {
          self.gameObject.winner = "THE MANATEES SURVIVE!";
          self.gameObject.$save();
        } else {
          self.gameObject.winner = "THE MANATEES ARE EXTINCT!";
          self.gameObject.$save();
        }
      }
      //Cat's Game
      else if (self.gameObject.listOfCells[0].occupier !== "one" && self.gameObject.listOfCells[1].occupier !== "two" && self.gameObject.listOfCells[2].occupier !== "three" && self.gameObject.listOfCells[3].occupier !== "four" && self.gameObject.listOfCells[4].occupier !== "five" && self.gameObject.listOfCells[5].occupier !== "six" && self.gameObject.listOfCells[6].occupier !== "seven" && self.gameObject.listOfCells[7].occupier !== "eight" && self.gameObject.listOfCells[8].occupier !== "nine") {
        self.gameObject.winner = "STALEMATE";
        self.gameObject.$save();
      }
      //Logs the winner
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
            self.gameObject.$save();
            self.decideWinner();
          } else {
            self.gameObject.listOfCells[$index].image = boatImage;
            self.gameObject.listOfCells[$index].occupier = "boat";
            self.gameObject.player = "manatee";
            self.gameObject.playerDisplay.turn = "MANATEE";
            self.gameObject.playerDisplay.image = manateeImage;
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
      self.gameObject.listOfCells[0].occupier = "one";
      self.gameObject.listOfCells[1].occupier = "two";
      self.gameObject.listOfCells[2].occupier = "three";
      self.gameObject.listOfCells[3].occupier = "four";
      self.gameObject.listOfCells[4].occupier = "five";
      self.gameObject.listOfCells[5].occupier = "six";
      self.gameObject.listOfCells[6].occupier = "seven";
      self.gameObject.listOfCells[7].occupier = "eight";
      self.gameObject.listOfCells[8].occupier = "nine";
      self.gameObject.listOfCells[0].image = "images/blank.png";
      self.gameObject.listOfCells[1].image = "images/blank.png";
      self.gameObject.listOfCells[2].image = "images/blank.png";
      self.gameObject.listOfCells[3].image = "images/blank.png";
      self.gameObject.listOfCells[4].image = "images/blank.png";
      self.gameObject.listOfCells[5].image = "images/blank.png";
      self.gameObject.listOfCells[6].image = "images/blank.png";
      self.gameObject.listOfCells[7].image = "images/blank.png";
      self.gameObject.listOfCells[8].image = "images/blank.png";
      self.gameObject.winner = "";
      self.gameObject.$save();
      self.decideWinner();
    };
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //end of gameController
  ///////////////////////////////////////////////////////////////////////////////////