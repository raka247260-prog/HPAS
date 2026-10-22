// Tab Switching Logic
function switchTab(tabId) {
    const tabs = ['dashboard', 'hppsc-notes', 'ai-predictor'];
    tabs.forEach(t => {
        const section = document.getElementById(`tab-${t}`);
        const navBtn = document.getElementById(`nav-${t}`);
        if (section) {
            if (t === tabId) {
                section.classList.remove('hidden');
                if (navBtn) {
                    navBtn.className = "py-4 px-1 border-b-2 border-indigo-600 font-semibold text-sm text-indigo-600 cursor-pointer";
                }
            } else {
                section.classList.add('hidden');
                if (navBtn) {
                    navBtn.className = "py-4 px-1 border-b-2 border-transparent font-medium text-sm text-slate-500 hover:text-slate-700 cursor-pointer";
                }
            }
        }
    });
}

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

    if (answerDraft) {
        const savedDraft = localStorage.getItem("hpas_answer_draft");
        if (savedDraft) answerDraft.value = savedDraft;
    }

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

// AI Trend Simulation & Quiz Evaluation
function generateAIPredictions() {
    const container = document.getElementById("ai-predictions-output");
    container.innerHTML = `
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 animate-pulse">
            <h3 class="font-bold text-emerald-900 text-sm mb-2">⚡ AI Neural Model Analysis Active...</h3>
            <p class="text-xs text-emerald-800 leading-relaxed">Scanning recent HPPSC syllabus weightage: High probability of questions focusing on <strong>Green Energy Transition in Himachal</strong>, <strong>Apple Market Intervention Scheme reforms</strong>, and <strong>Tribal Culture (Pangi & Lahaul customs)</strong> for the upcoming examination cycle.</p>
        </div>
    `;
}

function evaluateQuiz() {
    const q1Correct = document.querySelector('input[name="q1"]:checked');
    const q2Correct = document.querySelector('input[name="q2"]:checked');
    
    let score = 0;
    let total = 2;

    const exp1 = document.getElementById("explanation-q1");
    const exp2 = document.getElementById("explanation-q2");

    exp1.classList.remove("hidden");
    exp2.classList.remove("hidden");

    if (q1Correct && q1Correct.value === "b") {
        score++;
        exp1.innerHTML = "<strong>Correct!</strong> Statement 1 is incorrect (Mandi Praja Mandal was founded in 1939 by Pandit Sukh Ram's father / Hari Singh). Statement 2 is correct.";
        exp1.className = "mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900";
    } else {
        exp1.innerHTML = "<strong>Incorrect.</strong> Correct answer is '2 only'. Mandi Praja Mandal was established in 1939.";
        exp1.className = "mt-3 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-900";
    }

    if (q2Correct && q2Correct.value === "c") {
        score++;
        exp2.innerHTML = "<strong>Correct!</strong> Satluj River basin has the highest hydro-electric power potential in Himachal Pradesh (e.g., Nathpa Jhakri, Karcham Wangtoo).";
        exp2.className = "mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900";
    } else {
        exp2.innerHTML = "<strong>Incorrect.</strong> Correct answer is 'Satluj Basin'. It accounts for the largest share of hydropower in HP.";
        exp2.className = "mt-3 p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-900";
    }

    const scoreDisplay = document.getElementById("quiz-score-display");
    scoreDisplay.innerText = `Score: ${score} / ${total} (${Math.round((score/total)*100)}%)`;
}
