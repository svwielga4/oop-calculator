/*************************
 * Calculator body object -
 *  all updates pass through the body
 *  @constructor
 *
 * */
function calcBody() {
    const self = this;
    //feel free to change the layout as you wish
    this.buttonMap = [
      ["1", "2", "3", "*"],
      ["4", "5", "6", "/"],
      ["7", "8", "9", "-"],
      ["0", "C", "=", "+"]
    ];
    this.body = $(".calculatorBody");
    this.face;
    this.buttonRows;
    this.calculator;
  
    //init function for calculator DOM creation
    this.init = function() {
      this.addCalculator();
      this.addFace();
      //creates the number of rows depending on the button map length
      this.addButtonRows(self.buttonMap.length);
      this.registerButtonRows();
      this.addButtons(self.buttonMap);
    };

    this.addCalculator = function(){
      const calculator = new Calculator(self);
      self.calculator = calculator;
    }

    this.addFace = function() {
      const face = new Face(self);
      $(face.body).appendTo(self.body);
      self.registerFace(face.faceRef);
    };
  
    this.registerFace = function(face) {
      self.face = face;
    };
  
    this.addButtonRows = function(numRows) {
      let numIndex = 0;
      while (numIndex < numRows) {
        $("<div></div>", {
          class: "buttonRow row" + (numIndex + 1)
        }).appendTo(self.body);
        numIndex++;
      }
    };
  
    this.registerButtonRows = function() {
      self.buttonRows = $(".buttonRow");
    };
  
    this.addButtons = function(buttonMap) {
      /* 2 while loops used instead of 2 for loops, 
        feels klunky, maybe recursive function later */
      var mapIndex = buttonMap.length;
      while (mapIndex > 0) {
        let currentRow = $(".row" + mapIndex);
        let buttonIndex = 0;
        while (buttonIndex < buttonMap[mapIndex-1].length) {
          /*creates a button by passing the keyface 
          from the buttonMap and then appends to the current row*/
          $(new Button(buttonMap[mapIndex - 1][buttonIndex], self)).appendTo(
            currentRow
          );
          buttonIndex++;
        }
        mapIndex--;
      }
    };
  
    this.update = function(keyPress){
      self.calculator.update(keyPress)
    }
  }