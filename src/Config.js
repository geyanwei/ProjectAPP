
let config = {
    appId:"803348474d544cf9a1b0a1168b787355",
    publicKey:
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtvSYizqRBgs/HQINBopcXO/rT\n" +
    "Nafo97WLtleKMXKPC/iTgC3ziwer2wMUgQhf7HbQcAlYcYCLeG2rH9Ugj8KY4Lvd\n" +
    "R3Dkf67xTCu46AovWDv8qyqoueOYXJdaFKkXOgxIXlNQwcuIpGFs06Dht/idLtKC\n" +
    "eLFAH7GRyP7yo1q04wIDAQAB\n"+
    "-----END PUBLIC KEY-----", //HttpTools 加密公钥；
    onLine:false,
};

if(__DEV__){
    //测试开发，可以摇一摇的 //开发：http://172.25.254.10:9500
    config.url  = 'http://appapi-out.test.io.yitu8.cn';
    config.updateHost  = 'http://appver-out.test.io.yitu8.cn';
    // config.url  = 'http://172.25.254.10:9500';
    // config.updateHost  = 'http://172.25.254.20:32003';
}else{
   //发出去的包，正式的
    if(config.onLine){
        //上线的  同步修改原生代码
        config.url  = 'http://appapi-out.test.io.yitu8.cn';
        config.updateHost  = 'http://appver-out.test.io.yitu8.cn';
    }else{
        // 测试环境的  同步修改原生代码 //测试：http://appapi-out.test.io.yitu8.cn
        config.url  = 'http://appapi-out.test.io.yitu8.cn';
        config.updateHost  = 'http://appver-out.test.io.yitu8.cn';
    }
}
export default config;
