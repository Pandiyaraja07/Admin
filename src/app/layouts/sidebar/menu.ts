import { ChartComponent } from 'ng-apexcharts';
import { MenuItem } from './menu.model';


export const FLMENU: MenuItem[] = [
    {
        id: 1,
        label: 'SGRIMENUITEMS.DASHBOARD.TEXT',
        icon: 'pie-chart',
        src: 'assets/images/menu-icon/Dashboard.png',
        link: '/dashboard1'
    },
    {
        id: 2,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLMAP.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionSkillMap.png',
        link: '/functional-skill-map'
    },
    {
        id: 3,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLGAPMATRIX.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionalSkillGapMatrix.png',
        link: '/functional-skill-gap-matrix'
    },
    {
        id: 4,
        label: 'SGRIMENUITEMS.PROJECTCONSULTANT.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/ProjectConsultant.png',
        link: '/project-consultant'
    },
    {
        id: 5,
        label: 'SGRIMENUITEMS.TEAM.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/Team.png',
        link: '/team'
    }

]

export const SUPERVISORMENU: MenuItem[] = [
    {
        id: 1,
        label: 'SGRIMENUITEMS.DASHBOARD.TEXT',
        icon: 'pie-chart',
        src: 'assets/images/menu-icon/Dashboard.png',
        link: '/dashboard1'
    },
    {
        id: 2,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLMAP.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionSkillMap.png',
        link: '/functional-skill-map'
    },
    {
        id: 3,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLGAPMATRIX.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionalSkillGapMatrix.png',
        link: '/functional-skill-gap-matrix'
    },
    // {
    //     id: 4,
    //     label: 'SGRIMENUITEMS.PROJECTCONSULTANT.TEXT',
    //     icon: 'settings',
    //     src: 'assets/images/menu-icon/ProjectConsultant.png',
    //     link: '/project-consultant'
    // },
    {
        id: 4,
        label: 'SGRIMENUITEMS.TEAM.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/Team.png',
        link: '/team'
    }

]




export const HRMENU: MenuItem[] = [
    {
        id: 1,
        label: 'SGRIMENUITEMS.DASHBOARD.TEXT',
        icon: 'pie-chart',
        src: 'assets/images/menu-icon/Dashboard.png',
        link: '/dashboard1'
    },
    // {
    //     id: 2,
    //     label: 'SGRIMENUITEMS.FUNCTIONALSKILLMAP.TEXT',
    //     icon: 'settings',
    //     src: 'assets/images/menu-icon/FunctionSkillMap.png',
    //     link: '/functional-skill-map'
    // },
    {
        id: 2,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLGAPMATRIX.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionalSkillGapMatrix.png',
        link: '/functional-skill-gap-matrix'
    },
    {
        id: 3,
        label: 'SGRIMENUITEMS.PROJECTCONSULTANT.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/ProjectConsultant.png',
        link: '/project-consultant'
    },
    {
        id: 4,
        label: 'SGRIMENUITEMS.EMPLOYEES.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/Team.png',
        link: '/team'
    }



]

