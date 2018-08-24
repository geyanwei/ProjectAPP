import Storage from '../../../tool/Storage.js'

module.exports = {
    setGuiderInfor(data, cb) {
        let obj = {
            status:data.status,
            backup_mobile:data.backup_mobile,
            birthday:data.birthday,
            city:data.city,
            citys:data.citys,
            contact:data.contact,
            contact_tel:data.contact_tel,
            email:data.email,
            gender:data.gender,
            languages:data.languages,
            level:data.level,
            name:data.name,
            score:data.score,
            job_type:data.job_type,
            wechat:data.wechat,
            address:data.address
        };

        Storage.getUserInfo((userInfor) => {
            if (userInfor && userInfor !== {}) {
                Storage.saveUserInfo(Object.assign(userInfor,obj),()=>{
                    if (cb){
                        cb();
                    }
                })
            }
        });
    },
};