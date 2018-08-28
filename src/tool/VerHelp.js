/**
 * Created by yitu8 on 2018/4/15.
 */
let VerHelp = {
    /**
     *
     * @param phone {string}手机号
     * @returns {bool} 返回 true or false
     */
    getPhone(phone){
        if (!phone||phone.length<1){
            return false;
        }
        var isMobile = (/^1[34578]\d{9}$/.test(phone));
        return isMobile;
    },
    getTel(tel){
        if (!tel||tel.length<1){
            return false;
        }
        var isTel = (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel));
        return isTel;
    },
    getNum(tel){
        if (!tel||tel.length<1){
            return false;
        }
        var isTel = (/^[0-9]*$/.test(tel));
        return isTel;
    },

    getIdNum(idNum){
        if (!idNum||idNum.length<1){
            return false;
        }
        var isIdNum = (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum));
        return isIdNum;
    },
    getEmail(idNum){
        if (!idNum||idNum.length<1){
            return false;
        }
        // /^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

        var isIdNum  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(idNum);
        return isIdNum;
    },
    getWeChat(idNum){
        if (!idNum||idNum.length<1){
            return false;
        }
        var isIdNum  = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(idNum);
        return isIdNum;
    },

    getPassWord(passWord){
        if (!passWord||passWord.length<1){
            return false;
        }
        let isPassWord  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(passWord);
        return isPassWord;
    },
};
module.exports = VerHelp;