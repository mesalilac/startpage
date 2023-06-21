
class Section {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    add(name, url, desc) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.text = name;
        a.href = url;

        if (desc) {
            a.title = desc;
        }

        // a.target = '_blank';

        li.appendChild(a);

        this.list.push(li)

        return this
    }

    build() {
        const div = document.createElement('div');
        const ul = document.createElement('ul');

        div.classList.add('section')

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
