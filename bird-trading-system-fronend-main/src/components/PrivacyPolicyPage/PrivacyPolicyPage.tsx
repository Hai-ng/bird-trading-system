
import React, { useState } from 'react';
import { Divider } from "antd";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";


export class PrivacyPolicyPage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> Chính sách bảo mật thông tin </h2>
                    <Divider />
                    <div style={{ margin: '6%', marginTop: '2%', marginBottom: '2%' }}>
                        <ol>
                            <li> <span style={{ fontWeight: 'bold' }}>Mục đích và phạm vi thu thập thông tin </span>
                                <ul>
                                    <li>Website luôn cố gắng để những thông tin được đăng trên trang là hữu ích và chính xác nhất. Để thực hiện điều đó, Website yêu cầu thành viên phải cung cấp đầy đủ và chính xác mọi thông tin tại Website</li>
                                    <li>Các thông tin mà Website có thể thu thập từ thành viên bao gồm: họ tên (Với Người đăng tin nước ngoài, các tên riêng được phiên âm tiếng Việt hoặc thể hiện bằng ký tự La tinh), giới tính, ngày sinh, email, mã số thuế, địa chỉ, điện thoại, nghề nghiệp, nơi làm việc và các thông tin cần thiết khác theo quy định tại khoản 3 Điều 36 Nghị định 52/2013/NĐ-CP về thương mại điện tử.</li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Phạm vi sử dụng thông tin </span>
                                <ul>
                                    <span>Các thông tin được thành viên cung cấp có thể dùng vào các mục đích sau:</span>
                                    <li>Phân tích, đánh giá và hoàn thiện sản phẩm, dịch vụ, công nghệ, quy trình trên website</li>
                                    <li>Nâng cao mối tương tác và liên kết với thành viên   </li>
                                    <li> Nếu không có sự đồng ý của thành viên website sẽ không cung cấp bất kỳ thông tin nào liên quan đến thành viên cho bên thứ ba để sử dụng với mục đích quảng cáo.</li>
                                </ul>

                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Thời gian lưu trữ thông tin </span>
                                <ul>
                                    <li>Các thông tin của thành viên được lữu trữ trong một thời gian cần thiết, nhằm phục vụ cho các yêu cầu thành viên đưa ra.</li>
                                    <li>Thành viên có thể yêu cầu admin xóa dữ liệu cá nhân khi đã chấm dứt là thành viên của website</li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Cam kết bảo mật thông tin thành viên </span>
                                <ul>
                                    <li>Không bán, chuyển giao dữ liệu thông tin cho bên thứ ba, khi chưa được sự cho phép của thành viên ngoại trừ trường hợp theo yêu cầu cung cấp thông tin thành viên của cơ quan nhà nước có thẩm quyền bằng văn bản hoặc pháp luật có quy định khác.</li>
                                    <li> Trong trường hợp máy chủ lưu trữ thông tin thành viên bị tấn công dẫn đến mất dữ liệu thành viên, admin sẽ có trách nhiệm thông báo vụ việc cho cơ quan có thẩm quyền điều tra xử lý kịp thời và thông báo cho thành viên được biết.
                                    </li>
                                    <li> Nếu xét thấy thông tin của thành viên cung cấp trên website là không chính xác, admin sẽ tiến hành hủy toàn bộ những nội dung của thành viên đó được đăng tải trên website.</li>
                                </ul>
                            </li> <br />

                        </ol>
                    </div>
                </div>
                <FooterTemplate></FooterTemplate>
            </div>
        )
    }
}