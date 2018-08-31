import {Loading} from "myapplib";

let BaseData = {
    getBaseData(param, successCallBack) {
        let json = [{
            carImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3958423301,3304983826&fm=27&gp=0.jpg",
            carType: "舒适型5座",
            personNum: 4,
            luggageNum: 2,
            brand: "迈腾/锐志/等级同车",
            price: 1910.00
        }, {
            carImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2711016842,2819478053&fm=27&gp=0.jpg",
            carType: "豪华型5座",
            personNum: 4,
            luggageNum: 2,
            brand: "宝马5系/奥迪A6/等级同车",
            price: 1989.00
        }, {
            carImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1311880099,1863368674&fm=200&gp=0.jpg",
            carType: "舒适型7座",
            personNum: 6,
            luggageNum: 3,
            brand: "本田奥德赛/等级同车",
            price: 2045.00
        }, {
            carImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=578014429,1805674510&fm=27&gp=0.jpg",
            carType: "豪华型7座",
            personNum: 6,
            luggageNum: 3,
            brand: "丰田艾尔法/奔驰Viano/等级同车",
            price: 2099.00
        }, {
            carImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1088947770,2554526605&fm=27&gp=0.jpg",
            carType: "豪华型8座",
            personNum: 7,
            luggageNum: 3,
            brand: "凯路威",
            price: 2249.00
        }, {
            carImg: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=841564813,3845081933&fm=27&gp=0.jpg",
            carType: "舒适型9座",
            personNum: 8,
            luggageNum: 3,
            brand: "丰田海狮/双龙路帝/等级同车",
            price: 2550.00
        },];
        Loading.show();
        setTimeout(() => {
            Loading.hide();
            successCallBack && successCallBack(json);
        }, 1000);
    },
};
module.exports = BaseData;