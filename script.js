function getResultDiv() {
  return document.getElementById('result');
}

async function askNasa(date) {
  try {
    const apiKey = '5sYv04oCoD0VaIeeDGuyxKQ0YBQ1vBbasI3egWZp';
    const url = `https://api.nasa.gov/planetary/apod?${date ? `date=${date}&` : ''}api_key=${apiKey}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    displayContent(data);
  } catch (error) {
    console.error(error.message);
  }
}

function handleClick() {
  const button = document.getElementById('button');
  button.addEventListener('click', async () => {
    askNasa(handleInput());
  })
}

function handleInput() {
  const input = document.getElementById('input');
  input.addEventListener('change', async (event) => {
    if (new Date(event.target.value) >= new Date('1995-06-16') && new Date(event.target.value) <= new Date()) {
      await askNasa(event.target.value);
    }
  })
}

function displayContent(data) {
  const contentSection = document.getElementById('result');
  contentSection.innerHTML = '';

  if (data.media_type === 'image') {
    const imgElement = document.createElement('img');
    imgElement.src = data.url;
    imgElement.alt = data.title;
    contentSection.appendChild(imgElement);
  } else if (data.media_type === 'video') {
    const videoElement = document.createElement('iframe');
    videoElement.src = data.url;
    videoElement.allowFullscreen = false;
    contentSection.appendChild(videoElement);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = data.title;

  const explanationElement = document.createElement('p');
  explanationElement.textContent = data.explanation;

  contentSection.appendChild(titleElement);
  contentSection.appendChild(explanationElement);
}

const loadEvent = function () {
  getResultDiv();
  handleClick();
};

window.addEventListener('load', loadEvent);

