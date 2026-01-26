/** Construct new Section
 * @class
 */
class Section {
    constructor(name) {
        /**
         * @private
         * @type {string}
         */
        this.name = name;
        /**
         * @private
         * @type {string[]}
         */
        this.list = [];
        /**
         * @private
         * @type {boolean}
         */
        this._initialized = false;
    }

    /** Adds new URL to the Section
     * @param {string} name Display name
     * @param {string} url Target URL
     * @param {string=} desc URL description
     * @returns {void}
     */
    add(name, url, desc) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        const favicon = generate_favicon_url(url, 16);
        const img = document.createElement('img');

        a.text = name;
        a.href = url;

        if (desc) {
            a.title = name + ' - ' + desc;
        }

        // a.target = '_blank';

        img.src = favicon;
        img.classList.add('favicon');

        li.appendChild(img);
        li.appendChild(a);

        this.list.push(li);

        return this;
    }

    /** Create Section and adds it to the DOM
     * @returns {void}
     */
    create() {
        if (this._initialized) return;

        this._initialized = true;

        const div = document.createElement('div');
        const ul = document.createElement('ul');

        div.classList.add('section');

        if (this.list.length == 0) {
            div.classList.add('empty');
        }

        const sections = document.querySelector('#sections');

        const whitespace = document.createTextNode(' ');

        for (var i = 0; i < this.list.length; i++) {
            let li = this.list[i];

            ul.appendChild(li);
        }

        const p = document.createElement('p');

        p.textContent = this.name;
        p.classList.add('section-name');

        div.appendChild(p);
        div.appendChild(ul);

        sections.appendChild(div);
        sections.appendChild(whitespace);
    }
}

/** Generate URL Favicon
 * @param {string} url Target URL
 * @param {number} size Size of the Favicon
 * @returns {void}
 */
function generate_favicon_url(url, size) {
    let domain = new URL(url);
    let tmp_list = domain.hostname.split('.');

    if (tmp_list.length == 3) {
        tmp_list.shift();
    }

    let domain_url = tmp_list.join('.');

    // return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${domain_url}`;
    return "";
}
