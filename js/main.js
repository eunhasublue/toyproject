function upDownScrollbar() {
  if (
    document.getElementById("usage-history-id").className === "usage-history"
  ) {
    document.getElementById("usage-history-id").classList.add("up-scroll");
  } else {
    document.getElementById("usage-history-id").classList.remove("up-scroll");
  }
}

fetch(
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211222%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211222T143537Z&X-Amz-Expires=86400&X-Amz-Signature=df9d68768305f59ca69fce9d041f6ca1e7b2839c6ad517858e4e421f1773f2d9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject"
)
  .then((res) => res.json())
  .then((obj) => {
    start(obj.bankList);
  });

function start(obj) {
  // 처음 출력 원인으로 값 초기화
  let initDay = 0;
  let today = -1;
  for (let i = obj.length - 1; i >= 0; i--) {
    if (initDay !== obj[i].date) {
      today++;
      const divElem = document.createElement("div");
      divElem.classList.add("daily-usage-list");
      document.querySelector(".daily-usage").appendChild(divElem);

      // 일자
      const spanElemDate = document.createElement("span");
      spanElemDate.textContent = dateNumberModeify(today);
      spanElemDate.classList.add("date");
      divElem.appendChild(spanElemDate);

      // 날짜별 지출액 합계 함수
      const priceSum = getDayPriceSum(obj, obj[i].date);

      // 일자별 지출 총액
      const spanElemAmount = document.createElement("span");
      spanElemAmount.textContent = priceSum + "원 지출";
      spanElemAmount.classList.add("daily-amount");
      divElem.appendChild(spanElemAmount);

      var ulElem = document.createElement("ul");
      document.querySelector(".daily-usage").appendChild(ulElem);

      // 값 초기화 후, 날짜 대입
      initDay = obj[i].date;
    }

    const liElem = document.createElement("li");

    // 지출 내역명
    const spanElemHistory = document.createElement("span");
    spanElemHistory.textContent = obj[i].history;

    // 지출 비용
    const spanElemCost = document.createElement("span");
    spanElemCost.textContent = obj[i].price;

    liElem.appendChild(spanElemHistory);
    liElem.appendChild(spanElemCost);
    ulElem.appendChild(liElem);
  }
}

function getDayPriceSum(obj, date) {
  const objArray = obj.filter((item) => item.date === date);
  let priceSum = 0;
  for (let i = 0; i < objArray.length; i++) {
    priceSum += objArray[i].price;
  }
  // console.log(date, priceSum);
  return priceSum;
}

function dateNumberModeify(today) {
  // const dateNumber = Number(date.split("-").join(""));
  if (today === 0) {
    return "오늘";
  } else if (today === 1) {
    return "어제";
  } else {
    return today + "일전";
  }
}
