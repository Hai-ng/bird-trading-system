import { Card, Col, Divider, Row, Statistic } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { NumericFormat } from "react-number-format";
import { AdminService } from "../AdminService";
import { CommonProps, IUserInfo } from "../../CommonComponents/AppInterfaces";
import { Chart, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    BarController,
} from 'chart.js';
import moment from "moment";
import { cloneDeep } from "lodash";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    LineController,
    BarController,
    ArcElement
);

interface IAdminHomePagetProps extends CommonProps {
    currentUser: IUserInfo;
}

interface IAdminHomePageState {
    tableColumn: ColumnsType<IColumnData>;
    tableDataSource: IColumnData[];

    isShowPreviewPost: boolean;
    postId: string;

    reportPost: IReportPost;
    reportTransaction: IReportTransaction;
    reportPostTransaction: IReportPostTransaction;

    fourDateReport: Array<string>;
    reportPostNearBy: Array<IReportPost>;
    reportPostTransactionNearBy: Array<IReportPostTransaction>;

    totalUser: number;
    totalPostApproved: number;
    totalIncomeThisMonth: number;
}

interface IReportPost {
    totalPostApprove: number;
    totalPostProcessing: number;
    totalPostDenied: number;
}

interface IReportPostTransaction {
    totalMoney: number;
    totalTransaction: number;
    totalUsing: number;
}

interface IReportTransaction {
    totalProcessing: number,
    totalTopup: number,
    totalMoneyTopup: number,
    totalWithdraw: number,
    totalMoneyWithdraw: number,
    totalDenied: number,
    totalMoneyDenied: number
}

interface IColumnData {
    id: string;
    user: string;
    categoryTitle: string;
    title: string;
    createDate: string;
    status: number;
    command?: any;
}


export class AdminHome extends React.Component<IAdminHomePagetProps, IAdminHomePageState> {

    public adminService = new AdminService();
    constructor(props: any) {
        super(props);
        this.state = {
            tableColumn: [],
            tableDataSource: [],
            isShowPreviewPost: false,
            postId: '',
            reportPost: {
                totalPostApprove: 0,
                totalPostDenied: 0,
                totalPostProcessing: 0
            },
            reportPostTransaction: {
                totalMoney: 0,
                totalTransaction: 0,
                totalUsing: 0
            },
            reportTransaction: {
                totalDenied: 0,
                totalMoneyDenied: 0,
                totalMoneyTopup: 0,
                totalMoneyWithdraw: 0,
                totalProcessing: 0,
                totalTopup: 0,
                totalWithdraw: 0
            },
            fourDateReport: [],
            reportPostNearBy: [],
            reportPostTransactionNearBy: [],
            totalUser: 0,
            totalPostApproved: 0,
            totalIncomeThisMonth: 0
        }
    }

    componentDidMount(): void {
        // this.updateTableColumn();
        this.bindingForDateReport();
        setTimeout(() => {
            this.getDataSet();
        }, 500)
    }

