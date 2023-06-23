import { Modal, Space, Spin } from "antd";
import React from "react";

interface ILoadingDialogProps {
    isOpen: boolean;
    title: string;
}

export class LoadingDialog extends React.Component<ILoadingDialogProps, {}> {
    render(): React.ReactNode {
        return (
            <>
                <Modal
                    open={this.props.isOpen}
                    title={this.props.title}
                    closable={false}
                    confirmLoading={false}
                    footer={null}
                >
                    <Space size="middle" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Spin size="large" />
                    </Space>
                </Modal>
            </>
        )
    }
}