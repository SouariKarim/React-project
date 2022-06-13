import moment from "moment";


class FreelanceComment {
    constructor({id, local_id = null, author, freelance, text, created_at, updated_at, synchronized = true }) {
        this._id = id;
        this._local_id = local_id;
        this._author = author;
        this._freelance = freelance;
        this._company = author?.company;
        this._text = text;
        this._created_at = created_at;
        this._updated_at = updated_at;
        this._synchronized = synchronized;
    }

    get id() {
        return this._id;
    }

    get localId() {
        return this._local_id;
    }

    get freelanceId() {
        if (this._freelance) {
            return this._freelance.id;
        }
        return null;
    }

    get authorId() {
        if (this._author) {
            return this._author.id;
        }
        return null;
    }

    get authorName() {
        if (this._author) {
            return this._author.first_name + " " + this._author.last_name
        }
        return null;
    }

    get companyName() {
        if (this._company) {
            return this._company.name;
        }
        return null;
    }

    get text() {
        return this._text;
    }

    get createdAt() {
        if (this._created_at) {
            return moment(this._created_at);
        }
        return null;
    }

    get updatedAt() {
        if (this._updated_at) {
            return moment(this._updated_at);
        }
        return null;
    }

    get synchronized() {
        return this._synchronized;
    }
}

export default FreelanceComment;