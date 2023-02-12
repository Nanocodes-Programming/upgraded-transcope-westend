const configSocialProofAnimation = {
  spacing: '57px',
  width: '100%',
  widthImg: 'auto',
};

function checkSizeSocialProof(containerId) {
  return function () {
    let width_socialProofAnimationEl = 0;
    let width_socialProofCont1El = 0;
    const socialProofAnimationEl = document.getElementById(
      containerId
    );
    const socialProofCont1El = document.getElementById(
      'social-proof-container-1'
    );
    const socialProofEl = document.getElementById('social-proof');

    if (socialProofAnimationEl) {
      width_socialProofAnimationEl = socialProofAnimationEl.clientWidth;
    }

    if (socialProofCont1El) {
      width_socialProofCont1El = socialProofCont1El.clientWidth;
    }

    if (width_socialProofAnimationEl >= width_socialProofCont1El) {
      socialProofEl.classList.add('big-screen');
    } else {
      socialProofEl.classList.remove('big-screen');
    }
  }
}

function initSocialProof(containerId = 'social-proof-animation', socialProofItems, options) {
  // Set default options
  options = options ? options : {};
  options.speed = options.speed ? options.speed + 's' : '10s';

  const socialProofEl = document.createElement('div');
  socialProofEl.id = 'social-proof';
  socialProofEl.style.animationDuration = options.speed;
  socialProofEl.classList.add('paused');

  for (let i = 1; i <= 2; i++) {
    const socialProofContEl = document.createElement('div');
    socialProofContEl.id = 'social-proof-container-' + i;

    for (let j = 0; j < socialProofItems.length; j++) {
      const socialProofBlockEl = document.createElement('div');
      socialProofBlockEl.className = 'social-proof-block';
      socialProofBlockEl.style.marginRight = configSocialProofAnimation.spacing;

      if (i == 1 && j == socialProofItems.length - 1) {
        socialProofBlockEl.style.marginRight = 0;
      }

      if (i == 2 && j == 0) {
        socialProofBlockEl.style.marginLeft =
          configSocialProofAnimation.spacing;
      }

      const imgEl = document.createElement('IMG');
      imgEl.setAttribute('src', socialProofItems[j].icon);
      imgEl.setAttribute('alt', socialProofItems[j].text);
      imgEl.style.width = configSocialProofAnimation.widthImg;
      socialProofBlockEl.appendChild(imgEl);

      const titleEl = document.createElement('DIV');
      titleEl.className = 'title';
      titleEl.innerHTML = socialProofItems[j].text;
      socialProofBlockEl.appendChild(titleEl);

      socialProofContEl.appendChild(socialProofBlockEl);
    }
    socialProofEl.appendChild(socialProofContEl);
  }

  const socialProofAnimationEl = document.getElementById(containerId);
  if (socialProofAnimationEl) {
    socialProofAnimationEl.style.position = 'relative';
    socialProofAnimationEl.style.width = configSocialProofAnimation.width;
    socialProofAnimationEl.style.overflow = 'hidden';
    socialProofAnimationEl.appendChild(socialProofEl);
  }

  checkSizeSocialProof(containerId)();
  window.addEventListener('resize', checkSizeSocialProof(containerId));
}

function startSocialProofAnimation() {
  const socialProofEl = document.getElementById('social-proof');
  if (socialProofEl) {
    socialProofEl.classList.remove('paused');
  }
}

function stopSocialProofAnimation() {
  const socialProofEl = document.getElementById('social-proof');
  if (socialProofEl) {
    socialProofEl.classList.add('paused');
  }
}

window.initSocialProof = initSocialProof;
window.startSocialProofAnimation = startSocialProofAnimation;
window.stopSocialProofAnimation = stopSocialProofAnimation;
window.checkSizeSocialProof = checkSizeSocialProof;
