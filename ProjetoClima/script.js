
    const form = document.querySelector('#form');
    const input = document.querySelector('#input');
    const resultado = document.querySelector('#resultado');
    const titulo = document.querySelector('#titulo');
    const tempInfo = document.querySelector('.tempInfo');
    const ventoInfo = document.querySelector('.ventoInfo');
    const img = document.querySelector('.temp img');
    const aviso = document.querySelector('#aviso');
    const ventoPonto = document.querySelector('.ventoPonto div');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let cidade = input.value.trim();
      if (cidade !== '') {
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=SUA_API_KEY&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();
        if (json.cod === 200) {
          showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
          });
        } else {
          showWarning('Não encontramos esta cidade.');
        }
      }
    });

    function showInfo(json) {
      showWarning('');
      resultado.style.display = 'block';
      titulo.innerHTML = `${json.name}, ${json.country}`;
      tempInfo.innerHTML = `${json.temp}<sup>ºC</sup>`;
      ventoInfo.innerHTML = `${json.windSpeed}<span> km/h</span>`;
      img.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
      ventoPonto.style.transform = `rotate(${json.windAngle - 90}deg)`;
    }

    function showWarning(msg) {
      aviso.innerHTML = msg;
    }
  