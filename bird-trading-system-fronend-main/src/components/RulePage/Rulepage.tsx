import React, { useState } from 'react';
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { Divider } from 'antd';




export class RulePage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> QUY ĐỊNH ĐĂNG TIN </h2>
                    <Divider />
                    <div style={{ margin: '11%', marginTop: '5%', marginBottom: '13%' }}>
                        <ul>
                            <li>Tin đăng bằng tiếng Việt, có dấu, chữ thường, chỉ viết hoa đầu câu và danh từ riêng, đúng chính tả, câu văn mạch lạc, rõ ràng, không chèn các ký tự đặc biệt, không dùng dấu gạch dưới ( _ ) để ngắt câu hay đặt ở đầu câu.</li> <br />
                            <li>Giữa các đoạn văn cách nhau không quá 1 hàng ký tự, không để khoảng trống, từ khóa bên dưới nội dung mô tả của tin đăng.</li> <br />
                            <li>Tin đăng không chứa các từ ngữ dung tục, nhạy cảm không phù hợp thuần phong mỹ tục, không đăng thông tin hoặc đề cập đến các chính trị gia, người nổi tiếng.</li> <br />
                            <li> Không đăng tin trùng dưới bất kỳ hình thức tin đăng nào, tin trùng sẽ bị loại.</li> <br />
                            <li>Tin đăng phải điền đầy đủ và chính xác các thông tin tại các trường thông tin ở giao diện đăng tin theo nội dung tin đăng.</li> <br />
                            <li>Quý khách tuyệt đối không sao chép nội dung quảng cáo từ các nhà quảng cáo khác. Trong trường hợp Bird Trade nhận được khiếu nại của khách hàng và xác định được tin đăng của Quý khách là tin sao chép nội dung, hình ảnh - tin đăng của Quý khách có thể bị xóa hoặc chỉnh sửa lại nội dung mà không cần thông báo trước.</li>

                        </ul>
                    </div>
                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

}
