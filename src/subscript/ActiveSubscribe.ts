import axios from 'axios';

export class ActiveSubscribe {
    private _url: string;
    private _formatRule: (data: any) => any;
    private _rawData: any;

    constructor(url: string, formatRule: (data: any) => any) {
        this._url = url;
        this._formatRule = formatRule;
    }

    async fetchData() {
        // const response = await fetch(this._url);
        // this._rawData = await response.text();

        try {
            const response = await axios.get(this._url);
            this._rawData = response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this._rawData = null;
        }
    }

    getRawData() {
        return this._rawData;
    }

    getFormat(): any {
        if (!this._rawData) {
            console.error('No data available. Please fetch data first.');
            return null;
        }
        return this._formatRule(this._rawData);
    }

}