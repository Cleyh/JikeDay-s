export class Tweet {
    id = -1;
    source = -1;
    title = "";
    content ="";
    type = "";
    timeSlotA = "";
    timeSlotB = "";
    timeSlotC = "";

    constructor(id, source, title, content, type, timeSlotA, timeSlotB, timeSlotC) {
        this.id = id;
        this.source = source;
        this.title = title;
        this.content = content;
        this.type = type;
        this.timeSlotA = timeSlotA;
        this.timeSlotB = timeSlotB;
        this.timeSlotC = timeSlotC;
    }
}