    render(): React.ReactNode {
        return (
            <Row justify={'center'}>
                <Col span={22}>
                    <Row justify={'space-between'}>
                        <Col span={7}>
                            <Card bordered={false} style={{
                                boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                                padding: 10,
                            }}>
                                <Statistic
                                    title="Total Post Approved"
                                    value={15}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600', fontWeight: 600 }}
                                    formatter={(value) => {
                                        return <NumericFormat thousandSeparator=',' value={this.state.totalPostApproved} displayType='text' />
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={7}>
                            <Card bordered={false} style={{
                                boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                                padding: 10,
                            }}>
                                <Statistic
                                    title="Total User"
                                    value={4}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600', fontWeight: 600 }}
                                    formatter={(value) => {
                                        return <NumericFormat thousandSeparator=',' value={this.state.totalUser} displayType='text' />
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={7}>
                            <Card bordered={false} style={{
                                boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                                padding: 10,
                            }}>
                                <Statistic
                                    title="Income in this Month"
                                    value={1500000}
                                    precision={0}
                                    valueStyle={{ color: '#3f8600', fontWeight: 600 }}
                                    formatter={(value) => {
                                        return <NumericFormat thousandSeparator=',' value={this.state.totalIncomeThisMonth} displayType='text' suffix=" ₫" />
                                    }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Divider></Divider>
                    <Row >
                        <Col span={12} style={{
                            padding: 3,
                        }} >
                            <div style={{
                                boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                                padding: 10,
                            }}>
                                <Chart type='bar' options={this.getColumnChartOptions()} data={this.getColumnChartDataObject()} />
                            </div>

                        </Col>
                        <Col span={12} style={{
                            padding: 3
                        }} >
                            <Row style={{
                                boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030',
                                padding: 10,
                            }}>
                                <Col span={6}></Col>
                                <Col span={12}>
                                    <Doughnut options={this.getDoughnutChartOptions()} data={this.getDataDoughnutChart()} />
                                </Col>
                            </Row>
                        </Col>

                    </Row>


                </Col>
            </Row>
        )
    }

    private getDataSet(): void {
        let getPostThisMonth = this.adminService.getReportPostThisMonth();
        let lastTime = moment(new Date().setDate(new Date().getDate() - 4)).format('yyyy-MM-DD');
        let getPostNearBy = [
            this.adminService.getPostByDate(lastTime, this.state.fourDateReport[0]),
            this.adminService.getPostByDate(this.state.fourDateReport[0], this.state.fourDateReport[1]),
            this.adminService.getPostByDate(this.state.fourDateReport[1], this.state.fourDateReport[2]),
            this.adminService.getPostByDate(this.state.fourDateReport[2], this.state.fourDateReport[3]),
        ];
        let getPostTransactionNearBy = [
            this.adminService.getPostTransactionByDate(lastTime, this.state.fourDateReport[0]),
            this.adminService.getPostTransactionByDate(this.state.fourDateReport[0], this.state.fourDateReport[1]),
            this.adminService.getPostTransactionByDate(this.state.fourDateReport[1], this.state.fourDateReport[2]),
            this.adminService.getPostTransactionByDate(this.state.fourDateReport[2], this.state.fourDateReport[3]),
        ];
        let getTotalUser = this.adminService.getListAllUser();
        let getTotalPostApproved = this.adminService.getListPostApproved();
        let getTotalIncomeThisMonth = this.adminService.getReportTransactionThisMonth();
        Promise.all([getPostThisMonth, 
            Promise.all(getPostNearBy), 
            Promise.all(getPostTransactionNearBy), 
            getTotalUser,
            getTotalPostApproved,
            getTotalIncomeThisMonth
        ]).then(values => {
            let reportPost: IReportPost = {
                totalPostApprove: 0,
                totalPostDenied: 0,
                totalPostProcessing: 0
            };
            let arrPostNearBy: IReportPost[] = [];
            let arrPostTransNearBy: IReportPostTransaction[] = [];
            let totalUser = 0;
            let totalPost = 0;
            let totalIncome = 0;
            if (values[0].status) {
                reportPost = values[0].response.data;
            }
            for (let item of values[1]) {
                let _temp: IReportPost = {
                    totalPostApprove: item.status ? item.response.data.totalPostApprove : 0,
                    totalPostDenied: item.status ? item.response.data.totalPostDenied : 0,
                    totalPostProcessing: item.status ? item.response.data.totalPostProcessing : 0,
                }
                arrPostNearBy.push(_temp);
            }
            for (let item of values[2]) {
                let _temp: IReportPostTransaction = {
                    totalMoney: item.status ? item.response.data.totalMoney : 0,
                    totalTransaction: item.status ? item.response.data.totalTransaction : 0,
                    totalUsing: item.status ? item.response.data.totalUsing : 0,
                }
                arrPostTransNearBy.push(_temp);
            }
            if (values[3].status) {
                totalUser = values[3].response.data.data.length
            }
            if (values[4].status) {
                totalPost = values[4].response.data.data.length
            }
            if (values[5].status) {
                totalIncome = values[5].response.data.totalMoneyTopup - values[5].response.data.totalMoneyWithdraw
            }
            this.setState({
                reportPost: reportPost,
                reportPostNearBy: arrPostNearBy,
                reportPostTransactionNearBy: arrPostTransNearBy,
                totalUser: totalUser,
                totalPostApproved: totalPost,
                totalIncomeThisMonth: totalIncome
            })
        })
    }

    private bindingForDateReport(): void {
        let toDay = moment(new Date()).format('yyyy-MM-DD');
        let yesterday = moment(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-DD');
        let threeDayAgo = moment(new Date().setDate(new Date().getDate() - 2)).format('yyyy-MM-DD');
        let fourDayAgo = moment(new Date().setDate(new Date().getDate() - 3)).format('yyyy-MM-DD');
        this.setState({
            fourDateReport: [fourDayAgo, threeDayAgo, yesterday, toDay]
        })
    }

    private getColumnChartOptions(): Object {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom' as const,
                },
                title: {
                    display: true,
                    text: 'Last 4 days',
                },
            },
            scales: {
                y: {
                  type: 'linear' as const,
                  display: true,
                  position: 'left' as const,
                },
                y1: {
                  type: 'linear' as const,
                  display: true,
                  position: 'right' as const,
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
        }
    }

    private getPostNearByData(): any {
        let arrLabel = cloneDeep(this.state.fourDateReport);
        let object: any = {};
        arrLabel.forEach((item, index) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (object as any)[item] = this.state.reportPostNearBy[index]?.totalPostApprove
        })
        return object;
    }

    private getPostTransNearByData(): any {
        let arrLabel = cloneDeep(this.state.fourDateReport);
        let object: any = {};
        arrLabel.forEach((item, index) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (object as any)[item] = this.state.reportPostTransactionNearBy[index]?.totalMoney
        })
        return object;
    }

    private getColumnChartDataObject(): any {
        return {
            labels: cloneDeep(this.state.fourDateReport),
            datasets: [
                {
                    type: 'line' as const,
                    label: 'Number of Post',
                    data: this.getPostNearByData(),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    type: 'bar' as const,
                    label: 'Income of Post',
                    data: this.getPostTransNearByData(),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
                },
            ],
        }
    }

    private getDoughnutChartLabels(): Array<string> {
        return ['Approved', 'Processing', 'Denined'];
    }

    private getDoughnutChartOptions(): Object {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom' as const,
                },
                title: {
                    display: true,
                    text: 'Post in this month',
                },
            },
        }
    }

    private getDataDoughnutChart(): any {
        let data = {
            labels: this.getDoughnutChartLabels(),
            datasets: [
                {
                    label: '',
                    data: this.getDoughnutChartDataSetValue(),
                    backgroundColor: [
                        '#66FF99',
                        '#33CCFF',
                        '#FF0000',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return data;
    }

    private getDoughnutChartDataSetValue(): Array<number> {
        let data: number[] = [];
        let arrLabels = ['totalPostApprove',
            'totalPostProcessing',
            'totalPostDenied']
        for (let item of arrLabels) {
            data.push((this.state.reportPost as any)[item]);
        }
        return data;
    }
}

