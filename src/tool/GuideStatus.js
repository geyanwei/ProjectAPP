let GuideStatus = {
    getGuideVer(userRoleNew) {
        let str = "";
        switch (userRoleNew) {
            case 0: case 1:
            str = "未认证";
                break;
            case 2: case 3: case 5:
                str = "审核中";
                break;
            case 4:
                str = "已认证";
                break;
            case 6:
                str = "审核不通过";
                break;
            default:
                break;
        }
        return str;
    }
};
module.exports = GuideStatus;