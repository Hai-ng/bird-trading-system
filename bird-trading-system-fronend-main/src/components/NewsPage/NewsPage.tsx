import { Col, Divider, Layout } from "antd";
import React from "react";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { NumericFormat } from 'react-number-format';
import { INewsPageProps, INewsPageState } from "./INewsPage";
import CoreServices from "../../services/data.services";
import { CommonUtility } from "../../utilities/utilities";
import { cloneDeep } from 'lodash';

export class NewsPage extends React.Component<INewsPageProps, INewsPageState> {

    public coreService = new CoreServices();
    constructor(props: INewsPageProps) {
        super(props);
        this.state = {
            listPost: [],
            filter: {
                NewsType: ''       
            },
            isDataLoading: false,
            postPackage: [],
            isDisableButtonSearch: true
        }
    }

    componentDidMount(): void {
        this.getListNewsPost();
        this.getPostPrice();
        //get 'loại chim'
    }

    //#region component render
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={6}></HeaderTemplate>
                <Layout className="App-post-layout-container">
                    <div className="App-left-filter-panel">

                    </div>
                    <Divider type="vertical" />
                    <Layout.Content>
                        <Divider className="divider-title" orientation="left">Dành cho bạn</Divider>
                        {this.renderPost()}
                    </Layout.Content>
                </Layout>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private getListNewsPost(): void {
        this.coreService.getNewsList('').then(data => {
            if (CommonUtility.isNullOrUndefined(data.error)) {
                console.log(data);
                
                this.setState({
                    listPost: data
                });
                return;
            }
        })
    }

    private getPostPrice(): void {
        let postPrice = localStorage.getItem('postPrice');
        if (!CommonUtility.isNullOrUndefined(postPrice)) {
            this.setState({
                postPackage: JSON.parse(postPrice as string)
            });
            return;
        }
        this.coreService.getPostPrice().then(res => {
            if (res.status) {
                let arrayPacks = this.coreService.mappingStylePostPack(res.response.data);
                this.setState({
                    postPackage: arrayPacks
                });
                localStorage.setItem('postPrice', JSON.stringify(arrayPacks));
            }
        })
    }

    private renderPost(): React.ReactNode {
        let nodes: React.ReactNode[] = [];
        let product = cloneDeep(this.state.listPost);
        let _postPackage = cloneDeep(this.state.postPackage);

        for (let data of product) {
            let objPackage = _postPackage.filter(item => {
                return item.name === data['packageType'];
            })[0]
            let customizedStyle: React.CSSProperties = objPackage?.style;
            let post = (
                <Col key={`news_${data['id']}`} span={5} className="app-post-info" style={{ cursor: 'pointer' }} onClick={() => { this.goToNews(data['id']) }}>
                    <div className="app-col-news-item">
                        <img className="app-news-short-img" src={data['imageUrl']} alt='' />
                        <div className="app-news-short-detail">
                            <span className="app-post-title" style={customizedStyle}>
                            {data['title']} {/* {objPackage.markIcon ? <StarOutlined /> : ''} {objPackage.isUpper ? data['title'].toUpperCase() : data['title']} */}
                            </span>
                             <span className="app-news-classify">
                            </span> 
                        </div>
                    </div>
                </Col>
            );
            let gap = (<Divider />);
            nodes.push(post);
            nodes.push(gap);
        }
        return (
            <>{nodes}</>
        )
    }

    private onFilterDataStateChange(property: string, value: string): void {
        let _filter = this.state.filter as any;
        switch (property) {
            case 'NewsType':
                _filter.NewsType = value;
                break;
        }
        let isShowButton = false;
        for(let props in _filter) {
            if(!CommonUtility.isNullOrEmpty(_filter[props])) {
                isShowButton = true;
            }
        }
        this.setState({
            filter: _filter,
            isDisableButtonSearch: !isShowButton
        });
    }

    private onClearSearch(): void {
        let _filter = {
            NewsType: ''
        }
        this.setState({
            isDisableButtonSearch: true,
            filter: _filter
        });
        this.getListNewsPost();
    }

    private onSearchNews(): void {
        this.setState({
            isDataLoading: true
        });
        this.coreService.getNewsListOnFilter(this.state.filter).then(data => {
            if (CommonUtility.isNullOrUndefined(data.error)) {
                this.setState({
                    listPost: data,
                    isDataLoading: false
                });
                return;
            }
            this.setState({
                listPost: [],
                isDataLoading: false
            });
        })
    }

    private goToNews(id: string): void {
        CommonUtility.redirectTo(`/news/${id}`);
    }

    

}