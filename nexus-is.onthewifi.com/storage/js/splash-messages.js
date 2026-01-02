const phrases = [
    `hi guys`,
    `cheese`,
    `dont type this on your keyboard: up, up, down, down, left, right, left, right, B, A, enter`,
    `{hostname} certified banger 💯`,
    `im in your walls proof is {ip}`,
    `{battery}`, 
     `wsp gng i just got ur ip witch is {ip} dtwry pookie i got it from my hacking skills`,
];

const paragraph = document.getElementById('dynamicParagraph');
paragraph.style.userSelect = 'none';

let userIP = null;
let flipped = false;
let currentPhrase = null;

function setFlip(state) {
    flipped = state;
    const rotation = flipped ? "180deg" : "0deg";
    ["transform", "-ms-transform", "-webkit-transform", "-o-transform", "-moz-transform"]
    .forEach(prefix => {
        document.body.style[prefix] = `rotate(${rotation})`;
    });
}

function resetFlip() {
    if (flipped) setFlip(false);
}

function getRandomPhrase() {
    if (phrases.length === 1) return phrases[0];
    let phrase;
    let attempts = 0;
    do {
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
        attempts++;
        if (attempts > 10) break;
    } while (phrase === currentPhrase);
    return phrase;
}

async function changeText() {
    let randomPhrase = getRandomPhrase();
    currentPhrase = randomPhrase;

    if (typeof randomPhrase === "string") {
        if (randomPhrase.includes("{ip}")) {
            randomPhrase = randomPhrase.replaceAll("{ip}", userIP || "fetch error");
        }

        if (randomPhrase.includes("{hostname}")) {
            randomPhrase = randomPhrase.replaceAll("{hostname}", location.hostname);
        }

        if (randomPhrase.includes("{time}")) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
            randomPhrase = randomPhrase.replace("{time}", timeString);
        }

        if (randomPhrase.includes("{battery}")) {
            try {
                const battery = await navigator.getBattery();
                const batteryPercent = Math.round(battery.level * 100) + "%";
                randomPhrase = randomPhrase.replace("{battery}", batteryPercent);
            }
            catch (e) {
                randomPhrase = randomPhrase.replace("{battery}", ", actually i dont know what it is.");
                console.error("Battery info not available", e);
            }
        }

        if (randomPhrase.includes("{here}")) {
            randomPhrase = randomPhrase.replace(
                "{here}",
                `<a href="/storage/text/changelog.txt" target="_blank" style="color: lightblue; text-decoration: underline; cursor: pointer;">here</a>`
            );
            paragraph.innerHTML = randomPhrase;
        } else {
            paragraph.textContent = randomPhrase;
        }

        if (randomPhrase === "🙂 dıןɟ ʎddıןɟ ɐ pıp ǝƃɐd ǝɥʇ sdooɥʍ") {
            setFlip(true);
        } else {
            resetFlip();
        }
    }
    else if (randomPhrase.type === "image") {
        paragraph.innerHTML = `<img src="${randomPhrase.src}" alt="Splash Image" style="max-width: ${randomPhrase.width}; height: auto;">`;
        resetFlip();
    }
    else if (randomPhrase.type === "video") {
        paragraph.innerHTML = `<video ${randomPhrase.other || ''} autoplay style="max-width: ${randomPhrase.width}; height: auto;" muted>
            <source src="${randomPhrase.src}" type="video/mp4">
        </video>`;
        resetFlip();
    }
}

window.onload = async () => {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        userIP = data.ip;
        console.log("internet protocol fetched:", userIP);
    }
    catch (e) {
        console.error("Failed to get IP", e);
    }

    await changeText();
};

paragraph.addEventListener('click', () => {
    changeText();
});
