const buyForm = document.querySelector('#buy-form');
const inquiryForm = document.querySelector('#inquiry-form');
const modal = document.getElementById('result-modal');
const modalResults = document.getElementById('modal-results');
const resetButton = document.querySelector('.btn-reset');
const lottoList = document.querySelector('.lotto-list-box');

//로또 번호 만들기
const generateLottoNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1); 
  }
  return [...numbers].sort((a, b) => a - b).join(', ');
}

//구매
const checkPurchase = (price) => {
  if (price % 1000 === 0){
    const lottoCount = price / 1000;
    document.getElementById('total-num').textContent = lottoCount;
    for (let i = 0; i < lottoCount; i++) {
      const lottoNumbers = generateLottoNumbers();
      addLottoToList(lottoNumbers);
    }
    return lottoCount;
  }else{
    alert("1000원 단위로만 구매 가능합니다.");
    return 0;
  }
} 

//로또 리스트 추가
const addLottoToList = (lottoNumbers) => {
  const listItem = document.createElement('li');
  listItem.classList.add('lotto-list-item');
  listItem.textContent = `🎟️ ${lottoNumbers}`;
  lottoList.appendChild(listItem);
}

// 리스트 비우기
const resetLottoList = () => {
  lottoList.innerHTML = '';
  document.getElementById('total-num').textContent = '0'; 
};

// 당첨금 구조
const prizeStructure = {
  1: { match: 6, prize: 2000000000, count: 0 },
  2: { match: 5, prize: 30000000, count: 0, bonus: true },
  3: { match: 5, prize: 1500000, count: 0 },
  4: { match: 4, prize: 50000, count: 0 },
  5: { match: 3, prize: 5000, count: 0 }
};

// 총 당첨금 및 수익률 계산
const calculate = (totalLottoCount) => {
  let totalPrize = 0;
  Object.values(prizeStructure).forEach(prize => {
    totalPrize += prize.prize * prize.count;
  });
  const purchaseAmount = totalLottoCount * 1000;
  const returnRate = ((totalPrize / purchaseAmount) * 100).toFixed(2);

  return { totalPrize, returnRate };
};

//당첨 조회
const checkWinningNumbers = () => {
  const winningNumbers = [];
  const bonusNumber = Number(inquiryForm.querySelector('.inquiry-input-bonus input').value);
  const winningInputs = inquiryForm.querySelectorAll('.inquiry-input-winning input');
  winningInputs.forEach(input => {
    winningNumbers.push(Number(input.value));
  });

  if (winningNumbers.some(num => num === 0) || bonusNumber === 0) {
    alert("모든 번호를 입력해주세요.");
    return;
  }

  // 당첨 개수 초기화
  Object.keys(prizeStructure).forEach(key => {
    prizeStructure[key].count = 0;
  });

  // 구매한 로또 번호와 당첨 번호 비교
  const lottoItems = document.querySelectorAll('.lotto-list-item');
  lottoItems.forEach(item => {
    const lottoNumbers = item.textContent.replace('🎟️ ', '').split(', ').map(Number);
    const matchCount = lottoNumbers.filter(num => winningNumbers.includes(num)).length;
    const hasBonus = lottoNumbers.includes(bonusNumber);

    if (matchCount === 6) prizeStructure[1].count++;
    else if (matchCount === 5 && hasBonus) prizeStructure[2].count++;
    else if (matchCount === 5) prizeStructure[3].count++;
    else if (matchCount === 4) prizeStructure[4].count++;
    else if (matchCount === 3) prizeStructure[5].count++;
  });

  const totalLottoCount = lottoItems.length;
  const { totalPrize, returnRate } = calculate(totalLottoCount);

  let resultMessage = `
    일치 갯수   당첨금        당첨 갯수\n
    3개         5,000         ${prizeStructure[5].count}개\n
    4개         50,000        ${prizeStructure[4].count}개\n
    5개         1,500,000     ${prizeStructure[3].count}개\n
    5개+보너스  30,000,000    ${prizeStructure[2].count}개\n
    6개         2,000,000,000 ${prizeStructure[1].count}개\n
    \n당신의 총 수익률은 ${returnRate}%입니다.
  `;

  modalResults.textContent = resultMessage;
  modal.showModal();

  winningInputs.forEach(input => { input.value = ''; });
  inquiryForm.querySelector('.inquiry-input-bonus input').value = '';
}

// 구입 버튼 클릭 이벤트
buyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const priceInput = document.querySelector('#buy-input');
  const price = Number(priceInput.value); // 숫자로 변환해야 함
  checkPurchase(price);
  priceInput.value = '';
});

//결과 확인 버튼 클릭 이벤트
inquiryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkWinningNumbers();
});

//모달
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

//다시 시작하기 -> 리스트 리셋
resetButton.addEventListener('click', () => {
  resetLottoList();
  modal.close();
});
