export class Tweet {
    id = -1;
    source = -1;
    summary = "";
    title = "";
    content = "";
    type = "";
    timeSlotA = "";
    timeSlotB = "";
    timeSlotC = "";

    constructor(id, source, title, summary, content, type, timeSlotA, timeSlotB, timeSlotC) {
        this.id = id;
        this.source = source;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.type = type;
        this.timeSlotA = timeSlotA;
        this.timeSlotB = timeSlotB;
        this.timeSlotC = timeSlotC;
    }
}