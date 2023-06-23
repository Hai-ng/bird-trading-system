import '../../assets/styles/styles-global.scss';
import React, { Component } from 'react'
import { Col, Layout, Tabs } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { Divider } from 'antd';

export class FooterTemplate extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <Layout>
                <Footer>
                    <div className="footer">
                        <div className="footer-box">
                            <div className="app-footer-logo"><img src={require('../../assets/images/LOGO2.png')} /></div>
                        </div>
                        <div className="footer-box">
                            <div style={{ fontWeight: "bold" }}>Thời Gian Hoạt Động:</div>
                            <div>Thứ 2 tới Thứ 6: 6h sáng-5h chiều</div>
                            <div>Thứ 7 tới Chủ Nhật: Đóng Cửa</div>
                        </div>

                        <div className="footer-box">
                            <div style={{ fontWeight: "bold" }}>HƯỚNG DẪN:</div>
                            <a href="/price" style={{ textDecoration: "none", color: "black" }}>
                                <div>Báo giá và hỗ trợ</div>
                            </a>
                            <a href="#" style={{ textDecoration: "none", color: "black" }}>
                                <div>Câu hỏi thường gặp</div>
                            </a>
                            <a href="#" style={{ textDecoration: "none", color: "black" }}>
                                <div>Thông báo</div>
                            </a>
                            <a href="#" style={{ textDecoration: "none", color: "black" }}>
                                <div>SiteMap</div>
                            </a>
                        </div>
                        <div className="footer-box">
                            <div style={{ fontWeight: "bold" }}>ĐIỀU KHOẢN:</div>
                            <a href="/rule" style={{ textDecoration: "none", color: "black" }}>
                                <div>Quy định đăng tin</div>
                            </a>
                            <a href="/procedure" style={{ textDecoration: "none", color: "black" }}>
                                <div>Quy chế hoạt động</div>
                            </a>
                            <a href="/agreement" style={{ textDecoration: "none", color: "black" }}>
                                <div>Điều khoản thỏa thuận</div>
                            </a>
                            <a href="/privacyPolicy" style={{ textDecoration: "none", color: "black" }}>
                                <div>Chính sách bảo mật</div>
                            </a>
                            <a href="/complain" style={{ textDecoration: "none", color: "black" }}>
                                <div>Giải quyết khiếu nại</div>
                            </a>
                            <a href="#" style={{ textDecoration: "none", color: "black" }}>
                                <div>Góp ý báo lỗi</div>
                            </a>
                        </div>

                        <div className="footer-box">
                            <div><div style={{ fontWeight: "bold" }}>Địa Chỉ:</div> 242 đường Nguyễn Thiện Thuật, phường 1, Quận 3, Tp-Hồ CHí Minh</div>
                            <div><div style={{ fontWeight: "bold" }}>Số Điện Thoại:</div> +84 43-4567-987</div>
                        </div>

                        <div className="footer-box">
                            <a href="/lien-he" style={{ textDecoration: "none" }}>
                                <div style={{ fontWeight: "bold" }}>Tìm Hiểu Thêm</div>
                            </a>
                        </div>
                    </div>
                </Footer>
            </Layout >
        )
    }
}