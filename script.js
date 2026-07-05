// ===== Contagem Regressiva =====
// ⚠️ TROQUE a data abaixo caso mude (formato: 'AAAA-MM-DDTHH:MM:SS')
const weddingDate = new Date('2028-06-13T04:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

if (daysEl && hoursEl && minutesEl && secondsEl) {
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== Menu Mobile =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== Validação do Formulário de Confirmação (RSVP) =====
const rsvpForm = document.getElementById('rsvp-form');

if (rsvpForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const attendanceInput = document.getElementById('attendance');
  const guestsInput = document.getElementById('guests');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const attendanceError = document.getElementById('attendance-error');
  const guestsError = document.getElementById('guests-error');
  const formSuccess = document.getElementById('form-success');

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showError(input, errorEl, message) {
    input.classList.add('invalid');
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  }

  rsvpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let hasError = false;
    formSuccess.textContent = '';

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Digite seu nome completo.');
      hasError = true;
    } else {
      clearError(nameInput, nameError);
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Digite um email válido.');
      hasError = true;
    } else {
      clearError(emailInput, emailError);
    }

    if (attendanceInput.value === '') {
      showError(attendanceInput, attendanceError, 'Selecione uma opção.');
      hasError = true;
    } else {
      clearError(attendanceInput, attendanceError);
    }

    if (guestsInput.value !== '' && Number(guestsInput.value) < 0) {
      showError(guestsInput, guestsError, 'Número inválido de acompanhantes.');
      hasError = true;
    } else {
      clearError(guestsInput, guestsError);
    }

    if (!hasError) {
      formSuccess.textContent = 'Obrigado por confirmar! Mal podemos esperar para celebrar com você. 💚';
      rsvpForm.reset();
    }
  });

  [nameInput, emailInput, attendanceInput, guestsInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) clearError(input, errorEl);
    });
  });
}