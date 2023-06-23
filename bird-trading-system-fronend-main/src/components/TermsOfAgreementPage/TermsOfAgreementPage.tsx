import React, { useState } from 'react';
import { Divider } from "antd";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";


export class TermsOfAgreementPage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div>
                <HeaderTemplate activeTab={0}></HeaderTemplate>
                <div>
                    <h2 style={{ textAlign: 'center' }}> Điều khoản thỏa thuận </h2>
                    <Divider />
                    <div style={{ margin: '6%', marginTop: '2%', marginBottom: '2%' }}>
                        <p>Trước hết, chúng tôi xin chân thành cám ơn các bạn đã quan tâm và có mong muốn sử dụng dịch vụ của chúng tôi. Trước khi bắt đầu tham quan Bird Trade cũng như sử dụng các dịch vụ trên trang website, xin vui lòng đọc cẩn thận và ghi nhớ Điều khoản Thoả thuận này. Việc sử dụng hoặc truy cập vào website sẽ được hiểu là sự chấp nhận và đồng ý ràng buộc vào Điều khoản Thoả thuận.</p>


                        <ol>
                        <li> <span style={{ fontWeight: 'bold' }}>Trách nhiệm của người sử dụng </span>
                                <ul>
                                    <li>Bạn đồng ý chỉ truy cập và dùng website  với các mục đích hợp pháp. Bạn có trách nhiệm về việc hiểu biết và tuân thủ mọi điều luật, các quy chế, quy tắc và các quy định gắn liền với việc bạn sử dụng website, kể cả vùng tương tác bất kỳ việc sử dụng mạng hay dịch vụ nào khác có kết nối tới website phương tiện liên lạc mà nhờ đó, bạn nối môđem, máy tính hoặc các thiết bị khác của bạn tới website .</li>
                                    <li>Bằng việc cung cấp thông tin bao gồm nhưng không giới hạn số điện thoại, email khi đăng ký tài khoản thành viên hay các trường thu thập thông tin trên website, bạn đồng ý nhận các cuộc gọi, tin nhắn, email từ bao gồm không giới hạn các nội dung liên quan đến chăm sóc khách hàng, giới thiệu, quảng cáo dịch vụ của website cũng như các sản phẩm, dịch vụ của cổ đông sở hữu, công ty liên kết, đơn vị thành viên của công ty sở hữu website.</li>
                                </ul>
                            </li> <br />

                        <li> <span style={{ fontWeight: 'bold' }}>Hạn chế đối với người sử dụng </span>
                                <ul>
                                    <li>Thay đổi, làm hư hại, xoá nội dung bất kỳ hoặc các phương tiện khác mà không phải là nội dung thuộc sở hữu của bạn; hoặc gây trở ngại cho những người khác truy cập tới website</li>
                                    <li>• Gửi hoặc chuyển thư rác, thông tin về các cuộc thi, thông tin khảo sát, hoặc nhắn tin đại chúng khác, cho dù với mục đích thương mại hay không</li>
                                    <li>Vi phạm một quy tắc, chính sách hay hướng dẫn sử dụng nào của nhà cung cấp dịch vụ Internet cho bạn hay các dịch vụ trực tuyến;
                                        Khi có hành vi vi phạm các quy định nêu trên, chúng tôi có quyền thực hiện bất kỳ hành động hợp pháp nào mà chúng tôi cho là cần thiết để ngăn chặn sự truy cập, sử dụng trái phép website, bao gồm việc sử dụng rào cản công nghệ, hoặc báo cáo về hành vi của bạn tới cơ quan nhà nước có thẩm quyền.
                                    </li>
                                </ul>

                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Các quyền sở hữu trí tuệ </span>
                                <ul>
                                    <li>Bạn không thể thay đổi, sao chép, mô phỏng, truyền, phân phối, công bố, tạo ra các sản phẩm phái sinh, hiển thị hoặc chuyển giao, hoặc khai thác nhằm mục đích thương mại bất kỳ phần nào của nội dung, toàn bộ hay từng phần, mặc dù bạn có thể:tạo một số lượng hợp lý các bản sao dưới dạng số hoặc hình thức khác để phần cứng và phần mềm máy tính của bạn có thể truy cập và xem được nội dung,in một bản sao của từng đoạn nội dung,tạo và phân phối một số lượng hợp lý các bản sao nội dung, toàn bộ hay từng phần, ở dạng bản in hoặc bản điện tử để dùng nội bộ. Bất kỳ bản sao nội dung được phép nào cũng phải được tái tạo ở dạng không thể biến đổi được các thông tri bất kỳ chứa trong nội dung, chẳng hạn như tất cả các thông tri về Quyền Sở hữu Trí tuệ, và các nguồn thông tin ban đầu cho website và địa chỉ mạng (URL) của nó. Bạn thừa nhận, website, các cộng tác viên, và/hoặc những người sử dụng vẫn là những người chủ sở hữu của nội dung và rằng, bạn sẽ không có bất kỳ Quyền Sở hữu Trí tuệ nào qua việc tải xuống hoặc in nội dung.</li>
                                    <li>Với việc đưa nội dung lên vùng tương tác bất kỳ, bạn tự động chấp nhận và/hoặc cam đoan rằng, chủ sở hữu của nội dung đó , hoặc là bạn, hoặc là nhóm thứ ba, đã cho website quyền và giấy phép không phải trả tiền bản quyền, lâu dài, không thay đổi, không loại trừ, không hạn chế để sử dụng, mô phỏng, thay đổi, sửa lại, công bố, dịch thuật, tạo các sản phẩm phái sinh, cấp phép con, phân phối, thực hiện và hiển thị nội dung đó, toàn phần hay từng phần, khắp thế giới và/hoặc kết hợp nó với các công việc khác ở dạng bất kỳ, qua các phương tiện truyền thông hoặc công nghệ hiện tại hay sẽ phát triển sau này theo điều khoản đầy đủ của Quyền Sở hữu Trí tuệ bất kỳ trong nội dung đó. Bạn cũng cho phép website cấp giấy phép con cho bên thứ ba quyền không hạn chế để thực hiện bất kỳ quyền nào ở trên với nội dung đó. Bạn cũng cho phép người dùng truy cập, xem, lưu và mô phỏng lại nội dung để sử dụng riêng. Bạn cũng cho phép website dùng tên và logo công ty vì các mục đích tiếp thị
                                    </li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}> Các liên kết. </span>
                                <ul>
                                    <li>Bạn hiểu rằng trừ phần nội dung, các sản phẩm và dịch vụ có trên website , công ty mẹ, hoặc các chi nhánh, cũng như các giám đốc, nhân viên, người làm công và các đại lý tương ứng kiểm soát, cung cấp không chịu trách nhiệm với nội dung, hàng hóa hoặc các dịch vụ của các sites khác trên Internet được kết nối tới hoặc từ website Tất cả nội dung, hàng hóa và các dịch vụ đó đều có thể truy cập được trên Internet bởi bên thứ ba độc lập và không phải là một phần của website hoặc được kiểm soát bởi admin. Websiten không xác nhận và cũng không chịu trách nhiệm về tính chính xác, tính đầy đủ, tính hữu dụng, chất lượng và tính sẵn sàng của mọi nội dung, hàng hóa hay các dịch vụ có trên các site được kết nối tới hoặc từ website mà đó là trách nhiệm duy nhất của bên thứ ba độc lập đó, và do vậy việc sử dụng của bạn là sự mạo hiểm riêng của bạn.</li>
                                    <li>Website, công ty mẹ, hoặc các chi nhánh, hoặc các giám đốc, nhân viên, người làm công và các đại lý tương ứng không chịu trách nhiệm pháp lý, trực tiếp hay gián tiếp, với mọi mất mát hay thiệt hại gây ra bởi hoặc bị cho là gây ra bởi việc sử dụng hoặc sự tin cậy của bạn vào mọi nội dung, hàng hóa hoặc các dịch vụ có trên site bất kỳ được kết nối đến hoặc từ website , hoặc do bạn không thể truy cập lên Internet hay site bất kỳ kết nối đến hoặc từ website.
                                    </li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Bồi thường </span>
                                <ul>
                                    <li>
                                        Bạn đồng ý trả tiền cho website, công ty mẹ và các chi nhánh, các giám đốc, nhân viên, những người làm công và các đại lý tương ứng tất cả các trách nhiệm pháp lý, các quyền được đòi hỏi và các phí tổn, kể cả các phí hợp lý cho luật sư, nảy sinh từ sự vi phạm Điều khoản Thỏa thuận này, từ chính sách bất kỳ khác, từ việc sử dụng hay truy cập của bạn tới website hoặc site internet đựơc kết nối đến hoặc từ website, hoặc về việc truyền nội dung bất kỳ trên website.
                                    </li>
                                </ul>
                            </li> <br />

                            <li> <span style={{ fontWeight: 'bold' }}>Các vấn đề khác </span>
                                <ul>
                                    <li>    Điều khoản Thoả thuận này bao gồm toàn bộ sự thoả thuận giữa website và bạn, và thay thế mọi thoả thuận trước đây về chủ đề này. Website có thể xét lại Điều khoản Thoả thuận này hoặc mọi chính sách khác vào bất cứ lúc nào và đôi khi, sự xem xét lại này sẽ có hiệu lực trong 2 ngày nhờ gửi thông báo về sự xem xét lại đó ở nơi dễ thấy trên website . Bạn đồng ý xem xét lại Điều khoản Thoả thuận này định kỳ để hiểu về những điều đã được sửa lại đó. Nếu bạn không chấp nhận các sửa đổi này, bạn phải thôi truy cập tới website. Sự tiếp tục truy cập của bạn và việc sử dụng website sau thông báo về mọi sửa đổi như vậy sẽ được coi chắc chắn là sự chấp nhận tất cả các sửa đổi như vậy.    </li>
                                    <li> Việc website không thể đòi hỏi hoặc buộc thực hiện chặt chẽ mọi điều khoản của Điều khoản Thoả thuận này sẽ không được coi là sự khước từ điều khoản hay quyền bất kỳ.</li>
                                    <li> Xin cám ơn bạn đã dành thời gian đọc bản Thỏa thuận này, và một lần nữa xin cám ơn bạn đã sử dụng dịch vụ của chúng tôi. Hy vọng rằng những thông tin trên sẽ hữu ích đối với bạn.</li>
                                </ul>

                            </li>

                        </ol>
                    </div>
                </div>
                <FooterTemplate></FooterTemplate>

            </div>



        )
    }
}