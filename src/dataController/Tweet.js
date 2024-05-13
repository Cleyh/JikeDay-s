class Tweet {
    id: int;
    source: string;
    time: string;
    title: string;
    content: string;

    constructor(id: int, source: string, time: string, title: string, content: string) {
        this.id = id;
        this.source = source;
        this.time = time;
        this.title = title;
        this.content = content;
    }
}