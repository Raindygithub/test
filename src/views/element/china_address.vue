<template>
    <div>
        <el-form>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-select
                  v-model="selectProvince"
                  placeholder="请选择省"
                  
                  style="width: 145px"
                >
                  <el-option
                    v-for="item in provinces"
                    size="small"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click.native="changeProvince()"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="selectCity"
                  placeholder="请选择市"
                  style="width: 145px"
                >
                  <el-option
                    v-for="item in cities"
                    size="small"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click.native="changeCity"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="selectArea"
                  placeholder="请选择区"
                  style="width: 145px"
                >
                  <el-option
                    v-for="item in area"
                    size="small"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
          </el-form>
    </div>
</template>

<script>
import { regionData ,CodeToText} from "../../../node_modules/element-china-area-data";
export default {
    data(){
        return{
            //省市区联动下拉框
            provinces: regionData,
            cities: [],
            area: [],
            selectProvince: "",
            selectCity: "",
            selectArea: "",
            address:''

        }
    },
    methods:{
        changeProvince() {
       //console.log(this.provinces)
       //console.log(this.selectProvince)
      this.cities = [];
      this.area = [];
      this.selectCity = "";
      this.selectArea = "";
      let cityItem = this.provinces.filter(
        (item) => item.value === this.selectProvince
      );
      if (cityItem[0]) {
        this.cities = cityItem[0].children;
      }
    },
    changeCity() {
      console.log("城市选择")
      console.log(this.selectCity)
      this.area = [];
      this.selectArea = "";
      let areaItem = this.cities.filter(
        (item) => item.value === this.selectCity
      );
      if (areaItem[0]) {
        this.area = areaItem[0].children;
      }
      this.address=this.getCodeToText(this.selectProvince)
      console.log(this.address);
    },
    getCodeToText(codeStr, codeArray) {
      if (null === codeStr && null === codeArray) {
        return null;
      } else if (null === codeArray) {
        codeArray = codeStr.split(",");
      }

      let area = "";
      switch (codeArray.length) {
        case 1:
          area += CodeToText[codeArray[0]];
          break;
        case 2:
          area += CodeToText[codeArray[0]]  + CodeToText[codeArray[1]];
          break;
        case 3:
          area +=
            CodeToText[codeArray[0]] +
            
            CodeToText[codeArray[1]] +
            
            CodeToText[codeArray[2]];
          break;
        default:
          break;
      }
      return area;
    }

}
}
</script>