export interface MenuItem {
    id?: number;
    label?: any;
    icon?: string;
    src?: String;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}