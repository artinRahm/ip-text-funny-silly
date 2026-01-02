const Notify = true;

async function getmjson() {
    try {
        const response = await fetch('/storage/json/messages.json', { cache: "no-store" });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error('Failed to fetch message:', error);
        return null;
    }
}

function createNotification(data) {
    if (!Notify || !data || !data.message) return;

    // Check if this exact message + timestamp was already shown
    const saved = localStorage.getItem('msg');
    if (saved === data.message + " and " + data.timestamp) return;

    // Save this message+timestamp to localStorage so it won't show again
    localStorage.setItem('msg', data.message + " and " + data.timestamp);

    const userBgColor = '#0d0d0d';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%'; 
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '2000';

    const notification = document.createElement('div');
    notification.style.background = userBgColor;
    notification.style.color = 'white';
    notification.style.padding = '30px 40px';
    notification.style.borderRadius = '20px';
    notification.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
    notification.style.fontFamily = "'Comfortaa', sans-serif";
    notification.style.fontSize = '16px';
    notification.style.textAlign = 'center';
    notification.style.maxWidth = '600px';
    notification.style.width = '90%';
    notification.style.position = 'relative';
    notification.style.display = 'flex';
    notification.style.flexDirection = 'column';
    notification.style.gap = '10px';

    const byebyebtn = document.createElement('button');
    byebyebtn.textContent = '×';
    byebyebtn.style.position = 'absolute';
    byebyebtn.style.top = '10px';
    byebyebtn.style.right = '15px';
    byebyebtn.style.fontSize = '24px';
    byebyebtn.style.background = 'transparent';
    byebyebtn.style.border = 'none';
    byebyebtn.style.color = 'white';
    byebyebtn.style.cursor = 'pointer';
    byebyebtn.style.transition = 'opacity 0.2s';
    byebyebtn.style.textShadow = '0 0 0.8px black';

    byebyebtn.addEventListener('mouseenter', () => {
        byebyebtn.style.opacity = '0.6';
    });
    byebyebtn.addEventListener('mouseleave', () => {
        byebyebtn.style.opacity = '1';
    });
    byebyebtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    const toptext = document.createElement('h2');
    toptext.textContent = 'Announcements';
    toptext.style.marginBottom = '5px';
    toptext.style.fontSize = '22px';
    toptext.style.letterSpacing = '1px';
    toptext.style.color = 'white';

    const message = document.createElement('div');
    message.style.marginBottom = '10px';

    const htmlMessage = data.message.replace(
        /(www\.[^\s]+)/g,
        '<a href="https://$1" target="_blank" style="color:#4EA3FF; text-decoration:underline;">$1</a>'
    );

message.innerHTML = htmlMessage;

    const infostuff = document.createElement('div');
    infostuff.style.fontSize = '13px';
    infostuff.style.opacity = '0.85';
    infostuff.style.marginTop = '10px';
    infostuff.style.display = 'flex';
    infostuff.style.alignItems = 'center';
    infostuff.style.justifyContent = 'center';
    infostuff.style.gap = '10px';
    infostuff.style.flexWrap = 'nowrap';
    infostuff.style.whiteSpace = 'nowrap';

    const avatar = document.createElement('img');
    avatar.src = data.avatarUrl || '/storage/images/profile.png';
    avatar.alt = 'avatar';
    avatar.style.width = '24px';
    avatar.style.height = '24px';
    avatar.style.borderRadius = '50%';
    avatar.style.flexShrink = '0';

    const formattedDate = new Date(data.timestamp).toLocaleString();

    const infoText = document.createElement('span');
    infoText.innerHTML = `<strong>${data.authorDisplayName}</strong> (${data.authorUsername}) · ${formattedDate}`;

    infostuff.appendChild(avatar);
    infostuff.appendChild(infoText);

    notification.appendChild(byebyebtn);
    notification.appendChild(toptext);
    notification.appendChild(message);
    notification.appendChild(infostuff);
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
}

async function check() {
    const data = await getmjson();
    createNotification(data);
}

window.onload = () => {
    check();
    setInterval(check, 15000);  // check every 15 seconds for new messages
};
