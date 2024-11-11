const generatedNumbers = [];

function getContent() {
  const money = document.getElementById('input-placeholder').value;
  
  if (money % 1000 !== 0) {
    alert('뇌 없냐?');
    document.getElementById('input-placeholder').value = 'null';
    document.getElementById('input-placeholder').value = '';
    document.getElementById('lotto-paragragh').innerText = 'ㅤ';

    const ulContainer = document.querySelector('.li-container');
    ulContainer.innerHTML = '';

    return;
  }

  const countLotto = money / 1000 ;
  document.getElementById('lotto-paragragh').innerText = `총 ${countLotto}개를 구매하였습니다.`;

  const ulContainer = document.querySelector('.li-container');

  for (let i = 0; i<countLotto; i++) {
    const numli = document.createElement("li");
    numli.classList.add('number-list');

    const tmp = selectRandom();

    numli.innerText = tmp.join(', ');
    ulContainer.appendChild(numli);
  }
  return generatedNumbers;
}

export default function returnRandNum() {
  return generatedNumbers;
}


const selectRandom = () => {
  const randomIndexArray = []
  for (let i=0; i<6; i++) {
    let randomNum = Math.floor(Math.random() * 45) + 1;

    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    }
    else {
      i--;
    }
  }
  generatedNumbers.push(randomIndexArray);
  return randomIndexArray;
}

window.getContent = getContent;
window.returnRandNum = returnRandNum;
