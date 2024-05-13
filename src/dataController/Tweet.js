class Tweet {
    id = -1;
    source = -1;
    time = "";
    title = "";
    content ="";

    constructor(id: int, source: string, time: string, title: string, content: string) {
        this.id = id;
        this.source = source;
        this.time = time;
        this.title = title;
        this.content = content;
    }
}