const { axios } = require("../src/util/axios");

const getCbpcHarmoney = () =>
  axios({
    url: "/401/a5c90aa982.json",
  }).then((res) => res.data);

const setCbpcHarmoney = (params) =>
  axios({
    url: "/402/7456cec256.json",
    params,
  }).then(({ data: [{ affected_rows }] }) => affected_rows > 0);

let scoreConfig = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
};
const getScore = (arr) =>
  scoreConfig[arr[5]] +
  scoreConfig[arr[6]] +
  scoreConfig[arr[7]] +
  scoreConfig[arr[8]] +
  scoreConfig[arr[10]] +
  scoreConfig[arr[11]] +
  scoreConfig[arr[12]];

const init = async () => {
  let res = await getCbpcHarmoney();
  for (let i = 0; i < res.length; i++) {
    let item = res[i];
    let questions = item.answer.split(",");
    await setCbpcHarmoney({
      _id: item.id,
      score_dept: getScore(questions),
    });
    console.log(`${i + 1}/${res.length}完成同步`);
  }
};
init();
