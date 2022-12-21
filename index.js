at({
    active: true,
    id: "Main",
    links: [
        al({ lable: "Youtube", href: "https://www.youtube.com/" }),
        al({ lable: "Wallhaven", href: "https://wallhaven.cc/" }),
        al({ lable: "gmail", href: "https://mail.google.com/mail/" }),
        al({ lable: "calendar", href: "https://calendar.google.com/" }),
    ]
})

at({
    id: "Dev",
    links: [
        al({ lable: "Github", href: "https://github.com/" }),
    ]
})

at({
    id: "Anime",
    links: [
        al({ lable: "Anilist", href: "https://anilist.co/home" }),
        al({ lable: "MAL", href: "https://myanimelist.net/" }),
        al({ lable: "Animepahe", href: "https://animepahe.org/" }),
        al({ lable: "Animixplay", href: "https://animixplay.to/" }),
        al({ lable: "Subsplease", href: "https://subsplease.org/" }),
    ]
})

function al(opts) {
    const li = document.createElement("li")
    const a = document.createElement("a")

    a.text = opts.lable
    a.href = opts.href

    // open in new tab
    // a.target = "_blank"

    li.appendChild(a)

    return li
}

function at(opts) {
    const id = opts.id
    const links = opts.links
    const active = opts.active || false

    const tab = document.createElement("button")

    tab.classList.add("tab-button")
    if (active === true) {
        tab.classList.add("active")
    }

    tab.setAttribute("data-id", id)
    tab.textContent = id

    const whitespace = document.createTextNode(" ");
    const buttonsWrapper = document.querySelector("#buttonsWrapper")

    buttonsWrapper.appendChild(tab)
    buttonsWrapper.appendChild(whitespace)

    const ul = document.createElement("ul")

    ul.classList.add("content")
    if (active === true) {
        ul.classList.add("active")
    }

    ul.id = id

    for (index in links) {
        li = links[index]

        ul.appendChild(li)
    }

    document.querySelector("#contentWrapper").appendChild(ul)
}
