import { axios } from './axios';

/**
*   @database: { 微信开发 }
*   @desc:     { 和谐满意度调查_2018_登录 } 
    const { dept, username, id_card } = params;
*/
export const getCbpcHarmoneyUserlist = (params) =>
  axios({
    url: '/114/dc94ff60a8.json',
    params
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门列表 }
 */
export const getCbpcHarmoneyUserlistDepts = () =>
  axios({
    url: '/115/5e946191de/10.array'
  });
