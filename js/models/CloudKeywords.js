class CloudKeywords {

    colors = [
        'yellow', 'purple', 'pink', 'blue', 'orange', 'green'
    ];

    constructor({hits, keywords}) {
        this._keywords = [];
        this._hits = [];

        if (keywords) {
            let colorIndex = 0;
            for (const keyword of keywords) {
                this._keywords.push({color: this.colors[colorIndex], value: keyword});
                colorIndex++;
                if (colorIndex > this.colors.length) {
                    colorIndex = 0;
                }
            }
        }

        if (hits) {
            while (this.hasHitOnKeywords(hits)) {
                //eslint-disable-next-line no-unused-vars
                for (const [keyword, values] of Object.entries(hits)) {
                    const firstHit = values.shift();
                    if (firstHit) {
                        this._hits.push(firstHit);
                    }
                }
            }
        }
    }

    hasHitOnKeywords(keywords)
    {
        //eslint-disable-next-line no-unused-vars
        for (const [keyword, hits] of Object.entries(keywords)) {
            if (hits && hits.length > 0) {
                return true;
            }
        }

        return false;
    }

    get keywords() {
        return this._keywords;
    }

    get hits() {
        return this._hits;
    }
}

export default CloudKeywords;
