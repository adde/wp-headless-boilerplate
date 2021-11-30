export interface PageType {
    id:             number;
    date:           Date;
    date_gmt:       Date;
    guid:           string;
    modified:       Date;
    modified_gmt:   Date;
    slug:           string;
    status:         string;
    type:           string;
    link:           string;
    title:          string;
    content:        Content;
    excerpt:        Content;
    author:         number;
    featured_media: number;
    parent:         number;
    menu_order:     number;
    comment_status: string;
    ping_status:    string;
    template:       string;
    meta:           any[];
    acf:            any[];
    has_blocks:     boolean;
    blocks:         Block[];
    _links:         Links;
}

export interface Links {
    self:                  About[];
    collection:            About[];
    about:                 About[];
    author:                Author[];
    replies:               Author[];
    "version-history":     VersionHistory[];
    "predecessor-version": PredecessorVersion[];
    up:                    Author[];
    "wp:attachment":       About[];
    curies:                Cury[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface PredecessorVersion {
    id:   number;
    href: string;
}

export interface VersionHistory {
    count: number;
    href:  string;
}

export interface Block {
    blockName:    string;
    attrs:        Attrs;
    innerBlocks:  any[];
    innerHTML:    string;
    innerContent: string[];
    rendered:     string;
}

export interface Attrs {
    align:           string;
    content:         string;
    dropCap:         boolean;
    placeholder:     string;
    direction:       string;
    style:           any[];
    backgroundColor: string;
    textColor:       string;
    className:       string;
    fontSize:        string;
    anchor:          string;
}

export interface Content {
    rendered:  string;
    protected: boolean;
}

export interface MenuType {
    term_id:          number;
    name:             string;
    slug:             string;
    term_group:       number;
    term_taxonomy_id: number;
    taxonomy:         string;
    description:      string;
    parent:           number;
    count:            number;
    filter:           string;
    items:            Item[];
}

export interface Item {
    ID:                    number;
    post_author:           string;
    post_date:             Date;
    post_date_gmt:         Date;
    post_content:          string;
    post_title:            string;
    post_excerpt:          string;
    post_status:           string;
    comment_status:        string;
    ping_status:           string;
    post_password:         string;
    post_name:             string;
    to_ping:               string;
    pinged:                string;
    post_modified:         Date;
    post_modified_gmt:     Date;
    post_content_filtered: string;
    post_parent:           number;
    guid:                  string;
    menu_order:            number;
    post_type:             string;
    post_mime_type:        string;
    comment_count:         string;
    filter:                string;
    db_id:                 number;
    menu_item_parent:      string;
    object_id:             string;
    object:                string;
    type:                  string;
    type_label:            string;
    url:                   string;
    title:                 string;
    target:                string;
    attr_title:            string;
    description:           string;
    classes:               string[];
    xfn:                   string;
    slug:                  string;
    child_items?:          Item[];
}
