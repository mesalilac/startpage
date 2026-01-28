export const generate_favicon_url = (url: string, size: number): string => {
    const domain = new URL(url);
    const tmp_list = domain.hostname.split('.');

    if (tmp_list.length === 3) {
        tmp_list.shift();
    }

    const domain_url = tmp_list.join('.');

    return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${domain_url}`;
};
