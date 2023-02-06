export const Toast = {
  counter: 0,
  init() {
    let containerBottom = document.createElement('div');
    containerBottom.className = 'container-bottom';
    document.body.append(containerBottom);

    let containerTop = document.createElement('div');
    containerTop.className = 'container-top';
    document.body.append(containerTop);

    let cssScript = document.createElement('link');
    cssScript.rel = 'stylesheet';
    cssScript.href = './Toast/toast.css';
    document.head.append(cssScript);
  },

  show(message, type, position, seconds) {
    let containerTop = document.querySelector('.container-top');
    let containerBottom = document.querySelector('.container-bottom');
    let container;
    let hideTimeOut = null;

    let toast = document.createElement('div');
    let cross = document.createElement('div');

    toast.className = 'toast';
    cross.className = 'cross';
    cross.innerText = 'X';

    if (position.includes('top')) {
      containerTop.appendChild(toast);
      container = containerTop;
    } else {
      containerBottom.appendChild(toast);
      container = containerBottom;
    }

    toast.textContent = message;
    toast.classList = 'toast toast--visibility';
    toast.id = ++this.counter;

    this.setRemainingTime(toast, seconds);

    toast.appendChild(cross);

    this.setToastPlacement(position, container);

    toast.classList.add(`toast--${type}`);

    const deleteId = document.getElementById(this.counter);

    cross.addEventListener('click', () =>
      this.removeToast(deleteId, hideTimeOut)
    );

    hideTimeOut = setTimeout(() => {
      this.removeToast(deleteId, hideTimeOut);
    }, seconds * 1000);
  },

  setRemainingTime(toast, seconds) {
    let timeRemaining = document.createElement('div');
    let removeInterval = null;

    timeRemaining.textContent = `${seconds}`;
    timeRemaining.className = 'time-remaining';

    const render = (sec) => {
      timeRemaining.textContent = `${sec}`;
    };

    if (seconds === 0) {
      clearInterval(removeInterval);
    }

    removeInterval = setInterval(() => {
      seconds--;
      render(seconds);
    }, 1000);

    toast.appendChild(timeRemaining);
  },

  setToastPlacement(position, container) {
    let toasts = document.querySelectorAll('.toast');

    let topOrBottom = position.split('-')[0];
    let placement = position.split('-')[1];

    toasts.forEach((toast) => {
      if (topOrBottom === 'top') {
        toast.style.marginTop = '20px';
      } else {
        toast.style.marginBottom = '20px';
      }
    });

    container.style[topOrBottom] = '20px';

    switch (placement) {
      case 'center':
        container.style.left = '50%';
        container.style.transform = 'translate(-50%)';
        break;
      case 'left':
        container.style.left = '20px';
        break;
      case 'right':
        container.style.right = '20px';
        break;
    }
  },

  removeToast(deleteId, hideTimeOut) {
    deleteId.classList.add('hidden');
    deleteId.addEventListener('transitionend', () => {
      deleteId.remove();
      clearTimeout(hideTimeOut);
    });
  },
};
