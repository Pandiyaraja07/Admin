import { ChartType, ChartOptions } from './dashboard.model';

/**
 * Sliders data
 */
const slides = [
    {
        year: '2018 - 20',
        type: 'Full Stack Developer',
        company: 'ABC Company'
    },
    {
        year: '2017 - 18',
        type: 'Backend Developer',
        company: 'XYZ Company'
    },
    {
        year: '2015 - 17',
        type: 'Frontend Developer',
        company: 'ABC Company'
    },
    {
        year: '2018 - 20',
        type: 'UI/UX Designer',
        company: 'XYZ Company'
    }
];


/**
 * Total Revenue Chart
 */
const revenueChart: ChartType = {
    series: [{
        data: [10, 20, 15, 40, 20, 50, 70, 60, 90, 70, 110]
    }],
    chart: {
        type: 'bar',
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        }
    },
    colors: ['#038edc'],
};

/**
 * TOTAL REFUNDS Chart
 */
const refundsChart: ChartType = {
    series: [{
        name: "Series A",
        data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
    }],
    chart: {
        height: 50,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100]
        },
    },
    colors: ['#038edc', 'transparent'],
};

/**
 * Active User Chart
 */
const userChart: ChartType = {
    series: [{
        data: [40, 20, 30, 40, 20, 60, 55, 70, 95, 65, 110]
    }],
    chart: {
        type: 'bar',
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
    },
    colors: ['#038edc'],
};

/**
 * All Time Orders Chart
 */
const orderChart: ChartType = {
    series: [{
        name: "Series A",
        data: [10, 90, 30, 60, 50, 90, 25, 55, 30, 40]
    }],
    chart: {
        height: 50,
        type: 'area',
        sparkline: {
            enabled: true
        },
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100]
        },
    },
    colors: ['#038edc', 'transparent'],
};

/**
 * Donut chart
 */
const donutChart: ChartType = {
    chart: {
        height: 230,
        type: 'donut',
    },
    dataLabels: {
        enabled: false,
    },
    series: [75, 25],
    labels: ["Internal Experience", "External Experience"],
    colors: ['#67b9b0', '#e5531a'],
    legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0
    }
};

/**
 * Sales Analytics Chart
 */
const analyticsChart: ChartType = {
    chart: {
        height: 332,
        type: 'line',
        stacked: false,
        offsetY: -5,
        toolbar: {
            show: false
        }
    },
    stroke: {
        width: [0, 0, 0, 1],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '40%'
        }
    },
    colors: ['#5fd0f3', '#038edc', '#dfe2e6', '#51d28c'],
    series: [{
        name: 'Income',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'Sales',
        type: 'column',
        data: [19, 8, 26, 21, 18, 36, 30, 28, 40, 39, 15]
    }, {
        name: 'Conversation Ratio',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Users',
        type: 'line',
        data: [9, 11, 13, 12, 10, 8, 6, 9, 14, 17, 22]
    }],
    fill: {
        opacity: [0.85, 1, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
    markers: {
        size: 0
    },

    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        title: {
            text: 'Sales Analytics',
            style: {
                fontWeight: 500,
            },
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y: any) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;

            }
        }
    },
    grid: {
        borderColor: '#f1f1f1',
        padding: {
            bottom: 15
        }
    }
};

/**
 * User Data
 */
const users = [
    {
        id: "#DK1018",
        date: '1 Jun, 11:21',
        status: 'Paid',
        name: 'Alex Fox',
        image: 'assets/images/users/avatar-1.jpg',
        purchased: 'Wireframing Kit for Figma',
        revenue: '$129.99'
    },
    {
        id: "#DK1017",
        date: '29 May, 18:36',
        status: 'Paid',
        name: 'Joya Calvert',
        image: 'assets/images/users/avatar-3.jpg',
        purchased: 'Mastering the Grid +2 more',
        revenue: '$228.88'
    },
    {
        id: "#DK1016",
        date: '25 May , 08:09',
        status: 'Refunded',
        name: 'Gracyn Make',
        image: 'assets/images/users/avatar-4.jpg',
        purchased: 'Wireframing Kit for Figma',
        revenue: '$9.99'
    },
    {
        id: "#DK1015",
        date: '19 May , 14:09',
        status: 'Paid',
        name: 'Monroe Mock',
        image: 'assets/images/users/avatar-5.jpg',
        purchased: 'Spiashify 2.0',
        revenue: '$44.00'
    },
    {
        id: "#DK1014",
        date: '10 May , 10:00',
        status: 'Paid',
        name: 'Lauren Bond',
        image: 'assets/images/users/avatar-6.jpg',
        purchased: 'Mastering the Grid',
        revenue: '$75.87'
    },
    {
        id: "#DK1011",
        date: '29 Apr , 12:46',
        status: 'Changeback',
        name: 'Ricardo Schaefer',
        image: 'assets/images/users/avatar-9.jpg',
        purchased: 'Spiashify 2.0',
        revenue: '$63.99'
    },
    {
        id: "#DK1010",
        date: '27 Apr , 10:53',
        status: 'Paid',
        name: 'Arvi Hasan',
        image: 'assets/images/users/avatar-10.jpg',
        purchased: 'Wireframing Kit for Figma',
        revenue: '$51.00'
    }
];

/**
 * Basic Column Charts
 */
const basicChart: ChartOptions = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '45%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Net Profit',
        data: [46, 24]
    }, {
        name: 'Revenue',
        data: [74]
    }, {
        name: 'Free Cash Flow',
        data: [37]
    },
    {
        name: 'Free Cash Flow 3',
        data: [37]
    }],
    colors: ['#f1734f', '#038edc', '#51d28c'],
    xaxis: {
        categories: ['Domain', 'Domain2', 'Domain3'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands"
            }
        }
    }
};


export { revenueChart, refundsChart, userChart, orderChart, donutChart, analyticsChart, users, slides, basicChart };
