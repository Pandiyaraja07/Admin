import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
    ApexTitleSubtitle,
    ApexResponsive,
    ApexAnnotations,
    ApexGrid,
    ApexStates
} from "ng-apexcharts";




// Chart data

export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    fill?: any;
    dataLabels?: any;
    legend?: any;
    xaxis?: any;
    stroke?: any;
    labels?: any;
    markers?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    title?: any;
    responsive?: any;
}

// Slide data
export interface slideModel {
    year: string;
    type: string;
    company: string;
}


export type ChartOptions = {
    series?: ApexAxisChartSeries | any;
    chart?: ApexChart;
    dataLabels?: ApexDataLabels;
    plotOptions?: ApexPlotOptions;
    yaxis?: ApexYAxis;
    xaxis?: ApexXAxis;
    fill?: ApexFill;
    tooltip?: ApexTooltip;
    stroke?: ApexStroke;
    legend?: ApexLegend;
    title?: ApexTitleSubtitle;
    responsive?: ApexResponsive[];
    colors?: string[];
    annotations?: ApexAnnotations;
    grid?: ApexGrid;
    subtitle?: ApexTitleSubtitle;
    states?: ApexStates;
};