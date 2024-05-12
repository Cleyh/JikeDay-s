import axios from "axios";

export class ActiveSubsource {
    id: int;
    url: string;
    formatRule: (data: any) => any;
    updateCycle: string;

    private rawData: any;

    constructor(url: string, formatRule: (data: any) => any, updateCycle = "day") {
        this.url = url;
        this.formatRule = formatRule;
        this.updateCycle = updateCycle;
        this.rawData = null;
    }

    // 从 URL 获取数据
    async fetchData(): Promise<void> {
        try {
            const response = await axios.get(this.url);
            this.rawData = response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.rawData = null;
        }
    }

    // 返回原始数据
    getRaw(): any {
        return this.rawData;
    }

    // 返回格式化后的数据
    getFormat(): any {
        if (!this.rawData) {
            console.error('No data available. Please fetch data first.');
            return null;
        }
        return this.formatRule(this.rawData);
    }
}
