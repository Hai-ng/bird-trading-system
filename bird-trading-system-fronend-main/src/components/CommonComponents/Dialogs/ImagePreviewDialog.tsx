import { Button, Modal } from "antd";
import React, { ReactNode } from "react";

interface IImagePreviewProps {
    isOpen: boolean;
    title: string;
    image: string;
    onCancel?: any;
}

interface IImagePreviewState {
    isOpenDialog: boolean
}

export class ImagePreview extends React.Component<IImagePreviewProps, IImagePreviewState> {
    constructor(props: IImagePreviewProps) {
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
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>{this.renderImage()}</div>
                </Modal>
            </>
        )
    }

    private renderImage(): ReactNode[] {
        let messages: ReactNode[] = [];
        messages.push(
            <img alt='' key='img' src={this.props.image} />
        )
        return messages;
    }

    private getRenderFooterButton(): ReactNode[] {
        let nodes: React.ReactNode[] = []
        nodes.push(
            <Button key='cancel' onClick={() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }}>Đóng</Button>
        )
        return nodes;
    }
}