// Target Countdown Logic
function updateCountdown() {
    const targetDate = new Date("June 12, 2027 09:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const countdownElem = document.getElementById("countdown-timer");
        if (countdownElem) {
            countdownElem.innerText = `${days}d ${hours}h ${minutes}m`;
        }
    } else {
        const countdownElem = document.getElementById("countdown-timer");
        if (countdownElem) {
            countdownElem.innerText = "Exam Season Active!";
        }
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Pomodoro Timer Logic
let timerMinutes = 25;
let timerSeconds = 0;
let interval = null;

function toggleTimer() {
    const btn = document.getElementById("timer-toggle");
    if (interval) {
        clearInterval(interval);
        interval = null;
        if (btn) btn.innerText = "Start";
        return;
    }
    
    if (btn) btn.innerText = "Pause";
    interval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(interval);
                interval = null;
                if (btn) btn.innerText = "Start";
                alert("Pomodoro session completed! Take a short break.");
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        const display = document.getElementById("timer-display");
        if (display) {
            display.innerText = `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timerMinutes = 25;
    timerSeconds = 0;
    const display = document.getElementById("timer-display");
    const btn = document.getElementById("timer-toggle");
    if (display) display.innerText = "25:00";
    if (btn) btn.innerText = "Start";
}

// LocalStorage Persistence for Syllabus Progress & Answer Draft
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".syllabus-checkbox");
    const progressCounter = document.getElementById("progress-counter");
    const answerDraft = document.getElementById("answer-draft");
    const saveStatus = document.getElementById("save-status");

    // Load Saved Draft
    if (answerDraft) {
        const savedDraft = localStorage.getItem("hpas_answer_draft");
        if (savedDraft) answerDraft.value = savedDraft;
    }

    // Load Checkbox States
    checkboxes.forEach(cb => {
        const id = cb.getAttribute("data-id");
        if (localStorage.getItem(`hpas_${id}`) === "true") {
            cb.checked = true;
        }

        cb.addEventListener("change", () => {
            localStorage.setItem(`hpas_${id}`, cb.checked);
            updateProgress();
        });
    });

    updateProgress();
});

function saveDraft() {
    const answerDraft = document.getElementById("answer-draft");
    const saveStatus = document.getElementById("save-status");
    if (answerDraft) {
        localStorage.setItem("hpas_answer_draft", answerDraft.value);
        if (saveStatus) {
            saveStatus.innerText = "Draft saved locally!";
            saveStatus.classList.add("text-emerald-600", "font-medium");
            setTimeout(() => {
                saveStatus.innerText = "Structure: Introduction -> Hydro status -> Ecological concerns -> Way forward.";
                saveStatus.classList.remove("text-emerald-600", "font-medium");
            }, 3000);
        }
    }
}

function updateProgress() {
    const checkboxes = document.querySelectorAll(".syllabus-checkbox");
    const progressCounter = document.getElementById("progress-counter");
    let checkedCount = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
    });

    const percentage = Math.round((checkedCount / checkboxes.length) * 100) || 0;
    if (progressCounter) {
        progressCounter.innerText = `${percentage}% Completed`;
    }
}
