import React, { useState } from 'react';
import { Divider } from "antd";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";


export class ProcedurePage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> Quy chế hoạt động </h2>
                    <Divider />
                    <div style={{ margin: '6%', marginTop: '2%', marginBottom: '2%' }}>
                        <ol>
                            <li> <span style={{ fontWeight: 'bold' }}>Quy định chung</span>
                                <ul>
                                    <li>Thành viên tham gia Bird Trade là các cá nhân, tổ chức đã đăng ký tài khoản thành viên và các cá nhân, tổ chức vãng lai đã kê khai thông tin bắt buộc được Bird Trade yêu cầu cung cấp, có thực hiện việc đăng tin trên Bird Trade.</li>
                                    <li>Thành viên tham gia Bird Trade được quyền tự do tìm hiểu và thỏa thuận với bên có nhu cầu theo quy định của pháp luật hiện hành, trên cơ sở tôn trọng quyền và lợi ích hợp pháp của các bên. Các hoạt động liên quan phải được tiến hành một cách tự do, bình đẳng, công khai và minh bạch tuân theo quy định của pháp luật.</li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Quy trình thanh toán</span>
                                <ul>
                                    <li>Bird Trade sẽ công khai biểu giá dịch vụ và phương thức thanh toán dịch vụ trên website Bird Trade. Theo đó, các thành viên có thể tìm hiểu, lựa chọn dịch vụ và phương thức thanh toán dịch vụ phù hợp.</li>
                                    <li>Do quá trình giao dịch không được thực hiện thông qua Bird Trade nên Bird Trade khuyến nghị Người đăng tin và người mua/ bán hoặc các bên có nhu cầu tự thỏa thuận phương thức giao dịch và thanh toán theo quy định của pháp luật. Bird Trade khuyến nghị các bên có nhu cầu thực hiện thanh toán các giao dịch bất động sản qua các hình thức đảm bảo như thanh toán chuyển khoản ngân hàng (ủy nhiệm chi) dựa trên hợp đồng, hóa đơn, chứng từ pháp lý khác làm cơ sở cho việc giải quyết tranh chấp, khiếu nại (nếu có).
                                    </li>
                                </ul>

                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Đảm bảo an toàn giao dịch</span>
                                <ul>
                                    <li>Bird Trade mong muốn trở thành cổng trung gian kết nối và cung cấp thông tin chim cảnh trực tuyến hàng đầu tại Việt Nam, tạo điều kiện cho các bên có nhu cầu về mua/bán chim cảnh tìm kiếm thông tin và kết nối với nhau một cách phù hợp nhất.</li>
                                    <li>Bird Trade luôn nỗ lực để những thông tin được đăng trên website đa dạng và chính xác nhất có thể. Bird Trade sẽ nỗ lực tối đa và nghiêm túc loại bỏ những thông tin không trung thực, không chính xác hoặc/và có hàm ý thiếu lành mạnh, minh bạch                                    </li>

                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Chính sách Bảo vệ thông tin cá nhân của người tiêu dùng</span>
                                <ul>
                                    <li> Các thông tin mà Bird Trade có thể thu thập từ thành viên bao gồm: họ tên (Với Người đăng tin nước ngoài, các tên riêng được phiên âm tiếng Việt hoặc thể hiện bằng ký tự La tinh), giới tính, ngày sinh, email, mã số thuế, địa chỉ, điện thoại, nghề nghiệp, nơi làm việc và các thông tin cần thiết khác theo quy định tại khoản 3 Điều 36 Nghị định 52/2013/NĐ-CP về thương mại điện tử.</li>
                                    <li> Nếu không có sự đồng ý của thành viên, Bird Trade sẽ không cung cấp bất kỳ thông tin nào liên quan đến thành viên cho bên thứ ba để sử dụng với mục đích quảng cáo.                                    </li>
                                    <li>Các thông tin của thành viên được lữu trữ trong một thời gian cần thiết, nhằm phục vụ cho các yêu cầu thành viên đưa ra. Thành viên có thể yêu cầu Bird Trade xóa dữ liệu cá nhân khi đã chấm dứt là thành viên của Bird Trade.</li>
                                    <li>Các thành viên được cấp một tài khoản bao gồm tên tài khoản và mật khẩu để truy cập Bird Trade. Sau khi đăng nhập tài khoản, thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin tài khoản hoặc yêu cầu Bird Trade thực hiện việc này. Ngoài ra, thành viên có quyền sử dụng dịch vụ, tiện ích được cung cấp trên Bird Trade theo đúng chức năng, quyền hạn lựa chọn và được phân quyền.</li>
                                    <li>Bird Trade cam kết sẽ bảo mật các thông tin của thành viên, nỗ lực và sử dụng các biện pháp thích hợp để bảo mật các thông tin mà thành viên cung cấp cho Bird Trade trong quá trình sử dụng dịch vụ trên Bird Trade.Không bán, chuyển giao dữ liệu thông tin cho bên thứ ba, khi chưa được sự cho phép của thành viên ngoại trừ trường hợp theo yêu cầu cung cấp thông tin thành viên của cơ quan nhà nước có thẩm quyền bằng văn bản hoặc pháp luật có quy định khác. Trong trường hợp máy chủ lưu trữ thông tin thành viên bị tấn công dẫn đến mất dữ liệu thành viên, Bird Trade sẽ có trách nhiệm thông báo vụ việc cho cơ quan có thẩm quyền điều tra xử lý kịp thời và thông báo cho thành viên được biết.</li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Điều khoản cam kết </span>
                                <ul>
                                    <li>
                                        Mọi thành viên và người đăng tin, người quảng cáo khi sử dụng Bird Trade thì đồng nghĩa việc đã chấp thuận tuân theo quy chế này.
                                    </li>
                                </ul>
                            </li> <br />

                            <span style={{ fontWeight: 'bold' }}>Xin chân thành cám ơn quý thành viên đã tham gia sử dụng dịch vụ của Bird Trade. Với mong muốn xây dựng cổng trung gian kết nối và cung cấp thông tin bất động sản hàng đầu tại Việt Nam, Bird Trade sẽ cố gắng duy trì và cung cấp dịch vụ ngày càng tốt hơn, đáp ứng được mong muốn tìm kiếm thông tin bất động sản của các bên có nhu cầu.</span>

                        </ol>
                    </div>
                </div>
                <FooterTemplate></FooterTemplate>

            </div>



        )
    }
}