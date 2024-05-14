import axios from "axios";

export class ActiveSubsource {
    id = -1;
    url = "";
    // 一个信息处理函数
    formatRule = new function () {
    };
    updateCycle;

    rawData = "";

    constructor(url, formatRule, updateCycle = "day") {
        this.url = url;
        this.formatRule = formatRule;
        this.updateCycle = updateCycle;
        this.rawData = null;
    }

    // 从 URL 获取数据
    async fetchData() {
        try {
            const response = await axios.post(this.url, {nums: 187});
            this.rawData = response.data;
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            this.rawData = null;
        }
    }

    // 返回原始数据
    getRaw() {
        return this.rawData;
    }

    // 返回格式化后的数据
    getFormat() {
        if (!this.rawData) {
            console.error('No data available. Please fetch data first.');
            return null;
        }
        return this.formatRule(this.rawData);
    }
}
