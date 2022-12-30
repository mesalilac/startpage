// only functions

/**
 * @param {Object} opts
 * @param {string} opts.lable
 * @param {string} opts.href
 * @param {string} opts.desc
 */
function link(opts) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.text = opts.lable;
    a.href = opts.href;
    if (opts.desc) {
        a.title = opts.desc;
    }

    // open in new tab
    a.target = '_blank';

    li.appendChild(a);

    return li;
}

/**
 * @param {Object} opts
 * @param {string} opts.id
 * @param {Array} opts.links
 * @param {boolean} opts.active
 */
function tab(opts) {
    const id = opts.id || 'New tab';
    const links = opts.links;
    const active = opts.active || false;

    const tab = document.createElement('button');
    const contentWrapper = document.querySelector('#contentWrapper');

    tab.classList.add('tab-button');

    if (links == undefined || links.length == 0) {
        tab.disabled = true;
        tab.classList.add('disabled');
    }

    if (active === true) {
        tab.classList.add('active');
    }

    tab.setAttribute('data-id', id);
    tab.textContent = id;

    const whitespace = document.createTextNode(' ');
    const buttonsWrapper = document.querySelector('#buttonsWrapper');

    buttonsWrapper.appendChild(tab);
    buttonsWrapper.appendChild(whitespace);

    const ul = document.createElement('ul');

    ul.classList.add('content');
    if (active === true) {
        ul.classList.add('active');
    }

    ul.id = id;

    for (index in links) {
        li = links[index];

        ul.appendChild(li);
    }

    contentWrapper.appendChild(ul);
}
