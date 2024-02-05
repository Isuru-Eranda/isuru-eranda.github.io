var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}



var sidemenu = document.getElementById("sidemenu")

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbx25Rcs4AAA9ZM-SYWPrR2bfJT8KFE9RQ5zjzo9sqck-_yOLmct1WOnLoQscIR6K8nTQg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

