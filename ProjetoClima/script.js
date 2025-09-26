document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bf06888ce7a545492d64642bb7984471&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let json = await result.json();

    console.log(json);
  } else {
    showWarning('Digite uma cidade válida!');
  }
});

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}
