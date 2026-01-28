export type T_Link = {
    id: string;
    name: string;
    url: string;
    description: string;
};

export type T_Section = {
    id: string;
    name: string;
    links: T_Link[];
};

export type T_Data = {
    sections: T_Section[];
};
