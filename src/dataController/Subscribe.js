export  class Subscribe {
    id;
    subs_type;
    name;
    url;
    formatRule;
    updateInterval;
    constructor(id, type, name, url, formatRule, updateInterval) {
        this.id = id;
        this.subs_type = type;
        this.name = name;
        this.url = url;
        this.formatRule = formatRule;
        this.updateInterval = updateInterval;
    }

}

