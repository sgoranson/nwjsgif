"use strict";

console.log("histeve");


var win = nw.Window.get();

let fs = require("fs");
let path = require("path");

let modal = document.getElementById("myModal");
let myPic = document.getElementById("myPic");
let PICS = [];

// event handlers {{{
document.getElementById("fourbut").onclick = function(event) {
    let elms = document.getElementsByClassName("column");
    let elmsSize = document.getElementsByClassName("column").length;

    for (let i = 0; i < elmsSize; i++) {
        elms[i].style.flex = "33%";
    }
};

document.getElementById("twobut").onclick = function(event) {
    let elms = document.getElementsByClassName("column");
    let elmsSize = document.getElementsByClassName("column").length;

    for (let i = 0; i < elmsSize; i++) {
        elms[i].style.flex = "50%";
    }
};


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// handy esc,arrowkey browsing
document.onkeydown = function(event) {
    if (event.keyCode === 27) {
        // escape

        document.getElementById("myModal").style.display = "none";
    } else if (event.keyCode === 76) {
        // ArrowRight

        myPic.alt = parseInt(myPic.alt) + 1;
        myPic.src = PICS[parseInt(myPic.alt)];
        modal.style.display = "block";

        console.log("SPG: alt: " + myPic.alt + " src: " + myPic.src);
    } else if (event.keyCode === 72) {
        // ArrowLeft

        myPic.alt = parseInt(myPic.alt) - 1;
        myPic.src = PICS[parseInt(myPic.alt)];
        modal.style.display = "block";
        // console.log("SPG: " + event.key + " code: " + event.keyCode)
    } else if (event.keyCode === 74) {
        window.scrollBy(0, 50);
    } else if (event.keyCode === 75) {
        window.scrollBy(0, -50);
    } else if (event.keyCode === 73) {
        var zoomPercent = 150;
        win.zoomLevel = Math.log(zoomPercent / 100) / Math.log(1.2);
    } else if (event.keyCode === 79) {
        var zoomPercent = 50;
        win.zoomLevel = Math.log(zoomPercent / 100) / Math.log(1.2);
    }
};
//}}}

// main {{{
for (let arg in nw.App.argv) {
    let mydir = nw.App.argv[0];

    PICS = fs
        .readdirSync(mydir)
        .map(pic => path.join(mydir, pic))
        .map(fname => "file://" + fname);

    console.log(JSON.stringify(PICS));


        let nx = document.createElement("div");
        nx.classList.add("column");


        /* now fill it all in again */

        let currentImg = 0;

        /*
                         for (let i = PICS.length - 1; i > 0; i -= 1) {
                             let j = Math.floor(Math.random() * (i + 1));
                             let temp = PICS[i];
                             PICS[i] = PICS[j];
                             PICS[j] = temp;
                         }
         */
        for (let i = 0; i < PICS.length; i++) {
            let n = document.createElement("img");
            // n.src = PICS[startImg + i];
            n.src = PICS[i];
            n.alt = i;
            n.classList.add("pix");

            n.onclick = function() {
                document.getElementById("myPic").src = this.src;
                document.getElementById("myPic").alt = this.alt;
                document.getElementById("myModal").style.display = "block";
            };

            n.style = "width:100%";

            document.getElementById("row0").appendChild(n);
        }
    };
}//}}}
