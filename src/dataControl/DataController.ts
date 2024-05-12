import Dexie from 'dexie';

class Database extends Dexie {
    private files: any;
    private texts: any;
    constructor() {
        super('MyAppDB');
        this.version(1).stores({
            files: '++id, type, data',  // 定义一个文件存储，包括类型和数据
            texts: '++id, content',     // 存储文本数据
            // 可以根据需要添加更多存储
        });
    }

    async addFile(file) {
        return this.files.add(file);
    }

    async getFile(id) {
        return this.files.get(id);
    }

    async addText(text) {
        return this.texts.add(text);
    }

    async getText(id) {
        return this.texts.get(id);
    }
}

export const db = new Database();
