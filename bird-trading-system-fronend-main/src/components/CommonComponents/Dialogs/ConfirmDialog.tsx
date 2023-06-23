import { Button, Modal } from "antd";
import React, { ReactNode } from "react";

interface IConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string[];
    onCancel?: any;
    onOk?: any;
    isShowCancelBtn: boolean;
    isShowOkBtn: boolean;
}

interface IConfirmDialogState {
    isOpenDialog: boolean
}

export class ConfirmDialog extends React.Component<IConfirmDialogProps, IConfirmDialogState> {
    constructor(props: IConfirmDialogProps) {
        super(props);
        this.state = {
            isOpenDialog: true
        }
    }
    render(): React.ReactNode {
        return (
            <>
                <Modal
                    open={this.props.isOpen && this.state.isOpenDialog}
                    closable={false}
                    title={this.props.title}
                    footer={this.getRenderFooterButton()}
                >
                    <div style={{ display: 'flex', flexWrap:'wrap' }}>{this.renderMessage()}</div>
                </Modal>
            </>
        )
    }

    private renderMessage(): ReactNode[] {
        let messages: ReactNode[] = [];
        for (let item of this.props.message) {
            messages.push(<span>{item}</span>)
        }
        return messages;
    }

    private getRenderFooterButton(): ReactNode[] {
        let nodes: React.ReactNode[] = []
        if (this.props.isShowCancelBtn) {
            nodes.push(
                <Button key='cancel' onClick={() => {
                    if (this.props.onCancel) {
                        this.props.onCancel()
                    }
                }}>Huỷ</Button>
            )
        }
        if (this.props.isShowOkBtn) {
            nodes.push(
                <Button key='confirm' onClick={() => {
                    if (this.props.onOk) {
                        this.props.onOk()
                    }
                }}>Xác nhận</Button>
            )
        }
        return nodes;
    }
}