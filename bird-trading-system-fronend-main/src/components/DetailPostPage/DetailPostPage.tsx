import { Divider, Form, Layout, Select } from "antd";
import React from "react";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { IDetailPostPageProps, IDetailPostPageState } from "./IDetailPostPage";

export class DetailPostPage extends React.Component<IDetailPostPageProps, IDetailPostPageState> {

    constructor(props: IDetailPostPageProps) {
        super(props);
        this.state = {
            listPost: [],
        }
    }

    componentDidMount(): void {
    }

    //#region component render
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={1}></HeaderTemplate>
                <Layout className="App-post-layout-container">
                    <div className="App-left-filter-panel">
                        <Divider className="divider-title" orientation="left">Tìm kiếm</Divider>
                        <Form
                            labelCol={{ span: 24 }}
                            layout='vertical'
                            style={{ width: '90%', marginLeft: '5%' }}
                        >
                            <Form.Item label='Loại chim:'>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Chọn loại chim"
                                    options={[
                                        { label: 'Chào mào', value: '1' },
                                        { label: 'Chim ri', value: '2' },
                                        { label: 'Chích choè', value: '3' }
                                    ]}
                                ></Select>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider type="vertical" />
                    <Layout.Content>
                        <Divider className="divider-title" orientation="left">Dành cho bạn</Divider>
                    </Layout.Content>
                </Layout>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

    private goToDetailPost(id: string): void {

    }

    
}