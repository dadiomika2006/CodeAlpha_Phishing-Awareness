

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  const updateNavigation = () => {
    prevBtn.style.display = current === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = current === slides.length - 1 ? 'none' : 'inline-block';
  };

  const showSlide = (index) => {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current = index;
    updateNavigation();
  };

  updateNavigation();

  nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) showSlide(current + 1);
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) showSlide(current - 1);
  });

  const quizData = [
    {
      question: "Which of the following is a strong indicator of a phishing email?",
      options: [
        "A personalized greeting with your full name",
        "Urgent language demanding immediate action",
        "A corporate logo that looks perfect",
        "An email from a known internal address"
      ],
      answer: 1 
    },
    {
      question: "You receive a link that claims to be from your bank but the URL is https://bank-secure-login.com. What should you do?",
      options: [
        "Click it – it looks legitimate",
        "Copy‑paste the URL into a new browser tab",
        "Hover to see the real address and compare with the official domain",
        "Ignore it because banks never send emails"
      ],
      answer: 2
    },
    {
      question: "Which security measure greatly reduces the impact of a compromised password?",
      options: [
        "Changing your password daily",
        "Using multi‑factor authentication (MFA)",
        "Storing passwords in a plain‑text file",
        "Sharing passwords with teammates"
      ],
      answer: 1
    }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const renderQuiz = () => {
    quizData.forEach((q, idx) => {
      const div = document.createElement('div');
      div.className = 'quiz-item';
      const qTitle = document.createElement('p');
      qTitle.textContent = `${idx + 1}. ${q.question}`;
      div.appendChild(qTitle);
      q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.style.display = 'block';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `q${idx}`;
        radio.value = i;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(' ' + opt));
        div.appendChild(label);
      });
      quizContainer.appendChild(div);
    });
  };

  renderQuiz();

  document.getElementById('submit-quiz').addEventListener('click', () => {
    let correct = 0;
    quizData.forEach((q, idx) => {
      const selected = document.querySelector(`input[name="q${idx}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) correct++;
    });
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.textContent = `You answered ${correct} out of ${quizData.length} correctly.`;
    resultDiv.style.color = correct === quizData.length ? '#4caf50' : '#ff5252';
  });
});
