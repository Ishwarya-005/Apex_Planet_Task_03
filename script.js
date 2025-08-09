document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    { question: "Which company developed JavaScript?", 
        options: ["Netscape", "Microsoft", "Google", "Apple"], 
        answer: "Netscape" },

    { question: "Which symbol is used for comments in JavaScript?", 
        options: ["//", "/* */", "#", "<!-- -->"], 
        answer: "//" },
    { question: "Which method is used to parse a string to an integer in JavaScript?", 
        options: ["parseInt()", "Number()", "toString()", "JSON.parse()"], 
        answer: "parseInt()" }
  ];

  const quizContainer = document.getElementById("quiz");
  quizData.forEach((q, i) => {
    quizContainer.innerHTML += `
      <p class="question">${i + 1}. ${q.question}</p>
      ${q.options.map(opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`).join("")}
    `;
  });

  document.getElementById("submitQuiz").addEventListener("click", () => {
    let score = 0;
    quizData.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.answer) score++;
    });
    document.getElementById("quizResult").textContent = `You scored ${score} out of ${quizData.length}`;
  });

  const pincodeInput = document.getElementById("pincode");
  const getWeatherBtn = document.getElementById("getWeather");
  const weatherResult = document.getElementById("weatherResult");

  getWeatherBtn.addEventListener("click", async () => {
    const location = pincodeInput.value.trim();
    if (!location) {
      weatherResult.textContent = "Please enter a city or pincode.";
      return;
    }

    try {
      const apiKey = "615d7434ce4c5d837e4659195fc9124";
      weatherResult.textContent = "Loading...";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        weatherResult.textContent = `Error: ${data.message}`;
        return;
      }

      weatherResult.innerHTML = `
        <strong>Location:</strong> ${data.name} <br>
        <strong>Temperature:</strong> ${data.main.temp}°C <br>
        <strong>Weather:</strong> ${data.weather[0].description}
      `;
    } catch (err) {
      weatherResult.textContent = "Network error. Check console.";
      console.error(err);
    }
  });
});