export const CDMENU: MenuItem[] = [
    {
        id: 1,
        label: 'SGRIMENUITEMS.DASHBOARD.TEXT',
        icon: 'pie-chart',
        src: 'assets/images/menu-icon/Dashboard.png',
        link: '/dashboard1'
    },
    {
        id: 2,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLMAP.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionSkillMap.png',
        link: '/functional-skill-map'
    },
    {
        id: 3,
        label: 'SGRIMENUITEMS.FUNCTIONALSKILLGAPMATRIX.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/FunctionalSkillGapMatrix.png',
        link: '/functional-skill-gap-matrix'
    },
    {
        id: 4,
        label: 'SGRIMENUITEMS.PROJECTCONSULTANT.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/ProjectConsultant.png',
        link: '/project-consultant'
    },
    {
        id: 5,
        label: 'SGRIMENUITEMS.EMPLOYEES.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/Team.png',
        link: '/team'
    }



]

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'SGRIMENUITEMS.DASHBOARD.TEXT',
        icon: 'pie-chart',
        src: 'assets/images/menu-icon/Dashboard.png',
        link: '/'
    },
    {
        id: 2,
        label: 'SGRIMENUITEMS.EMPTECHSKILL.TEXT',
        icon: 'settings',
        src: 'assets/images/menu-icon/TechnicalSkill.png',
        link: '/technical-skill',
        // badge: {
        //     variant: 'badge-soft-secondary',
        //     text: 'MENUITEMS.SALES.BADGE',
        // },
    },
    // {
    //     id: 3,
    //     label: 'SGRIMENUITEMS.EMPBEHAVIORSKILL.TEXT',
    //     icon: 'compass',
    //     src: 'assets/images/menu-icon/BehaviouralSkill.png',
    //     link: '/behavior-skill'
    // },
    {
        id: 3,
        label: 'SGRIMENUITEMS.EMPREVIEWINFO.TEXT',
        icon: 'star',
        src: 'assets/images/menu-icon/StrengthImprovement.png',
        link: '/strength-improvement'
    },
    {
        id: 4,
        label: 'SGRIMENUITEMS.EMPPROJECTINFO.TEXT',
        icon: 'file-text',
        src: 'assets/images/menu-icon/ProjectDetailIcon.png',
        link: '/project-info',
        // subItems: [
        //     {
        //         id: 7,
        //         label: 'TEST',
        //         link: '/emp-add-project',
        //         parentId: 6
        //     }
        // ]
    },
    {
        id: 5,
        label: 'SGRIMENUITEMS.EMPADDITIONALSKILL.TEXT',
        icon: 'feather',
        src: 'assets/images/menu-icon/AdditionalSkill.png',
        link: '/additional-skill'
    },
    {
        id: 6,
        label: 'SGRIMENUITEMS.EMPJOBCHAT.TEXT',
        src: 'assets/images/menu-icon/Jobchat.png',
        icon: 'flag',
        link: '/job-chat'
    }

    /* {
         id: 4,
         label: 'MENUITEMS.APPLICATIONS.TEXT',
         isTitle: true
     },
     {
         id: 5,
         label: 'MENUITEMS.CALENDAR.TEXT',
         icon: 'calendar',
         link: '/'
     },
     {
         id: 5,
         label: 'MENUITEMS.CHAT.TEXT',
         icon: 'message-square',
         link: '/',
         badge: {
             variant: 'badge-soft-danger',
             text: 'MENUITEMS.CHAT.BADGE',
         },
     },
     {
         id: 6,
         label: 'MENUITEMS.KANBANBOARD.TEXT',
         icon: 'trello',
         link: '/'
     },
     {
         id: 7,
         label: 'MENUITEMS.FILEMANAGER.TEXT',
         icon: 'folder',
         link: '/'
     },
     {
         id: 8,
         label: 'MENUITEMS.EMAIL.TEXT',
         icon: 'mail',
         subItems: [
             {
                 id: 9,
                 label: 'MENUITEMS.EMAIL.LIST.INBOX',
                 link: '/',
                 parentId: 8
             },
             {
                 id: 10,
                 label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                 link: '/',
                 parentId: 8
             }
         ]
     },
     {
         id: 11,
         label: 'MENUITEMS.CONTACTS.TEXT',
         icon: 'book',
         subItems: [
             {
                 id: 12,
                 label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                 link: '/',
                 parentId: 11
             },
             {
                 id: 13,
                 label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                 link: '/',
                 parentId: 11
             },
             {
                 id: 14,
                 label: 'MENUITEMS.CONTACTS.LIST.SETTINGS',
                 link: '/',
                 parentId: 11
             }
         ]
     },
     {
         id: 15,
         label: 'MENUITEMS.GALLERY.TEXT',
         icon: 'image',
         link: '/'
     },
     {
         id: 16,
         label: 'MENUITEMS.PROJECTS.TEXT',
         icon: 'briefcase',
         subItems: [
             {
                 id: 17,
                 label: 'MENUITEMS.PROJECTS.LIST.PROJECTSGRID',
                 link: '/',
                 parentId: 16
             },
             {
                 id: 18,
                 label: 'MENUITEMS.PROJECTS.LIST.PROJECTSLIST',
                 link: '/',
                 parentId: 16
             },
             {
                 id: 19,
                 label: 'MENUITEMS.PROJECTS.LIST.PROJECTSOVERVIEW',
                 link: '/',
                 parentId: 16
             },
             {
                 id: 20,
                 label: 'MENUITEMS.PROJECTS.LIST.CREATENEW',
                 link: '/',
                 parentId: 16
             }
         ]
     },
     {
         id: 21,
         label: 'MENUITEMS.PAGES.TEXT',
         isTitle: true
     },
     {
         id: 22,
         label: 'MENUITEMS.AUTHENTICATION.TEXT',
         icon: 'user',
         badge: {
             variant: 'info',
             text: 'MENUITEMS.AUTHENTICATION.BADGE',
         },
         subItems: [
             {
                 id: 23,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
                 subItems: [
                     {
                         id: 24,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 23
                     },
                     {
                         id: 25,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 23
                     },
                 ]
             },
             {
                 id: 26,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
                 subItems: [
                     {
                         id: 27,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 26
                     },
                     {
                         id: 28,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 26
                     },
                 ]
             },
             {
                 id: 29,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNOUT',
                 subItems: [
                     {
                         id: 30,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 29
                     },
                     {
                         id: 31,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 29
                     },
                 ]
             },
             {
                 id: 32,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                 subItems: [
                     {
                         id: 33,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 32
                     },
                     {
                         id: 34,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 32
                     },
                 ]
             },
             {
                 id: 35,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.FORGOTPASSWORD',
                 subItems: [
                     {
                         id: 36,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 32
                     },
                     {
                         id: 37,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 32
                     },
                 ]
             },
             {
                 id: 38,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.RESETPWD',
                 subItems: [
                     {
                         id: 39,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 38
                     },
                     {
                         id: 40,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 38
                     },
                 ]
             },
             {
                 id: 41,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                 subItems: [
                     {
                         id: 42,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 41
                     },
                     {
                         id: 43,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 41
                     },
                 ]
             },
             {
                 id: 44,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                 subItems: [
                     {
                         id: 45,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 44
                     },
                     {
                         id: 46,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 44
                     },
                 ]
             },
             {
                 id: 47,
                 label: 'MENUITEMS.AUTHENTICATION.LIST.THANKYOU',
                 subItems: [
                     {
                         id: 48,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                         link: '/',
                         parentId: 47
                     },
                     {
                         id: 49,
                         label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                         link: '/',
                         parentId: 47
                     },
                 ]
             }
         ]
     },
     {
         id: 50,
         label: 'MENUITEMS.ERRORSPAGES.TEXT',
         icon: 'alert-circle',
         subItems: [
             {
                 id: 51,
                 label: 'MENUITEMS.ERRORSPAGES.LIST.404BASIC',
                 link: '/',
                 parentId: 50
             },
             {
                 id: 52,
                 label: 'MENUITEMS.ERRORSPAGES.LIST.404COVER',
                 link: '/',
                 parentId: 50
             },
             {
                 id: 53,
                 label: 'MENUITEMS.ERRORSPAGES.LIST.500BASIC',
                 link: '/',
                 parentId: 50
             },
             {
                 id: 53,
                 label: 'MENUITEMS.ERRORSPAGES.LIST.500COVER',
                 link: '/',
                 parentId: 50
             },
         ]
     },
     {
         id: 54,
         label: 'MENUITEMS.UTILITY.TEXT',
         icon: 'file-text',
         subItems: [
             {
                 id: 55,
                 label: 'MENUITEMS.UTILITY.LIST.STARTER',
                 link: '/',
                 parentId: 54
             },
             {
                 id: 56,
                 label: 'MENUITEMS.UTILITY.LIST.PROFILE',
                 link: '/',
                 parentId: 54
             },
             {
                 id: 56,
                 label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                 link: '/',
                 parentId: 54
             },
             {
                 id: 57,
                 label: 'MENUITEMS.UTILITY.LIST.COMINGSOON',
                 link: '/',
                 parentId: 54
             },
             {
                 id: 58,
                 label: 'MENUITEMS.UTILITY.LIST.FAQS',
                 link: '/',
                 parentId: 54
             }
         ]
     },
     {
         id: 59,
         label: 'MENUITEMS.PRICING.TEXT',
         icon: 'tag',
         subItems: [
             {
                 id: 60,
                 label: 'MENUITEMS.PRICING.LIST.BASIC',
                 link: '/',
                 parentId: 59
             },
             {
                 id: 61,
                 label: 'MENUITEMS.PRICING.LIST.TABLE',
                 link: '/',
                 parentId: 59
             },
         ]
     },
     {
         id: 62,
         label: 'MENUITEMS.INVOICES.TEXT',
         icon: 'file',
         subItems: [
             {
                 id: 63,
                 label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                 link: '/',
                 parentId: 62
             },
             {
                 id: 64,
                 label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                 link: '/',
                 parentId: 62
             },
         ]
     },
     {
         id: 65,
         label: 'MENUITEMS.TIMELINE.TEXT',
         icon: 'award',
         subItems: [
             {
                 id: 63,
                 label: 'MENUITEMS.TIMELINE.LIST.CENTERVIEW',
                 link: '/',
                 parentId: 62
             },
             {
                 id: 64,
                 label: 'MENUITEMS.TIMELINE.LIST.LEFTVIEW',
                 link: '/',
                 parentId: 62
             },
             {
                 id: 64,
                 label: 'MENUITEMS.TIMELINE.LIST.HORIZONTALVIEW',
                 link: '/',
                 parentId: 62
             },
         ]
     },
     {
         id: 65,
         label: 'MENUITEMS.COMPONENTS.TEXT',
         isTitle: true
     },
     {
         id: 66,
         label: 'MENUITEMS.UIELEMENTS.TEXT',
         icon: 'package',
         subItems: [
             {
                 id: 67,
                 label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 67,
                 label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 67,
                 label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 68,
                 label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 69,
                 label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 70,
                 label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 71,
                 label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 72,
                 label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 73,
                 label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 74,
                 label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 75,
                 label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 76,
                 label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 77,
                 label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 78,
                 label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                 link: '/',
                 parentId: 66
             },
             {
                 id: 79,
                 label: 'MENUITEMS.UIELEMENTS.LIST.UTILITIES',
                 link: '/',
                 parentId: 66
             }
         ]
     },
     {
         id: 80,
         label: 'MENUITEMS.EXTENDED.TEXT',
         icon: 'cpu',
         subItems: [
             {
                 id: 81,
                 label: 'MENUITEMS.EXTENDED.LIST.LIGHTBOX',
                 link: '/',
                 parentId: 80
             },
             {
                 id: 82,
                 label: 'MENUITEMS.EXTENDED.LIST.RANGESLIDER',
                 link: '/',
                 parentId: 80
             },
             {
                 id: 83,
                 label: 'MENUITEMS.EXTENDED.LIST.SWEETALERT',
                 link: '/',
                 parentId: 80
             },
             {
                 id: 84,
                 label: 'MENUITEMS.EXTENDED.LIST.RATING',
                 link: '/',
                 parentId: 80
             },
             {
                 id: 85,
                 label: 'MENUITEMS.EXTENDED.LIST.NOTIFICATION',
                 link: '/',
                 parentId: 80
             },
             {
                 id: 86,
                 label: 'MENUITEMS.EXTENDED.LIST.SWIPERSLIDER',
                 link: '/',
                 parentId: 80
             }
         ]
     },
     {
         id: 87,
         label: 'MENUITEMS.WIDGETS.TEXT',
         icon: 'grid',
         link: '/'
     },
     {
         id: 88,
         label: 'MENUITEMS.FORMS.TEXT',
         icon: 'edit-3',
         subItems: [
             {
                 id: 89,
                 label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 89,
                 label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 90,
                 label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 91,
                 label: 'MENUITEMS.FORMS.LIST.EDITOR',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 92,
                 label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 93,
                 label: 'MENUITEMS.FORMS.LIST.WIZARD',
                 link: '/',
                 parentId: 88
             },
             {
                 id: 94,
                 label: 'MENUITEMS.FORMS.LIST.MASK',
                 link: '/',
                 parentId: 88
             }
         ]
     },
     {
         id: 95,
         icon: 'database',
         label: 'MENUITEMS.TABLES.TEXT',
         subItems: [
             {
                 id: 96,
                 label: 'MENUITEMS.TABLES.LIST.BASIC',
                 link: '/',
                 parentId: 95
             },
             {
                 id: 97,
                 label: 'MENUITEMS.TABLES.LIST.ADVANCEDTABLES',
                 link: '/',
                 parentId: 95
             }
         ]
     },
     {
         id: 98,
         icon: 'bar-chart-2',
         label: 'MENUITEMS.APEXCHARTS.TEXT',
         subItems: [
             {
                 id: 99,
                 label: 'MENUITEMS.APEXCHARTS.LIST.LINE',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 100,
                 label: 'MENUITEMS.APEXCHARTS.LIST.AREA',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 101,
                 label: 'MENUITEMS.APEXCHARTS.LIST.COLUMN',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 102,
                 label: 'MENUITEMS.APEXCHARTS.LIST.BAR',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 103,
                 label: 'MENUITEMS.APEXCHARTS.LIST.MIXED',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 104,
                 label: 'MENUITEMS.APEXCHARTS.LIST.TIMELINE',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 105,
                 label: 'MENUITEMS.APEXCHARTS.LIST.CANDLESTICK',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 106,
                 label: 'MENUITEMS.APEXCHARTS.LIST.BOXPLOT',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 107,
                 label: 'MENUITEMS.APEXCHARTS.LIST.BUBBLE',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 108,
                 label: 'MENUITEMS.APEXCHARTS.LIST.SCATTER',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 109,
                 label: 'MENUITEMS.APEXCHARTS.LIST.HEATMAP',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 110,
                 label: 'MENUITEMS.APEXCHARTS.LIST.TREEMAP',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 111,
                 label: 'MENUITEMS.APEXCHARTS.LIST.PIE',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 112,
                 label: 'MENUITEMS.APEXCHARTS.LIST.RADIALBAR',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 113,
                 label: 'MENUITEMS.APEXCHARTS.LIST.RADAR',
                 link: '/',
                 parentId: 98
             },
             {
                 id: 114,
                 label: 'MENUITEMS.APEXCHARTS.LIST.POLARAREA',
                 link: '/',
                 parentId: 98
             }
         ]
     },
     {
         id: 115,
         label: 'MENUITEMS.ICONS.TEXT',
         icon: 'archive',
         subItems: [
             {
                 id: 116,
                 label: 'MENUITEMS.ICONS.LIST.UNICONS',
                 link: '/',
                 parentId: 115
             },
             {
                 id: 117,
                 label: 'MENUITEMS.ICONS.LIST.FEATHERICONS',
                 link: '/',
                 parentId: 115
             },
             {
                 id: 118,
                 label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                 link: '/',
                 parentId: 115
             },
             {
                 id: 119,
                 label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                 link: '/',
                 parentId: 115
             },
             {
                 id: 120,
                 label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                 link: '/',
                 parentId: 115
             },
         ]
     },
     {
         id: 121,
         label: 'MENUITEMS.MAPS.TEXT',
         icon: 'map-pin',
         subItems: [
             {
                 id: 122,
                 label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                 link: '/',
                 parentId: 121
             },
             {
                 id: 123,
                 label: 'MENUITEMS.MAPS.LIST.LEAFLET',
                 link: '/',
                 parentId: 121
             }
         ]
     },
     {
         id: 124,
         label: 'MENUITEMS.MULTILEVEL.TEXT',
         icon: 'share-2',
         subItems: [
             {
                 id: 125,
                 label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                 parentId: 124
             },
             {
                 id: 126,
                 label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                 subItems: [
                     {
                         id: 127,
                         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                         parentId: 126,
                     },
                     {
                         id: 128,
                         label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                         parentId: 126,
                     }
                 ]
             },
         ]
     }
     */

];
