const SELECTORS = {
  ADVICE_ID: ".js-advice--id",
  ADVICE_TEXT: ".js-advice--text",
  ADVICE_NEW: ".js-advice-new",
};

const adviceIdEl = document.querySelector(SELECTORS.ADVICE_ID);
const adviceTextEl = document.querySelector(SELECTORS.ADVICE_TEXT);
const adviceNewEl = document.querySelector(SELECTORS.ADVICE_NEW);

rerenderAdviceHTML();
adviceNewEl.addEventListener("click", rerenderAdviceHTML);

function rerenderAdviceHTML() {
  adviceIdEl.innerText = "...";
  adviceTextEl.innerText = "...";
  newAdvice()
    .then((advice) => {
      adviceIdEl.innerText = advice.id;
      adviceTextEl.innerText = `"${advice.advice}"`;
    })
    .catch((error) => {
      console.error("Failed to fetch advice:", error.message);
      adviceTextEl.innerText = "Failed to load advice. Please try again.";
    });
}

async function newAdvice() {
  const url = "	https://api.adviceslip.com/advice";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.slip;
  } catch (error) {
    throw new Error(error.message);
  }
}
