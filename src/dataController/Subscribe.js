class Subscribe {
    id: int;
    type: string;
    name: string;
    url: string;
    formatRule: string;
    updateInterval: string;
    constructor(id: int, type: string, name: string, url: string, formatRule: string, updateInterval: string) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.url = url;
        this.formatRule = formatRule;
        this.updateInterval = updateInterval;
    }

}