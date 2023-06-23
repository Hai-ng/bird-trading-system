import { Button, Col, Input, Modal, Row} from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { CommonUtility } from "../../../utilities/utilities";
import { CommonProps } from "../../CommonComponents/AppInterfaces";
import { AdminService } from "../AdminService";

interface ICreateCategoryProps extends CommonProps {
    isOpen: boolean;
    onCancel: any;
    onApprove: any;
}

interface ICreateCategoryState {
    title: string;
    classifyCategory: string;
}

export class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {

    public adminService = new AdminService();

    constructor(props: ICreateCategoryProps) {
        super(props);
        this.state = {
            title: '',
            classifyCategory: ''
        }
    }

    render(): React.ReactNode {
        return (<>
            <Modal
                open={this.props.isOpen}
                closable={false}
                title='New Category'
                footer={this.getRenderFooterButton()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                     <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                        <span>Classify: <span style={{ color: 'red' }}>*</span></span>
                        </Col>
                        <Col span={16}>
                            <Input
                                style={{ width: "90%" }}
                                placeholder="Input classify"
                                value={this.state.classifyCategory}
                                onChange={(args) => {
                                    this.setState({
                                        classifyCategory: args.target.value
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                        <span>Title: <span style={{ color: 'red' }}>*</span></span>
                        </Col>
                        <Col span={16}>
                            <Input
                                style={{ width: "90%" }}
                                placeholder="Input title"
                                value={this.state.title}
                                onChange={(args) => {
                                    this.setState({
                                        title: args.target.value
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>)
    }

    private getRenderFooterButton(): React.ReactNode[] {
        let nodes: React.ReactNode[] = []
        nodes.push(
            <Button key='cancel' onClick={() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }}>Cancel</Button>
        )

        nodes.push(
            <Button
                type="primary"
                style={{ backgroundColor: '#00CC00' }}
                key='confirm'
                onClick={() => {
                    if (this.props.onApprove) {
                        let data = cloneDeep(this.state);
                        this.props.onApprove(data);
                    }
                }}
                disabled={this.validateButtonSubmit()}
            >Submit</Button>
        )
        return nodes;
    }

    public validateButtonSubmit(): boolean {
        let objRequired = {
            
            title : this.state.title,
            classify: this.state.classifyCategory
        }
        for (let item in objRequired) {
            if (CommonUtility.isNullOrEmpty((objRequired as any)[item])) {
                return true;
            }
        }
        return false;
    }
}

