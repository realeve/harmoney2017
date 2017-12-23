let isMobile = () => {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/MicroMessenger/i)
    ) {
        return true;
    } else {
        return false;
    }
};

const state = {
    isLoading: false,
    userInfo: {},
    cdnUrl: "http://cbpc540.applinzi.com/index.php",
    tips: "",
    sport: {
        id: 1,
        name: "2017年度和谐企业创建",
        orgname: "", // 机构名
        slogan: "2017年度和谐企业创建", // 口号
        timeRange: "12月", // 活动时间
        questionNums: 25, // 抽题数量
        useDept: true,
        isOnline: false, //实际活动
        showDocument: true,
        loadWXInfo: true, // 抽奖活动将载入用户个人信息
        doLottery: false, // 是否参与抽奖
        uid: 0,
        userName: "",
        cardNo: "",
        dpt: ["技术质量部"],
        isLogin: false,
        curScore: 0, // 上次答题得分
        maxTimes: 1,
        curTimes: 0,
        // 最小抽奖得分
        minPrizeScore: 80,
        testMode: false
    },
    paperInit: false,
    peopleCount: 0,
    isPC: !isMobile(),
    refreshInterval: 5 * 1000
};

export default state;