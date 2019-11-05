const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_LENGTH = 4;

class IdGenerator {
    constructor() {
        this.generateId();
    }

    generateId() {
        let rtn = '';
        for (let i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }
}

export const idGenerator = new IdGenerator;
