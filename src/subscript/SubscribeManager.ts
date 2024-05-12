export class SubscribeManager {
    private apiUrl: string;
    private scriptList: Map<any, any>;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
        this.scriptList = new Map();
    }

    // 从api获取所有订阅script
    async getUrlScripts() {
        try {
            const response = await fetch(this.apiUrl);
            const urls = await response.json();
            return urls;
        } catch (error) {
            console.error('Failed to load rule URLs:', error);
            return [];
        }
    }

    // 加载script
    async loadScript(url: string) {
        try {
            const module = await import(/* webpackIgnore: true */ url);
            this.scriptList.set(url, module);
        } catch (error) {
            console.error(`Failed to load script from ${url}:`, error);
        }
    }

    // 加载所有scripts
    async loadAllScripts() {
        const urls = await this.getUrlScripts();
        await Promise.all(urls.map(url => this.loadScript(url)));
    }

    async getSubscribeScript(url: string) {
    }
}