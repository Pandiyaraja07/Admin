import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'HEADER.DASHBOARDS.TEXT',
        icon: 'monitor',
        subItems: [
            {
                id: 2,
                label: 'HEADER.DASHBOARDS.LIST.SALES',
                link: '/',
                parentId: 1
            },
            {
                id: 3,
                label: 'HEADER.DASHBOARDS.LIST.ANALYTICS',
                link: '/',
                parentId: 1
            }
        ]
    },
    {
        id: 4,
        label: 'MENUITEMS.UIELEMENTS.TEXT',
        icon: 'package',
        subItems: [
            {
                id: 5,
                label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                link: '/',
                parentId: 4
            },
            {
                id: 6,
                label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                link: '/',
                parentId: 4
            },
            {
                id: 7,
                label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                link: '/',
                parentId: 4
            },
            {
                id: 8,
                label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                link: '/',
                parentId: 4
            },
            {
                id: 9,
                label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                link: '/',
                parentId: 4
            },
            {
                id: 10,
                label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                link: '/',
                parentId: 4
            },
            {
                id: 11,
                label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                link: '/',
                parentId: 4
            },
            {
                id: 12,
                label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                link: '/',
                parentId: 4
            },
            {
                id: 13,
                label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                link: '/',
                parentId: 4
            },
            {
                id: 14,
                label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                link: '/',
                parentId: 4
            },
            {
                id: 15,
                label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                link: '/',
                parentId: 4
            },
            {
                id: 16,
                label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                link: '/',
                parentId: 4
            },
            {
                id: 17,
                label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                link: '/',
                parentId: 4
            },
            {
                id: 18,
                label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                link: '/',
                parentId: 4
            },
            {
                id: 19,
                label: 'MENUITEMS.UIELEMENTS.LIST.UTILITIES',
                link: '/',
                parentId: 4
            },
            {
                id: 20,
                label: 'MENUITEMS.EXTENDED.LIST.LIGHTBOX',
                link: '/',
                parentId: 4
            },
            {
                id: 21,
                label: 'MENUITEMS.EXTENDED.LIST.RANGESLIDER',
                link: '/',
                parentId: 80
            },
            {
                id: 22,
                label: 'MENUITEMS.EXTENDED.LIST.SWEETALERT',
                link: '/',
                parentId: 4
            },
            {
                id: 23,
                label: 'MENUITEMS.EXTENDED.LIST.RATING',
                link: '/',
                parentId: 4
            },
            {
                id: 24,
                label: 'MENUITEMS.EXTENDED.LIST.NOTIFICATION',
                link: '/',
                parentId: 4
            },
            {
                id: 25,
                label: 'MENUITEMS.EXTENDED.LIST.SWIPERSLIDER',
                link: '/',
                parentId: 4
            }
        ]
    },
    {
        id: 26,
        label: 'HEADER.APPS.TEXT',
        icon: 'grid',
        subItems: [
            {
                id: 27,
                label: 'MENUITEMS.CALENDAR.TEXT',
                link: '/',
                parentId: 26
            },
            {
                id: 28,
                label: 'MENUITEMS.CHAT.TEXT',
                link: '/',
                parentId: 26
            },
            {
                id: 29,
                label: 'MENUITEMS.KANBANBOARD.TEXT',
                link: '/',
                parentId: 26
            },
            {
                id: 30,
                label: 'MENUITEMS.FILEMANAGER.TEXT',
                link: '/',
                parentId: 26
            },
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.TEXT',
                subItems: [
                    {
                        id: 32,
                        label: 'MENUITEMS.EMAIL.LIST.INBOX',
                        link: '/',
                        parentId: 31
                    },
                    {
                        id: 33,
                        label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                        link: '/',
                        parentId: 31
                    }
                ]
            },
            {
                id: 34,
                label: 'MENUITEMS.CONTACTS.TEXT',
                icon: 'book',
                subItems: [
                    {
                        id: 35,
                        label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                        link: '/',
                        parentId: 34
                    },
                    {
                        id: 36,
                        label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                        link: '/',
                        parentId: 34
                    },
                    {
                        id: 37,
                        label: 'MENUITEMS.CONTACTS.LIST.SETTINGS',
                        link: '/',
                        parentId: 34
                    }
                ]
            },
            {
                id: 38,
                label: 'MENUITEMS.GALLERY.TEXT',
                link: '/',
                parentId: 26
            },
            {
                id: 39,
                label: 'MENUITEMS.PROJECTS.TEXT',
                icon: 'briefcase',
                subItems: [
                    {
                        id: 40,
                        label: 'MENUITEMS.PROJECTS.LIST.PROJECTSGRID',
                        link: '/',
                        parentId: 39
                    },
                    {
                        id: 41,
                        label: 'MENUITEMS.PROJECTS.LIST.PROJECTSLIST',
                        link: '/',
                        parentId: 39
                    },
                    {
                        id: 42,
                        label: 'MENUITEMS.PROJECTS.LIST.PROJECTSOVERVIEW',
                        link: '/',
                        parentId: 39
                    },
                    {
                        id: 43,
                        label: 'MENUITEMS.PROJECTS.LIST.CREATENEW',
                        link: '/',
                        parentId: 39
                    }
                ]
            },
        ]
    },
    {
        id: 44,
        label: 'HEADER.COMPONENTS.TEXT',
        icon: 'layers',
        subItems: [
            {
                id: 45,
                label: 'MENUITEMS.WIDGETS.TEXT',
                link: '/',
                parentId: 44
            },
            {
                id: 46,
                label: 'MENUITEMS.FORMS.TEXT',
                subItems: [
                    {
                        id: 47,
                        label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 48,
                        label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 49,
                        label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 50,
                        label: 'MENUITEMS.FORMS.LIST.EDITOR',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 51,
                        label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 52,
                        label: 'MENUITEMS.FORMS.LIST.WIZARD',
                        link: '/',
                        parentId: 46
                    },
                    {
                        id: 53,
                        label: 'MENUITEMS.FORMS.LIST.MASK',
                        link: '/',
                        parentId: 46
                    }
                ]
            },
            {
                id: 54,
                icon: 'database',
                label: 'MENUITEMS.TABLES.TEXT',
                subItems: [
                    {
                        id: 55,
                        label: 'MENUITEMS.TABLES.LIST.BASIC',
                        link: '/',
                        parentId: 54
                    },
                    {
                        id: 56,
                        label: 'MENUITEMS.TABLES.LIST.ADVANCEDTABLES',
                        link: '/',
                        parentId: 54
                    }
                ]
            },
            {
                id: 57,
                icon: 'bar-chart-2',
                label: 'MENUITEMS.APEXCHARTS.TEXT',
                subItems: [
                    {
                        id: 58,
                        label: 'MENUITEMS.APEXCHARTS.LIST.LINE',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 59,
                        label: 'MENUITEMS.APEXCHARTS.LIST.AREA',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 60,
                        label: 'MENUITEMS.APEXCHARTS.LIST.COLUMN',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 61,
                        label: 'MENUITEMS.APEXCHARTS.LIST.BAR',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 62,
                        label: 'MENUITEMS.APEXCHARTS.LIST.MIXED',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 63,
                        label: 'MENUITEMS.APEXCHARTS.LIST.TIMELINE',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 64,
                        label: 'MENUITEMS.APEXCHARTS.LIST.CANDLESTICK',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 65,
                        label: 'MENUITEMS.APEXCHARTS.LIST.BOXPLOT',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 66,
                        label: 'MENUITEMS.APEXCHARTS.LIST.BUBBLE',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 67,
                        label: 'MENUITEMS.APEXCHARTS.LIST.SCATTER',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 68,
                        label: 'MENUITEMS.APEXCHARTS.LIST.HEATMAP',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 69,
                        label: 'MENUITEMS.APEXCHARTS.LIST.TREEMAP',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 70,
                        label: 'MENUITEMS.APEXCHARTS.LIST.PIE',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 71,
                        label: 'MENUITEMS.APEXCHARTS.LIST.RADIALBAR',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 72,
                        label: 'MENUITEMS.APEXCHARTS.LIST.RADAR',
                        link: '/',
                        parentId: 57
                    },
                    {
                        id: 73,
                        label: 'MENUITEMS.APEXCHARTS.LIST.POLARAREA',
                        link: '/',
                        parentId: 57
                    }
                ]
            },
            {
                id: 74,
                label: 'MENUITEMS.ICONS.TEXT',
                icon: 'archive',
                subItems: [
                    {
                        id: 75,
                        label: 'MENUITEMS.ICONS.LIST.UNICONS',
                        link: '/',
                        parentId: 74
                    },
                    {
                        id: 76,
                        label: 'MENUITEMS.ICONS.LIST.FEATHERICONS',
                        link: '/',
                        parentId: 74
                    },
                    {
                        id: 77,
                        label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                        link: '/',
                        parentId: 74
                    },
                    {
                        id: 78,
                        label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                        link: '/',
                        parentId: 74
                    },
                    {
                        id: 79,
                        label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                        link: '/',
                        parentId: 74
                    },
                ]
            },
            {
                id: 80,
                label: 'MENUITEMS.MAPS.TEXT',
                icon: 'map-pin',
                subItems: [
                    {
                        id: 81,
                        label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                        link: '/',
                        parentId: 80
                    },
                    {
                        id: 82,
                        label: 'MENUITEMS.MAPS.LIST.LEAFLET',
                        link: '/',
                        parentId: 80
                    }
                ]
            },
        ]
    },
    {
        id: 83,
        label: 'HEADER.EXTRAPAGES.TEXT',
        icon: 'file',
        subItems: [
            {
                id: 84,
                label: 'MENUITEMS.PRICING.TEXT',
                icon: 'tag',
                subItems: [
                    {
                        id: 85,
                        label: 'MENUITEMS.PRICING.LIST.BASIC',
                        link: '/',
                        parentId: 84
                    },
                    {
                        id: 86,
                        label: 'MENUITEMS.PRICING.LIST.TABLE',
                        link: '/',
                        parentId: 84
                    },
                ]
            },
            {
                id: 87,
                label: 'MENUITEMS.INVOICES.TEXT',
                icon: 'file',
                subItems: [
                    {
                        id: 88,
                        label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                        link: '/',
                        parentId: 87
                    },
                    {
                        id: 89,
                        label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                        link: '/',
                        parentId: 87
                    },
                ]
            },
            {
                id: 90,
                label: 'MENUITEMS.TIMELINE.TEXT',
                icon: 'award',
                subItems: [
                    {
                        id: 91,
                        label: 'MENUITEMS.TIMELINE.LIST.CENTERVIEW',
                        link: '/',
                        parentId: 90
                    },
                    {
                        id: 92,
                        label: 'MENUITEMS.TIMELINE.LIST.LEFTVIEW',
                        link: '/',
                        parentId: 90
                    },
                    {
                        id: 93,
                        label: 'MENUITEMS.TIMELINE.LIST.HORIZONTALVIEW',
                        link: '/',
                        parentId: 90
                    },
                ]
            },
            {
                id: 94,
                label: 'HEADER.AUTHENTICATION.TEXT',
                icon: 'alert-circle',
                subItems: [
                    {
                        id: 95,
                        label: 'HEADER.AUTHENTICATION.LIST.BASIC',
                        subItems: [
                            {
                                id: 96,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNIN',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 97,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNUP',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 98,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNOUT',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 99,
                                label: 'HEADER.AUTHENTICATION.LIST.LOCKSCREEN',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 100,
                                label: 'HEADER.AUTHENTICATION.LIST.FORGOTPASSWORD',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 101,
                                label: 'HEADER.AUTHENTICATION.LIST.RESETPWD',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 102,
                                label: 'HEADER.AUTHENTICATION.LIST.EMAILVERIFICATION',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 103,
                                label: 'HEADER.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                                link: '/',
                                parentId: 95
                            },
                            {
                                id: 104,
                                label: 'HEADER.AUTHENTICATION.LIST.THANKYOU',
                                link: '/',
                                parentId: 95
                            }
                        ]
                    },
                    {
                        id: 106,
                        label: 'HEADER.AUTHENTICATION.LIST.COVER',
                        subItems: [
                            {
                                id: 107,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNIN',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 108,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNUP',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 109,
                                label: 'HEADER.AUTHENTICATION.LIST.SIGNOUT',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 110,
                                label: 'HEADER.AUTHENTICATION.LIST.LOCKSCREEN',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 111,
                                label: 'HEADER.AUTHENTICATION.LIST.FORGOTPASSWORD',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 112,
                                label: 'HEADER.AUTHENTICATION.LIST.RESETPWD',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 113,
                                label: 'HEADER.AUTHENTICATION.LIST.EMAILVERIFICATION',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 114,
                                label: 'HEADER.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                                link: '/',
                                parentId: 106
                            },
                            {
                                id: 115,
                                label: 'HEADER.AUTHENTICATION.LIST.THANKYOU',
                                link: '/',
                                parentId: 106
                            }
                        ]
                    }
                ]
            },
            {
                id: 116,
                label: 'HEADER.ERRORSPAGES.TEXT',
                icon: 'alert-circle',
                subItems: [
                    {
                        id: 117,
                        label: 'HEADER.ERRORSPAGES.LIST.400',
                        subItems: [
                            {
                                id: 118,
                                label: 'HEADER.ERRORSPAGES.LIST.BASIC',
                                link: '/',
                                parentId: 117
                            },
                            {
                                id: 119,
                                label: 'HEADER.ERRORSPAGES.LIST.COVER',
                                link: '/',
                                parentId: 117
                            }
                        ]
                    },
                    {
                        id: 120,
                        label: 'HEADER.ERRORSPAGES.LIST.500',
                        subItems: [
                            {
                                id: 121,
                                label: 'HEADER.ERRORSPAGES.LIST.BASIC',
                                link: '/',
                                parentId: 120
                            },
                            {
                                id: 122,
                                label: 'HEADER.ERRORSPAGES.LIST.COVER',
                                link: '/',
                                parentId: 120
                            }
                        ]
                    },
                ]
            },
            {
                id: 123,
                label: 'MENUITEMS.UTILITY.TEXT',
                icon: 'file-text',
                subItems: [
                    {
                        id: 124,
                        label: 'MENUITEMS.UTILITY.LIST.STARTER',
                        link: '/',
                        parentId: 123
                    },
                    {
                        id: 125,
                        label: 'MENUITEMS.UTILITY.LIST.PROFILE',
                        link: '/',
                        parentId: 123
                    },
                    {
                        id: 126,
                        label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                        link: '/',
                        parentId: 123
                    },
                    {
                        id: 127,
                        label: 'MENUITEMS.UTILITY.LIST.COMINGSOON',
                        link: '/',
                        parentId: 123
                    },
                    {
                        id: 128,
                        label: 'MENUITEMS.UTILITY.LIST.FAQS',
                        link: '/',
                        parentId: 123
                    }
                ]
            },
        ]
    },
];

