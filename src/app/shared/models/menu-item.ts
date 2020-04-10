export interface MenuItem {
    label: string;
    link?: string;
    icon?: string;
    visible?: boolean;
    active?: boolean;
    children?: MenuItem[];
}
