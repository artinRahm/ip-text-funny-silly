// Check if particles are disabled in localStorage, and hide the particles div if so
if (localStorage.getItem('particlesDisabled') === 'false') {
  const checkAndHide = () => {
    const particlesDiv = document.getElementById('particles-js');
    if (particlesDiv) {
      particlesDiv.style.display = 'none';
    } else {
      // If the element isn't loaded yet, try again after 100ms
      setTimeout(checkAndHide, 100);
    }
  };
  checkAndHide();
}

// Listen for changes in localStorage (from other tabs/pages)
window.addEventListener('storage', (event) => {
  if (event.key === 'particlesDisabled') {
    const particlesDiv = document.getElementById('particles-js');
    if (!particlesDiv) return;
    
    if (event.newValue === 'false') {
      particlesDiv.style.display = 'none';
    } else {
      particlesDiv.style.display = '';
    }
  }
});
