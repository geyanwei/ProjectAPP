import Login from './main/login/Login';
import BrowserPage from './main/web/BrowserPage.js';
import Main from './main/Main';
import PasswordForget from './main/login/PasswordForget';
import RegisterSuccess from './main/login/RegisterSuccess.js';
import LoginCity from './main/login/cityServer/LoginCity';
import AreaCodeChoose from './main/login/AreaCodeChoose.js'
import RegisterAccount from "./main/login/RegisterAccount";
import AppLaunchLoadingPage from "./main/login/AppLaunchLoadingPage.js";

//客户端路由
import MoreHotSpots from './main/home/MoreHotSpots.js';
import SpotsDetails from './main/home/SpotsDetails.js';
import SpotsDetailsHot from './main/home/SpotsDetailsHot.js';
import CalendarList from './main/home/CalendarList.js';

import InviteFriend from './main/center/InviteFriend.js';
import MyCollection from './main/center/MyCollection.js';
import MyInvoice from './main/center/MyInvoice.js';
import UserInfor from './main/center/UserInfor.js';
import MyWallet from './main/center/MyWallet.js';
import PriceTicket from './main/center/PriceTicket.js';
import MyOrder from './main/center/MyOrder.js';
import Setting from './main/center/Setting.js';
import EditInfor from './main/center/userInfor/EditInfor.js';
//我的发票
import UserCarInvoice from './main/center/myInvoice/UserCarInvoice.js';
import RechargeInvoice from './main/center/myInvoice/RechargeInvoice.js';
import InvoiceRecord from './main/center/myInvoice/InvoiceRecord.js';
import InvoiceDesc from './main/center/myInvoice/InvoiceDesc.js';


//功能Item 接机 送机 单次接送 线路包车 自由包车 当地玩乐
import FreedomCharter from './main/home/actionView/FreedomCharter.js';
import LineCharter from './main/home/actionView/LineCharter.js';
import LocalPlay from './main/home/actionView/LocalPlay.js';
import RecPlace from './main/home/actionView/RecPlace.js';
import SendPlace from './main/home/actionView/SendPlace.js';
import SingleRecOrSend from './main/home/actionView/SingleRecOrSend.js';

import SelectFlight from './main/home/actionView/flight/SelectFlight.js';
import QueryCharter from './main/home/actionView/flight/QueryCharter.js';
import QueryCharterNext from './main/home/actionView/flight/QueryCharterNext.js';
import PositionLocation from './main/home/actionView/flight/PositionLocation.js';
import SelectCity from './main/home/actionView/selectCity/SelectCity.js';


const routeList = {
    "Main": AppLaunchLoadingPage,
    // "Login": Login,
    // "Main": Main,
    "BrowserPage": BrowserPage,
    "PasswordForget": PasswordForget,
    "RegisterSuccess": {screen: RegisterSuccess, navigationOptions: {gesturesEnabled: false}},
    "LoginCity": LoginCity,

    "RegisterAccount": RegisterAccount,
    "AreaCodeChoose": AreaCodeChoose,

    "MoreHotSpots":MoreHotSpots,
    "SpotsDetails":SpotsDetails,
    "SpotsDetailsHot":SpotsDetailsHot,
    'CalendarList': CalendarList,

    'MyCollection': MyCollection,
    'InviteFriend': InviteFriend,
    'MyInvoice': MyInvoice,
    'UserInfor': UserInfor,
    'MyWallet': MyWallet,
    'PriceTicket': PriceTicket,
    'MyOrder': MyOrder,
    'Setting': Setting,
    'EditInfor': EditInfor,
    'UserCarInvoice': UserCarInvoice,
    'RechargeInvoice': RechargeInvoice,
    'InvoiceRecord': InvoiceRecord,
    'InvoiceDesc': InvoiceDesc,

    'FreedomCharter': FreedomCharter,
    'LineCharter': LineCharter,
    'LocalPlay': LocalPlay,
    'RecPlace': RecPlace,
    'SendPlace': SendPlace,
    'SingleRecOrSend': SingleRecOrSend,

    'SelectFlight': SelectFlight,
    'QueryCharter': QueryCharter,
    'QueryCharterNext': QueryCharterNext,
    'PositionLocation': PositionLocation,
    'SelectCity': SelectCity,

};

export default routeList;
