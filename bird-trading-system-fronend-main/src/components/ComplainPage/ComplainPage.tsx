import React, { useState } from 'react';
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { Divider } from 'antd';


export class ComplainPage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> GIẢI QUYẾT KHIẾU NẠI </h2>
                    <Divider />
                    <div style={{ margin: '11%', marginTop: '5%', marginBottom: '6%' }}>
                    <ol>
                            <li> <span style={{fontWeight:'bold'}}>Nguyên tắc giải quyết tranh chấp, khiếu nại</span> 
                                <ul>
                                    <li> Bird Trade là cổng trung gian kết nối và cung cấp thông tin chim cảnh và phụ kiện giữa bên bán và bên mua mà không tham gia vào bất kỳ hoạt động hay nội dung thỏa thuận nào trong giao dịch giữa hai bên.</li> <br/>
                                    <li>Các bên tham gia vào giao dịch mua bán phải tự thẩm định và chịu trách nhiệm đối với tất cả các thông tin cá nhân và dịch vụ khi tham gia giao dịch. Theo đó, Người đăng tin phải điền đầy đủ thông tin được yêu cầu cung cấp trên Bird Trade. Trường hợp Người đăng tin không cung cấp đầy đủ, chính xác các thông tin được yêu cầu thì Bird Trade được miễn trách nhiệm theo quy định tại Điều 13 Luật bảo vệ quyền lợi người tiêu dùng năm 2010. Ban quản tr sẵn sàng hỗ trợ nhanh chóng và kịp thời khi nhận được các phản hồi, khiếu nại về việc Người đăng tin đăng nội dung tin đăng, quảng cáo không chuẩn xác, sai sự thật… Trường hợp nhận được khiếu nại, admin sẽ xác nhận lại thông tin, và tùy theo mức độ sẽ có những biện pháp xử lý phù hợp, kịp thời.</li><br/>
                                    <li>Bird Trade tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi của người tiêu dùng. Vì vậy, đề nghị Người đăng tin cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến sản phẩm và dịch vụ khác liên quan (nếu có). Mọi hành vi lừa đảo, gian lận trong nội dung tin đăng, giao dịch đều bị lên án và phải chịu hoàn toàn trách nhiệm trước pháp luật</li><br/>
                                    <li>Người đăng tin phải chịu toàn bộ trách nhiệm về nội dung tin đăng trên website. Trường hợp có khiếu nại phát sinh, Người đăng tin có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫn, khiếu nại cho Bird Trade và người có khiếu nại. Trong mọi trường hợp, Người đăng tin phải có trách nhiệm giải quyết mọi khiếu nại của người có khiếu nại liên quan đến sản phẩm.</li><br/>
                                    <li>Trong trường hợp phát sinh mâu thuẫn, khiếu nại, tranh chấp các bên sẽ ưu tiên giải quyết bằng biện pháp thương lượng, hòa giải. Trong trường hợp thương lượng, hòa giải không thành công thì Bird Trade yêu cầu các bên gửi đơn đến cơ quan nhà nước có thẩm quyền để giải quyết theo quy định của pháp luật.</li><br/>
                                </ul>
                            </li> <br />

                            <li> <span style={{fontWeight:'bold'}}> Quy trình tiếp nhận và giải quyết khiếu nại, tranh chấp:</span>
                                <ul>
                                    <li>Bước 1: Tất cả các yêu cầu giải quyết khiếu nại, tranh chấp sẽ được chuyển đến Bộ phận Chăm sóc khách hàng để tiếp nhận. <br/>
                                    <span style={{fontWeight:'bold'}}>Hotline: +84 43-4567-987; email: hotro@birdtrade.com.vn/ cskh@birdtrade.com.vn.</span>
                                    </li>
                                    <li>Bước 2: Bộ phận Chăm sóc khách hàng sẽ tiếp nhận các khiếu nại nhanh chóng kịp thời tiến hành xác minh lại những thông tin được cung cấp (qua nhân viên có liên quan, và nội dung thông tin trên website Bird Trade) và chuyển yêu cầu giải quyết khiếu nại tranh chấp sang Bộ phận có liên quan để đưa ra phương án giải quyết. </li>
                                    <li> Bước 3: Bộ phận có liên quan đề xuất phương án giải quyết khiếu nại, tranh chấp và phản hồi Bộ phận Chăm sóc khách hàng.</li>
                                    <li>Bước 4: Bộ phận Chăm sóc khách hàng xin ý kiến phê duyệt của Ban Giám đốc.</li>
                                    <li>Bước 5: Ban Giám đốc xem xét và phê duyệt phương án giải quyết khiếu nại, tranh chấp.</li>
                                    <li>Bước 6: Bộ phận Chăm sóc khách hàng phản hồi với người có yêu cầu giải quyết khiếu nại, tranh chấp về nội dung khiếu nại, tranh chấp và phương án giải quyết khiếu nại, tranh chấp (nếu có).</li>
                                </ul>

                            </li> <br />

                            <p>Trường hợp người có yêu cầu khiếu nại, tranh chấp không đồng ý với phương án giải quyết khiếu nại, tranh chấp và yêu cầu giải quyết lại thì yêu cầu giải quyết lại khiếu nại, tranh chấp được Bộ phận Chăm sóc khách hàng tiếp nhận. Quy trình lặp lại các Bước 2, 3, 4, 5 và 6. Tại Bước 6, nếu thành viên vẫn không đồng ý với phương án giải quyết khiếu nại, tranh chấp mà Bộ phận Chăm sóc khách hàng đưa ra, người có yêu cầu khiếu nại, tranh chấp có quyền khởi kiện tại tòa án hoặc trọng tài theo các quy định của pháp luật.</p>

                            <p style={{fontWeight:'bold'}}>Quy định về Cơ chế giải quyết khiếu nại của Bird Trade đã được cập nhật và chính thức có hiệu lực thi hành kể từ ngày 01/03/2023.</p>

                           

                        </ol>
                    </div>
                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }

}
