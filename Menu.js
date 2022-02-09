class Menu {
  constructor() {
    /* Menu is a class for a graphical menu.
     * Its constuctor Takes either an arbitrary number of MenuItem instances as
     * arguments or an array of MenuItem instances. These instances serve as one item
     * in the menu.
     */

    // Manages whether the user inputted multiple MenuItem instances as arguments or an array of MenuItem instances

    this.items = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);

    // manages which item is selected first using the selectionPriority of each item

    let maxSelectionPriority = -Infinity;
    this.items.forEach((i, iInd, iArr) => {
      if (i.selectionPriority > maxSelectionPriority) {
        this.selectedIndex = iInd;
      }
    });

    // Defines the select, right, and left functions in a more DRY-ed out way.
    // These functions are routed to the respective function of the currently selected menu item.

    for (let i of ["select", "right", "left"]) {
      this[i] = function() {
        this.items[this.selectedIndex][i]();
      }
    }
  }

  show() {
    // Shows the menu

    push();

    textAlign(LEFT, TOP);
    fill("white");
    textSize(30);

    this.items.forEach((i, iInd, iArr) => {
      push();
      translate(10, 10 + 40*iInd);
      i.show(iInd == this.selectedIndex);
      pop();
    });

    pop();
  }

  up() {
    // navigates to the previous item

    this.selectedIndex = posMod(this.selectedIndex - 1, this.items.length);
  }
  
  down() {
    // navigates to the next item

    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
  }
}

class MenuItem {
  static showArrow(isSelected) {
    if (isSelected) {
      fill("yellow");
      triangle(0, 0, 0, 30, sqrt(3)*15, 15);
    }
  }

  static showText(isSelected, txt, showArrow = true) {
    if (showArrow) MenuItem.showArrow(isSelected);
    fill(isSelected ? "yellow" : "lightGrey");
    text(txt, 40 + (isSelected ? (15*((sin(millis()/200))+1)/2) : 0), 0);
  }

  constructor(show = function (isSelected) {
    MenuItem.showText(isSelected, "Sample Text");
  }, select = function(){}, right = function(){}, left = right, selectionPriority = 0) {
    this.show = show;
    this.select = select;
    this.right = right;
    this.left = left;
    this.selectionPriority = selectionPriority;
  }
}

class Action extends MenuItem {
  constructor(text = "Sample Text", action = function(){}, selectionPriority = 0) {
    super(function(isSelected){MenuItem.showText(isSelected, text)}, action, function(){}, function(){}, selectionPriority = selectionPriority);
  }
}

class Range extends MenuItem {
  constructor(propertyName, min = 1, max = Infinity, step = 1, suffix = "", defaultValue = min, selectionPriority = 0) {
    super(
      function (isSelected) {
        MenuItem.showText(isSelected, `${propertyName}: ${this.value}${suffix}`);
        stroke(isSelected ? "yellow" : "lightGrey");
        strokeWeight(1);
        line(40, 32, 140, 32);
        strokeWeight(5);
        line(40, 32, 40 + (this.value - min)/(max - min) * 100, 32);
      }, function () {
        let reply = prompt(`Enter ${propertyName}${suffix == "" ? "" : " (in "+suffix+")"}`);
        if ([null, ""].includes(reply) || isNaN(reply)) return false;
        this.value = Math.min(Math.max(int(reply / step) * step, min), max);
        return true;
      }, function () {
        this.value = Math.min(int((this.value + step) / step)* step, max);
      }, function () {
        this.value = Math.max(int((this.value - step) / step)* step, min);
      },
    selectionPriority);
    this.value = Math.min(Math.max(int(defaultValue / step) * step, min), max);
  }
}

class Choice extends MenuItem {
  constructor(propertyName, values, keys = values, defaultIndex = 0, selectionPriority = 0) {
    super(
      function(isSelected) {
        MenuItem.showText(isSelected, `${propertyName}: ${(keys[this.index] == undefined) ? this.value : keys[this.index]}`);
        stroke(isSelected ? "yellow" : "lightGrey");
        values.forEach((i, iInd, iArr) => {
          strokeWeight(iInd == this.index ? 5 : 2);
          point(40 + iInd/values.length * 100, 32);
        });
      },
      function () {},
      function() {
        this.index = (this.index + 1) % values.length;
      },
      function() {
        this.index = posMod((this.index - 1), values.length);
      },
      selectionPriority = selectionPriority
    );

    this.index = defaultIndex;
    this.values = values;
  }

  get value() {
    return this.values[this.index];
  }
}