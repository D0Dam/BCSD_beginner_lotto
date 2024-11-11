function openModal() {

  const inputs = document.querySelectorAll('.box-winning-num');

  for (let input of inputs) {
    if (!input.value) {
      alert("다 입력하라고");
      return;
    }
  }

  const modal = document.querySelector('.modal');
  modal.classList.add('on');

  const buyLottoNum = returnRandNum();
  const winNumber = getWinningNum();

  const mainWinningNum = winNumber.slice(0, 6);
  const bonusNum = winNumber[6];

  console.log('구매 번호:', buyLottoNum);
  console.log('당첨 번호:', winNumber);

  const result = [0, 0, 0, 0, 0, 0];  // 3, 4, 5, 5+B, 6, 미당첨

  buyLottoNum.forEach(ticket => {
    let matchCount = 0;
    let isBonus = false;

    ticket.forEach(num => {
      if (mainWinningNum.includes(num)) {
        matchCount += 1;
      }
      if (num === bonusNum) {
        isBonus = true;
      }
    });
    console.log('matchCount:', matchCount, ' / isBonus:', isBonus);
    if (matchCount === 3) {
      if (isBonus) result[1] += 1;
      else result[0] += 1;
    }
    else if (matchCount === 2) {
      if (isBonus) result[0] += 1;
      else result[5] += 1;
    }
    else if (matchCount === 4) {
      if (isBonus) result[2] += 1;
      else result[1] += 1;
    }
    else if (matchCount === 5) {
      if (isBonus) result[3] += 1;
      else result[2] += 1;
    }
    else if (matchCount === 6) result[4] += 1;
    else result[5] += 1;
  })
  
  // 당첨 개수
  const trContainer3 = document.querySelector('#accordNumber3');
  const existingTd3 = trContainer3.querySelector('.table_td:nth-child(3)');
  if (existingTd3) {
    existingTd3.innerText = `${result[0]}개`;
  } else {
    const catchNum3 = document.createElement("td");
    catchNum3.classList.add('table_td');
    catchNum3.innerText = `${result[0]}개`;
    trContainer3.appendChild(catchNum3);
  }

  const trContainer4 = document.querySelector('#accordNumber4');
  const existingTd4 = trContainer4.querySelector('.table_td:nth-child(3)');
  if (existingTd4) {
    existingTd4.innerText = `${result[1]}개`;
  } else {
    const catchNum4 = document.createElement("td");
    catchNum4.classList.add('table_td');
    catchNum4.innerText = `${result[1]}개`;
    trContainer4.appendChild(catchNum4);
  }

  const trContainer5 = document.querySelector('#accordNumber5');
  const existingTd5 = trContainer5.querySelector('.table_td:nth-child(3)');
  if (existingTd5) {
    existingTd5.innerText = `${result[2]}개`;
  } else {
    const catchNum5 = document.createElement("td");
    catchNum5.classList.add('table_td');
    catchNum5.innerText = `${result[2]}개`;
    trContainer5.appendChild(catchNum5);
  }

  const trContainer5_Bonus = document.querySelector('#accordNumber5_Bonus');
  const existingTd5Bonus = trContainer5_Bonus.querySelector('.table_td:nth-child(3)');
  if (existingTd5Bonus) {
    existingTd5Bonus.innerText = `${result[3]}개`;
  } else {
    const catchNum5_Bonus = document.createElement("td");
    catchNum5_Bonus.classList.add('table_td');
    catchNum5_Bonus.innerText = `${result[3]}개`;
    trContainer5_Bonus.appendChild(catchNum5_Bonus);
  }

  const trContainer6 = document.querySelector('#accordNumber6');
  const existingTd6 = trContainer6.querySelector('.table_td:nth-child(3)');
  if (existingTd6) {
    existingTd6.innerText = `${result[4]}개`;
  } else {
    const catchNum6 = document.createElement("td");
    catchNum6.classList.add('table_td');
    catchNum6.innerText = `${result[4]}개`;
    trContainer6.appendChild(catchNum6);
  }

  // 수익률 계산
  const winningMoney = (result[0] * 5000) + (result[1] * 50000) + (result[2] * 1500000) + (result[3] * 30000000) + (result[4] * 2000000000);
  const rate = Math.round((winningMoney / (buyLottoNum.length * 10000)) * 100).toFixed(1);

  const rateSkyrocket = document.querySelector('#rate');
  rateSkyrocket.innerHTML = '';
  const rate_p_tag = document.createElement("p");
  rate_p_tag.classList.add('rate-context');
  rate_p_tag.innerText = `당신의 총 수익률은 ${rate}%입니다.`;

  rateSkyrocket.appendChild(rate_p_tag);

  console.log(rate);
  
  return result;
}

function calculate(count) {
  const result = [0, 0, 0, 0, 0, 0];  // 3, 4, 5, 5+B, 6, 미당첨

  for (let i=1; i<count.length; i++) {
    for (let j=0; j<6; j++)

      if (count[(i*6)+j][0] === 3) {
        // 3개
        result[0] += 1;
      }
      else if (count[(i*6)+j][0] === 4) {
        // 4개
        result[1] += 1;
      }
      else if (count[(i*6)+j][0] === 5) {
        // 5개
        result[2] += 1;
      }
      else if (count[(i*6)+j][0] === 6) {
        if (count[(i*6)+j][1] === 1) {
          // 5개 보너스볼
          result[3] += 1;
        }
        else {
          // 6개
          result[4] += 1;
        }
      }
      else if (count[(i*6)+j][0] >= 7) {
        // 6개 + 보너스볼 (조건에는 없음)
        result[4] += 1
      }
      else {
        // 미당첨
        result[5] += 1
      }
  }

  console.log("result :", result);

  return result;
}

function clearLottoNumbers() {
  const ulContainer = document.querySelector('.li-container');
  ulContainer.innerHTML = ''; // 모든 자식 요소 삭제
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('on');
  
  document.getElementById('input-placeholder').value = null;
  document.getElementById('lotto-paragragh').innerText = 'ㅤ';
  document.querySelectorAll('.box-winning-num').forEach(input => {
    input.value = null;
  });

  clearLottoNumbers();
}

function getWinningNum() {
  const inputElements = document.querySelectorAll('.box-winning-num');
  let value = Array.from(inputElements).map(input => input.value);
  value = value.map(Number);

  return value;
}

window.openModal = openModal;
window.closeModal = closeModal;
