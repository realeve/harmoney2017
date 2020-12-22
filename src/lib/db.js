import { axios } from "./axios";

/**
*   @database: { 微信开发 }
*   @desc:     { 和谐满意度调查_2018_登录 } 
    const { dept, username, id_card } = params;
*/
// export const getCbpcHarmoneyUserlist = (params) =>
//   axios({
//     url: "/114/dc94ff60a8.json",
//     params,
//   });

export const getCbpcHarmoneyUserlist = (params) =>
  axios({
    url: "/359/99a4277875.json",
    params,
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门列表 }
 */
export const getCbpcHarmoneyUserlistDepts = () =>
  axios({
    url: "/242/6a4d61905e/10.array",
    // url: "/115/5e946191de/10.array",
  }).then((res) =>
    res.data.map((item) => item[1]).filter((item) => item !== "董事会、经理部")
  );

/**
*   @database: { 微信开发 }
*   @desc:     { 和谐满意度调查提交试卷 } 
    const { uid, score_company, score_dept, suggest_company, suggest_dept, answer, start_time, rec_time } = params;
*/
export const addCbpcHarmoney = (params) =>
  axios({
    url: "/116/c70a2a16db.json",
    params,
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 和谐满意度得分列表 }
 */
export const getCbpcHarmoney = () =>
  axios({
    url: "/117/a40d2beaba.json",
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 各部门参与情况 }
 */
export const getCbpcHarmoneyDept = () =>
  axios({
    url: "/118/00b75ddd82.json",
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 更新url阅读数 }
 */
export const addCommonVisitCount = (url) =>
  axios({
    url: "/5/4c908bffac.json",
    params: {
      url,
    },
  });
