import { Injectable } from '@angular/core';
import { ChartType, ChartOptions } from '../../pages/dashboard/dashboard.model';
@Injectable({ providedIn: 'root' })



export class Charts {

    defaultChart = [[48.5, 10], [47, 29], [45, 48], [37, 14], [34, 34], [21, 20], [21, 40], [6, 30]]
    defaultsize = [130, 110, 125, 127, 140, 170, 118, 180]

    singleChartLoc = [[20, 35], [32, 18], [35, 38]]
    singleChartsize = [180, 160, 140]

    public itemStyleBubble = {
        opacity: 8,
        borderColor: "rgba(194, 194, 194, 0.5)",
        shadowBlur: 6,
        shadowOffsetX: 2.5,
        shadowOffsetY: 0.8,
        shadowColor: "rgba(150, 152, 153, 1)"
    }


    getcircleChartSeries(data:any, roundSize:any, colorCode:any, labelName:any) {
        return {
            symbolSize: roundSize,
            data: [data],
            type: 'scatter',
            color: this.getColor(colorCode)[0],
            label: {
                position: "inside",
                color: this.getColor(colorCode)[1],
                show: true,
                formatter: labelName,
            },
            emphasis: {
                label: {
                    fontSize: 15,
                    color: "#fff",
                    fontWeight: "lighter"
                }, itemStyle: {
                    color: this.getColor(colorCode)[1]
                }

            },
            itemStyle: this.itemStyleBubble,

        }
    }

    getcircleChart(values: any) {
        let chartLocation = []
        let chartSize = []
        if (values.length == 8) {
            chartLocation = this.defaultChart
            chartSize = this.defaultsize
        } else {
            chartLocation = this.singleChartLoc
            chartSize = this.singleChartsize
        }
        let circleSeries = []
        for (let i = 0; i < values.length; i++) {
            let roundsize = chartSize[i]
            let colorCode = values[i].domain_id
            let labelName = values[i].percentage.toString() + " %" + "\n" + values[i].subdomain_nm.replace(/ /g, "\n")
            let data = JSON.parse(JSON.stringify(chartLocation[i]));
            data.push(labelName);
            data.push(values[i].skill_mappings_aggregate.aggregate.count);
            circleSeries.push(this.getcircleChartSeries(data, roundsize, colorCode, labelName))

            //  circleSeries = [ this.getcircleChartSeries([43, 18], 108, "#c3ddf7", "#00448a", "2"), this.getcircleChartSeries([42, 30], 106, "#c3ddf7", "#00448a", "24"), this.getcircleChartSeries([40, 42], 100, "#fef1dd", "#9b4a09", "33"), this.getcircleChartSeries([23, 23], 140, "#edd7f6", "purple", "15"), this.getcircleChartSeries([34, 21], 90, "#fef1dd", "#9b4a09", "5"),this.getcircleChartSeries([32, 34], 110, "#c3ddf7", "#00448a", "29") ,this.getcircleChartSeries([23, 23], 140, "#edd7f6", "purple", "15"), this.getcircleChartSeries([23, 40], 125, "#edd7f6", "purple", "39"),this.getcircleChartSeries([10, 30], 180, "#edd7f6", "purple", "1")]
        }
        var bubble = {

            xAxis: { min: 1, max: 50, show: false },
            yAxis: { min: 1, max: 50, show: false },
            series: circleSeries,
            tooltip: {
                trigger: 'item', formatter: (data: any) => {
                    return "Employee Count: " + data.data[3];
                },
                textStyle: {
                    fontStyle: "normal"
                }
            }
        };
        return bubble
    }


    getColor(colorCode: any) {
        if (colorCode == 1) {
            return ["#edd7f6", "#7a1ba0"]
        } else if (colorCode == 2) {
            return ["#c3dffa", "#0a3f6a"]
        } else if (colorCode == 3) {
            return ["#fff1dd", "#9b4a09"]
        }
        return ["#fff1dd", "#9b4a09"]
    }

    BuildDonutchart(data: any) {
        let donutChart = {
            tooltip: {
                show: false,
                trigger: 'item',
                itemSize: 5,
                formatter: '{b0}: {c0}% '
            },
            legend: {
                show: false,
                top: '5%',
                left: 'center'
            },
            color: ["#67b9b0", "#e5531a"],
            series: [
                {
                    name: 'Experience',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    label: {
                        show: true,
                        position: 'center',
                        fontSize: '15',
                        formatter: () => "Total \n Experience \n" + data.total_exp.toFixed(1).toString()
                    },
                    labelLine: {
                        show: false
                    },
                    data: data.experiece
                }
            ]
        }
        return donutChart
    }


}


