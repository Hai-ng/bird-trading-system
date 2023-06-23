import { Button, Modal } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import CoreServices from "../../../services/data.services";
import { IUserInfo } from "../../CommonComponents/AppInterfaces";

interface IUserDetailProps {
    userId: string;
    isOpen: boolean;
    onCancel: any;
    // onApprove: any;
    // onReject: any;
    currentUser: IUserInfo;
}

interface IUserDetailState {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    username: string;
    email?: string;
    address?: string;
    balance?: number;
}

export class UserDetail extends React.Component<IUserDetailProps, IUserDetailState> {
    public coreService = new CoreServices();
    constructor(props: IUserDetailProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            address: '',
            email: '',
            phoneNumber: '',
            balance: 0,
        }
    }

    componentDidMount(): void {
        this.getUserDetail();
    }

    render(): React.ReactNode {
        return (<>
            <Modal
                open={this.props.isOpen}
                closable={false}
                title='User'
                footer={this.getRenderFooterButton()}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                    <span style={{ marginBottom: 10 }}><strong>UserName: {this.state.username} </strong></span>
                    <span style={{ marginBottom: 10 }}>FirstName: {this.state.firstName}</span>
                    <span style={{ marginBottom: 10 }}>LastName: {this.state.lastName}</span>
                    <span style={{ marginBottom: 10 }}>Address: {this.state.address}</span>
                    <span style={{ marginBottom: 10 }}>Email: {this.state.email}</span>
                    <span style={{ marginBottom: 10 }}>PhoneNumber: {this.state.phoneNumber}</span>
                    <span style={{ marginBottom: 10 }}> <strong>Balance: <NumericFormat thousandSeparator=' ' value={this.state.balance} displayType='text' suffix=" ₫" /> </strong></span>            
                </div>
            </Modal>
        </>)
    }

    private getUserDetail(): void {
        this.coreService.getUserById(this.props.userId).then(res => {
            if (res.status) {
                let _rawData = res.response.data;
                this.setState({
                    firstName: _rawData.firstName,
                    lastName: _rawData.lastName,
                    username: _rawData.username,
                    address: _rawData.address,
                    email: _rawData.email,
                    phoneNumber: _rawData.phoneNumber,
                    balance: _rawData.balance,

                })
            }
        })
    }

    private getRenderFooterButton(): React.ReactNode[] {
        let nodes: React.ReactNode[] = []
        nodes.push(
            <Button key='cancel' onClick={() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }}>Close</Button>
        )
        // if (this.state.status === 0) {
        //     nodes.push(
        //         <Button type="primary" style={{ backgroundColor: '#DD0000' }} key='reject' onClick={() => {
        //             if (this.props.onReject) {
        //                 this.props.onReject()
        //             }
        //         }}>Reject</Button>
        //     )
        //     nodes.push(
        //         <Button type="primary" style={{ backgroundColor: '#00CC00' }} key='confirm' onClick={() => {
        //             if (this.props.onApprove) {
        //                 this.props.onApprove()
        //             }
        //         }}>Approve</Button>
        //     )
        // }
        return nodes;
    }
}