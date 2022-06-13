class FormError
{
    constructor({field, messages}) {
        this.field = field;
        this.messages = messages;
    }

    getField() {
        return this.field;
    }

    getMessages() {
        return this.messages[0];
    }
}

export default FormError;