window.addEventListener('load', function () {
    const applyBackgroundColor = () => {
        const color = localStorage.getItem('backgroundColor') || '#1e98e9ff';
        if (document.body.style.backgroundColor !== color) {
            document.body.style.backgroundColor = color;
        }
    };

    applyBackgroundColor();

    setInterval(applyBackgroundColor, 250);
});

// #0d0d0d if not working
