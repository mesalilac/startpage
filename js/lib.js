class Tab {
    constructor(id, active) {
        this.id = id || 'New tab';
        this.active = active;
        this.list = [];
    }

    add(name, href, desc) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.text = name;
        a.href = href;

        if (desc) {
            a.title = desc;
        }

        // open in new tab
        a.target = '_blank';

        li.appendChild(a);

        this.list.push(li);

        return this;
    }

    // Create the tab
    build() {
        const tab = document.createElement('button');

        tab.classList.add('tab-button');

        if (this.list.length == 0) {
            tab.disabled = true;
            tab.classList.add('disabled');
        }

        if (this.active === true) {
            tab.classList.add('active');
        }

        tab.setAttribute('data-id', this.id);
        tab.textContent = this.id;

        const contentWrapper = document.querySelector('#contentWrapper');

        const whitespace = document.createTextNode(' ');
        const buttonsWrapper = document.querySelector('#buttonsWrapper');

        buttonsWrapper.appendChild(tab);
        buttonsWrapper.appendChild(whitespace);

        const ul = document.createElement('ul');

        ul.classList.add('content');
        if (this.active === true) {
            ul.classList.add('active');
        }

        ul.id = this.id;

        for (var i = 0; i < this.list.length; i++) {
            let li = this.list[i];

            ul.appendChild(li);
        }

        contentWrapper.appendChild(ul);
    }
}
