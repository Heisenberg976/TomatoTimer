//Get All HTML Objects
const start = document.getElementById("start");
const stopp = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("time");
const checkbox = document.getElementById("checkbox");
const work = document.getElementById("work");
const short = document.getElementById("short");
const long = document.getElementById("long");

//Define Variables
let workTime = 0;
let shortTime = 0;
let longTime = 0;
let actn = "work";
let workk = 0;
let minute = 25;
let sec = 0;
let clicked = 0;
const audio = new Audio("notif.mp3");

//Send Ajax To Retrieve Information from Database for user(for this particular IP)
function getData() {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let array = [];
            array = response.split(',');
            workTime = array[0];
            shortTime = array[1];
            longTime = array[2];
            shortT.value = shortTime;
            longT.value = longTime;
            workT.value = workTime;
            setTime();

        }
    }
    http.open("POST", "ajax/getInfo.php", true);
    http.send();
}

window.onload = getData();
//set time
function setTime() {

    if (clicked == 1) {
        switch (actn) {
            case 'short':
                minute = parseInt(shortT.value);
                sec = 0;
                timer.innerHTML = `${minute}:00`;
                break;
            case 'long':
                minute = parseInt(longT.value);
                sec = 0;
                timer.innerHTML = `${minute}:00`;
                break;
            case 'work':
                minute = parseInt(workT.value);
                sec = 0;
                timer.innerHTML = `${minute}:00`;

        }

    } else if (workTime != 0) {
        switch (actn) {
            case 'short':
                minute = shortTime;
                sec = 0;
                timer.innerHTML = `${minute}:00`;
                break;
            case 'long':
                minute = longTime;
                sec = 0;
                timer.innerHTML = `${minute}:00`;
                break;
            case 'work':
                minute = workTime;
                sec = 0;
                timer.innerHTML = `${minute}:00`;

        }
    } else {
        switch (actn) {
            case 'short':
                minute = 5;
                sec = 0;
                timer.innerHTML = `${minute}:00}`;

                break;
            case 'long':
                minute = 15;
                sec = 0;
                timer.innerHTML = `${minute}:00}`;

                break;
            case 'work':
                minute = 25;
                sec = 0;
                timer.innerHTML = `${minute}:00}`;
                break;
        }
    }

}
//timer
function timeRun() {

    timer.innerHTML = minute + ":" + sec;
    if (minute == 0 && sec == 0) {
        audio.play();
        workk++;
        clearInterval(countDown);
        reset.click();
        start.disabled = false;
        minute = 25;
        sec = 60;
        if (checkbox.checked == true) {
            switch (workk) {
                case 0:
                    work.click();
                    break;
                case 1:
                    short.click();
                    break;

                case 2:
                    work.click();
                    break;

                case 3:
                    short.click();
                    break;
                case 4:
                    work.click();
                    break;
                case 5:
                    short.click();
                    break;
                case 6:
                    work.click();
                    break;
                case 7:
                    long.click();
                    workk = -1;
                    break;
            }
            start.click();
        }
    }

    if (sec == 00) {
        minute--;
        sec = 59;

    }
    sec--;



}
//Listen To Button Clicks
let countDown;
start.addEventListener('click', function() {
    countDown = setInterval(timeRun, 1000);
    start.disabled = true;
})


stopp.addEventListener('click', function() {
    clearInterval(countDown);
    start.disabled = false;

})

reset.addEventListener('click', function() {
    clearInterval(countDown);
    start.disabled = false;
    setTime();
})


short.addEventListener('click', function() {
    this.disabled = true;
    long.disabled = false;
    work.disabled = false;
    start.disabled = false;
    actn = 'short';
    setTime();
    getData();
    clearInterval(countDown);

})

long.addEventListener('click', function() {
    this.disabled = true;
    short.disabled = false;
    work.disabled = false;
    actn = 'long';
    setTime();
    getData();
    clearInterval(countDown);
    start.disabled = false;
})

work.addEventListener('click', function() {
    long.disabled = false;
    short.disabled = false;
    this.disabled = true;
    actn = 'work';
    setTime();
    clearInterval(countDown);
    start.disabled = false;
})

//Get Information From Settings Tab And Make Changes In Database
const submit = document.getElementById("set");
const shortT = document.getElementById("shortT");
const longT = document.getElementById("longT");
const workT = document.getElementById("workT");
const close = document.getElementById("close");
submit.addEventListener('click', function() {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            close.click();
            clicked = 1;
            setTime();
        }
    }
    http.open("POST", 'ajax/check.php', true);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http.send(`shortT=${parseInt(shortT.value)}&longT=${parseInt(longT.value)}&workT=${parseInt(workT.value)}&button=1`);
})