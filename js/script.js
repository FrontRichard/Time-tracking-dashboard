const container = document.querySelector('.cards__container')
const dailyBt = document.querySelector('.bt__daily')
const weeklyBt = document.querySelector('.bt__weekly')
const monthlyBt = document.querySelector('.bt__monthly')

const urls = [
    "http://localhost:3000/0",
    "http://localhost:3000/1",
    "http://localhost:3000/2",
    "http://localhost:3000/3",
    "http://localhost:3000/4",
    "http://localhost:3000/5"
]


async function request(){
  try{

    const promisses = urls.map(url => fetch(url));
  
    const resp = await Promise.all(promisses);
  
    const dados = await Promise.all(resp.map(resposta => resposta.json()));
  
      dados.forEach(dado => {
       
      const divCard = document.createElement('div')
      divCard.classList.add('card__tasks')
      divCard.innerHTML += dado.image
  
      const divTaskInfo = document.createElement('div')
      divTaskInfo.classList.add('card__tasks_infos')
  
      const titleCard = document.createElement('div')
      titleCard.classList.add('card__title-container')
  
      const h3Card = document.createElement('h3')
      h3Card.textContent = dado.title
  
      const btnTitle = document.createElement('button')
  
      btnTitle.innerHTML = '<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>'
  
  
      titleCard.appendChild(h3Card)
      titleCard.appendChild(btnTitle)
      
      const cardInfo = document.createElement('div')
      cardInfo.classList.add('card__infos_container')
  
      const h2Info = document.createElement('h2')
      h2Info.classList.add('info__hours')
      h2Info.textContent = `${dado.timeframes.daily.current}Hrs`
  
      const p = document.createElement('p')
      p.classList.add('last__week-info')
      p.textContent = `semana passada - ${dado.timeframes.daily.previous}Hrs`
  
      cardInfo.appendChild(h2Info)
      cardInfo.appendChild(p)
  
      divTaskInfo.appendChild(titleCard)
      divTaskInfo.appendChild(cardInfo)
  
      divCard.appendChild(divTaskInfo)
  
      container.appendChild(divCard)
  
      dailyBt.addEventListener('click', () => updateInfo(dado.timeframes.daily, h2Info, p));
      weeklyBt.addEventListener('click', () => updateInfo(dado.timeframes.weekly, h2Info, p));
      monthlyBt.addEventListener('click', () => updateInfo(dado.timeframes.monthly, h2Info, p));
          
    })
  } catch(error){
    alert("Houve um erro no carregamento das informações")
  }
  
}

function updateInfo(timeframe, h2Info, p) {
  h2Info.textContent = `${timeframe.current}Hrs`;
  p.textContent = `semana passada - ${timeframe.previous}Hrs`;
}

request()

