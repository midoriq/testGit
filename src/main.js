import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { format, parseISO } from "date-fns";

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 class = 'text-2xl font-bold text-primary'>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button" class = 'bg-blue-300 p-4'></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


//Pobieranie artykułów
let sortowanie = '';

const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://afdjdcimdzvkaajjbogr.supabase.co/rest/v1/article?select=*' + sortowanie, {
      headers: {
        'Content-Type': 'application/json',
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZGpkY2ltZHp2a2Fhampib2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTM3NTEsImV4cCI6MjA2MzIyOTc1MX0.znQ2LIAxgaEC2Y6gUVe3Wgrbjg7qnqdl-9snWrZ-P-0',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
};

const articles_content = document.getElementById("articles");

const displayArticles = async () => {
  const articles = await fetchArticles();

  articles_content.innerHTML = "";

  articles.forEach(article => {
    const creationDate = format(new Date(parseISO(article.created_at)), 'dd-MM-yyyy');
    articles_content.innerHTML += `
            <div>
              <h1>${article.title}</h1>
              <h2>${article.subtitle}</h2>
              <p>Autor: ${article.author}</p>
              <p>Data: ${creationDate}</p>
              <p>${article.content}</p>
              <hr>
            </div>
          `;
  });

}

displayArticles();

document.getElementById("sort").addEventListener('change', (e) => {
  const sort_type = document.getElementById("sort").value;
  if (sort_type === 'date-asc') {
    sortowanie = '&order=created_at.asc';
  }
  else if (sort_type === 'date-desc') {
    sortowanie = '&order=created_at.desc';
  }
  else if (sort_type === 'title-asc') {
    sortowanie = '&order=title.asc';
  }
  else {
    sortowanie = '';
  }

  displayArticles();
})

