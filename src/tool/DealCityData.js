let DealCityData = {
    dealCityData(obj){
        if (!obj||obj=={}){
            return {};
        }
        let cityObj={
            id : obj.cityId,
            name : obj.cityName,
            nameEn : obj.cityNameEn
        };
        obj["cityObj"] = cityObj;
        let serviveCity = obj.serviceCity||[];
        let serviveList = [];
        serviveCity.map((item,index)=>{
            serviveList.push({
                id : item.id,
                name : item.Name,
                nameEn : item.NameEn
            });
        });
        obj.serviceCity = serviveList;
        return obj;
    }
};
module.exports = DealCityData;