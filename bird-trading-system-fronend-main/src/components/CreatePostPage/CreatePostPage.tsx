import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, Select, Upload } from "antd";
import React from "react";
import { ReactNode } from "react";
import { HeaderTemplate } from "../CommonComponents/Header";
import { FooterTemplate } from "../CommonComponents/Footer";
import { ICreatePostPageProps, ICreatePostPageState, IPost } from "./ICreatePost";
import { PlusOutlined } from "@ant-design/icons";
import { CommonUtility } from "../../utilities/utilities";
import moment from "moment";
import { cloneDeep } from "lodash";
import { ConfirmDialog } from "../CommonComponents/Dialogs/ConfirmDialog";
import { NumericFormat } from "react-number-format";
import CreatePostService from "./CreatePost.service";
import { ImagePreview } from "../CommonComponents/Dialogs/ImagePreviewDialog";

export class CreatePostPage extends React.Component<ICreatePostPageProps, ICreatePostPageState> {
    public service = new CreatePostService();

    constructor(props: ICreatePostPageProps) {
        super(props);
        this.state = {
            currentUser: null,
            address: '',
            images: [],
            packageId: '',
            postingDate: null,
            productType: '',
            title: '',
            bannerId: '',
            description: '',
            postingRangeDate: 7,
            isDisableButtonCreate: true,
            isShowPopupRule: false,
            isAcceptPolicy: false,
            nameSeller: '',
            phoneSeller: '',
            postPackage: [],
            categories: [],
            unitPrice: 0,
            intoMoney: 0,
            productPrice: 0,
            isPreviewImage: false,
            sourceImagePreview: ''
        }
    }

    componentDidMount(): void {
        let user = localStorage.getItem('currentUser');
        if (CommonUtility.isNullOrUndefined(user)) {
            CommonUtility.redirectTo('/login');
        } else {
            let objUser = JSON.parse(user as string)
            let displayName = `${objUser.lastName} ${objUser.firstName}`;
            let phone = `${objUser.phoneNumber ?? ''}`;
            this.setState({
                currentUser: objUser,
                nameSeller: displayName,
                phoneSeller: phone
            });
            this.onRefreshBalance(objUser.id, objUser.token);
            this.getPostPrice();
            this.getCategory();
        }
    }

    render(): ReactNode {
        return (
            this.state.currentUser ?
                <div>
                    <HeaderTemplate activeTab={5}></HeaderTemplate>
                    <div
                        className="App-body-contain"
                        style={{
                            width: "80%",
                            marginLeft: "10%",
                            backgroundColor: "#EEEEEE",
                        }}
                    >
                        <div className="gap-element" style={{ paddingTop: 34 }}></div>
                        <Divider orientation="left" className="app-divider-create-post">
                            Thông tin bài viết
                        </Divider>
                        <Form
                            labelCol={{ span: 3 }}
                            layout="horizontal"
                            style={{ width: "90%", marginLeft: "5%" }}
                        >
                            <Form.Item label="Tiêu Đề:" required>
                                <Input
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Nhập tiêu đề"
                                    onChange={(args) => {
                                        this.setState({
                                            title: args.target.value
                                        })
                                    }}
                                ></Input>
                            </Form.Item>
                            <Form.Item label="Loại Sản Phẩm:" required>
                                <Select
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Chọn loại sản phẩm"
                                    options={this.state.categories.map(item => {
                                        return {
                                            label: item.title,
                                            value: item.id
                                        }
                                    })}
                                    onChange={(value) => {
                                        this.setState({
                                            productType: value
                                        });
                                    }}
                                ></Select>
                            </Form.Item>
                            <Form.Item label="Mô Tả:">
                                <Input.TextArea
                                    rows={4}
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Mô tả"
                                    onChange={(args) => {
                                        this.setState({
                                            description: args.target.value
                                        });
                                    }}
                                ></Input.TextArea>
                            </Form.Item>
                            <Form.Item label="Địa Chỉ:" required>
                                <Input
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Nhập địa chỉ"
                                    onChange={(value) => {
                                        this.setState({
                                            address: value.target.value
                                        });
                                    }}
                                ></Input>
                            </Form.Item>
                            <Form.Item label="Giá sản phẩm:" required>
                                <NumericFormat
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    value={this.state.productPrice} suffix=" ₫"
                                    thousandSeparator=',' displayType="input"
                                    className="app-numeric-input"
                                    onValueChange={(values) => {
                                        this.setState({
                                            productPrice: values.floatValue as number
                                        });
                                    }}
                                />
                            </Form.Item>

                            <Divider orientation="left" className="app-divider-create-post">
                                Hình ảnh đính kèm
                            </Divider>

                            <Form.Item label="Ảnh Đính Kèm" required>
                                <Upload
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    beforeUpload={(file): Promise<any> => {
                                        return this.onUploadFile(file);
                                    }}
                                    onPreview={(file) => {
                                        this.setState({
                                            isPreviewImage: true,
                                            sourceImagePreview: file.thumbUrl as string
                                        })
                                    }}
                                    className="avatar-uploader"
                                    showUploadList={true}
                                    listType="picture-card"
                                    onRemove={(file) => {
                                        this.onRemoveFile(file);
                                    }}
                                    onChange={(fileList) => {
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Divider orientation="left" className="app-divider-create-post">
                                Thông tin liên hệ:
                            </Divider>

                            <Form.Item label="Tên liên hệ:" required>
                                <Input
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Nhập tên liên hệ:"
                                    value={this.state.nameSeller}
                                    onChange={(args) => {
                                        this.setState({
                                            nameSeller: args.target.value
                                        })
                                    }}
                                ></Input>
                            </Form.Item>

                            <Form.Item label="Số điện thoại:" required>
                                <Input
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Nhập số điện thoại:"
                                    value={this.state.phoneSeller}
                                    onChange={(args) => {
                                        this.setState({
                                            phoneSeller: args.target.value
                                        })
                                    }}
                                ></Input>
                            </Form.Item>

                            <Divider orientation="left" className="app-divider-create-post">
                                Thời gian đăng tin:
                            </Divider>
                            <Form.Item label="Số lượng ngày đăng" required>
                                <Select
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Chọn ngày"
                                    defaultValue={7}
                                    options={[
                                        { label: "7 ngày", value: 7 },
                                        { label: "15 ngày", value: 15 },
                                        { label: "30 ngày", value: 30 },
                                    ]}
                                    onChange={(value) => {
                                        this.setState({
                                            postingRangeDate: value
                                        });
                                    }}
                                ></Select>
                            </Form.Item>

                            <Form.Item label="Ngày Đăng Tin" required>
                                <DatePicker
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    format={'DD/MM/YYYY'}
                                    placeholder="Chọn ngày đăng"
                                    onChange={(value) => {
                                        this.setState({
                                            postingDate: value?.toDate() ? value?.toDate() : null
                                        });
                                    }}
                                />
                                <div style={{ width: '97%', marginLeft: '3%', display: "flex" }}>
                                    {
                                        this.state.postingRangeDate && this.state.postingDate ?
                                            <span style={{ width: '97%' }} >{this.getMessageExpiredDate()}</span>
                                            : <></>
                                    }
                                </div>
                            </Form.Item>

                            <Divider orientation="left" className="app-divider-create-post">
                                Thanh toán:
                            </Divider>
                            <Form.Item label="Gói Đăng" required>
                                <Select
                                    style={{ width: "97%", marginLeft: "3%" }}
                                    placeholder="Chọn gói đăng"
                                    value={this.state.packageId}
                                    options={this.state.postPackage.map(item => {
                                        return {
                                            label: item.title,
                                            value: item.id
                                        }
                                    })}
                                    onChange={(value) => {
                                        this.setState({
                                            packageId: value
                                        });
                                        this.updateUnitPrice(value);
                                    }}
                                ></Select>
                            </Form.Item>
                            <Form.Item label="Đơn giá" style={{ marginBottom: 0 }}>
                                <NumericFormat style={{ width: "97%", marginLeft: "3%", fontWeight: 700 }} thousandSeparator=',' value={this.state.unitPrice} displayType='text' suffix=" ₫" />
                            </Form.Item>
                            <Form.Item label="Thời gian đăng tin" style={{ marginBottom: 0 }}>
                                <span style={{ width: "97%", marginLeft: "3%" }}
                                ><strong>{`${this.state.postingRangeDate} ngày`}</strong></span>
                            </Form.Item>

                            <Divider style={{ margin: 12 }} />

                            <Form.Item label="Thành tiền" style={{ fontWeight: 700, marginBottom: 0 }}>
                                <NumericFormat style={{ width: "97%", marginLeft: "3%", fontWeight: 700 }} thousandSeparator=',' value={this.getToMoney()} displayType='text' suffix=" ₫" />
                            </Form.Item>
                            <Form.Item label="Số dư còn lại" style={{ fontWeight: 100, fontStyle: 'italic', marginBottom: 0 }}>
                                <NumericFormat style={{ marginLeft: "3%", fontWeight: 100, fontStyle: 'italic' }} thousandSeparator=','  value={this.state.currentUser.balance} displayType='text' suffix=" ₫" />
                                <Button type="default" style={{ marginLeft: 14 }} onClick={() => {
                                    this.onRefreshBalanceClick()
                                }}>Cập nhật số dư</Button>
                            </Form.Item>

                            {
                                this.checkBalance() ? 
                                <span style={{ color: 'red', marginLeft: 48 }}>Số dư của bạn không đủ để tạo bài đăng</span>
                            : <></>
                            }

                            <Form.Item>
                                <div style={{ width: '97%', marginLeft: '3%', display: "flex" }}>
                                    <Col span={3} />

                                    <Checkbox checked={this.state.isAcceptPolicy} onChange={(args => {
                                        this.setState({
                                            isAcceptPolicy: args.target.checked
                                        })
                                    })} style={{ marginRight: 10 }} />
                                    <div>Tôi đồng ý với <span style={{ color: '#0000FF', cursor: 'pointer' }} onClick={() => {
                                        this.setState({
                                            isShowPopupRule: true
                                        })
                                    }} >Điều khoản & Điều kiện</span></div>
                                </div>
                            </Form.Item>



                            <div className="app-group-button">
                                <Button
                                    type="default"
                                    onClick={() => {
                                        CommonUtility.redirectTo("/home");
                                    }}
                                >
                                    Huỷ
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={this.disableBtnCreate()}
                                    onClick={() => {
                                        let key = `create_post_${new Date().getTime()}`;
                                        this.props.openMessage('loading', 'Đang tạo bài đăng', undefined, key);
                                        this.onCreatePost().then(res => {
                                            if (res.status) {
                                                this.props.destroyMessage(key);
                                                this.props.openMessage('success', 'Tạo bài đăng thành công!', 3);
                                                setTimeout(() => {
                                                    CommonUtility.redirectTo("/home");
                                                }, 3000)
                                            } else {
                                                this.props.destroyMessage(key);
                                                this.props.openMessage('error', 'Đã xảy ra lỗi trong lúc tạo bài đăng. Vui lòng thử lại sau!', 3);
                                            }
                                        });
                                    }}
                                >
                                    Đăng Bài
                                </Button>
                            </div>
                            <Divider />
                        </Form>

                        {
                            this.state.isShowPopupRule ?
                                <ConfirmDialog
                                    isOpen={this.state.isShowPopupRule}
                                    isShowOkBtn={true}
                                    isShowCancelBtn={false}
                                    title="Điều khoản & Quy Định"
                                    message={[
                                        "1. Không đăng nội dung/hình ảnh phản cảm.",
                                        "2. Tiền đăng bài sẽ bị trừ trực tiếp trong ví sau khi bài đăng được admin phê duyệt."
                                    ]}
                                    onOk={() => {
                                        this.setState({
                                            isShowPopupRule: false
                                        })
                                    }}
                                /> : <></>
                        }
                        {
                            this.state.isPreviewImage ?
                                <ImagePreview
                                    isOpen={this.state.isPreviewImage}
                                    title="Xem trước"
                                    image={
                                        this.state.sourceImagePreview
                                    }
                                    onCancel={() => {
                                        this.setState({
                                            isPreviewImage: false,
                                            sourceImagePreview: ''
                                        })
                                    }}
                                /> : <></>
                        }

                    </div>
                    <FooterTemplate></FooterTemplate>
                </div>
                : <></>
        );
    }

    private checkBalance(): boolean {
        return this.getToMoney() > (this.state.currentUser?.balance as number);
    }

    private onCreatePost(): Promise<any> {
        return new Promise(resolve => {
            let dataPost: IPost = {
                address: this.state.address,
                categoryId: this.state.productType,
                description: this.state.description,
                medias: this.getMediaFormSubmit(this.state.images),
                postTransaction: {
                    effectDate: this.formatEffectDate(this.state.postingDate as Date) as any,
                    expiredDay: this.state.postingRangeDate,
                    packId: this.state.packageId,
                    price: this.getToMoney()
                },
                nameSeller: this.state.nameSeller,
                phoneSeller: this.state.phoneSeller,
                price: this.state.productPrice,
                title: this.state.title,
                userId: this.state.currentUser?.id as string
            }
            this.service.onCreatePost(dataPost).then((res: any) => {
                resolve(res);
            })
        })

    }

    private formatEffectDate(date: Date): Date {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // return moment(date).format('yyyy-MM-DD');
        return date;
    }

    private getMediaFormSubmit(rawMedia: Array<any>): Array<any> {
        let formatData = rawMedia.map(item => {
            return {
                url: item.url,
                extension: ''
            }
        })
        return formatData;
    }

    private beforeUpload(file: any): void {
        // see more at https://ant.design/components/upload
        //todo
    }

    private getMessageExpiredDate(): React.ReactNode {
        let dateRange = cloneDeep(this.state.postingRangeDate);
        let postingDate = cloneDeep(this.state.postingDate);
        let expiredDate = new Date(postingDate?.setDate(postingDate?.getDate() + dateRange) as number);
        return <em>Bài đăng sẽ hết hạn đến hết ngày {moment(expiredDate).format('DD/MM/yyyy')}.</em>
    }

    private updateUnitPrice(packageId: string): void {
        let objPack = this.state.postPackage.filter((item: any) => {
            return item.id === packageId
        })[0];
        this.setState({
            unitPrice: objPack.price.price
        })
    }

    private getToMoney(): number {
        let unitPrice = cloneDeep(this.state.unitPrice);
        let postingRangeDate = cloneDeep(this.state.postingRangeDate);

        let totalMoney = unitPrice * postingRangeDate;
        return totalMoney;
    }

    private getBudgetBalance(): ReactNode {
        return <NumericFormat thousandSeparator=',' value={2500000} displayType='text' suffix=" ₫" />;
    }

    private disableBtnCreate(): boolean {
        let formGroup = {
            title: this.state.title,
            productType: this.state.productType,
            packageType: this.state.packageId,
            postingDateRange: this.state.postingRangeDate,
            postingDate: this.state.postingDate,
            address: this.state.address,
            images: this.state.images,
            isAcceptPolicy: this.state.isAcceptPolicy,
            nameSeller: this.state.nameSeller,
            phoneSeller: this.state.phoneSeller,
            productPrice: this.state.productPrice,
        } as any;
        let isDisableButtonCreate = false;
        for (let item in formGroup) {
            if (CommonUtility.isNullOrEmpty(formGroup[item])) {
                isDisableButtonCreate = true;
            }
            if (item === 'productPrice' && formGroup[item] === 0) {
                isDisableButtonCreate = true;
            }
        }
        if (!formGroup.isAcceptPolicy) {
            isDisableButtonCreate = true;
        }
        if (this.getToMoney() > (this.state.currentUser?.balance as number)) {
            isDisableButtonCreate = true;
        }
        return isDisableButtonCreate;
    }

    private getPostPrice(): void {
        let postPrice = localStorage.getItem('postPrice');
        let objPacks = JSON.parse(postPrice as string)
        if (!CommonUtility.isNullOrUndefined(postPrice)) {
            this.setState({
                postPackage: objPacks,
                unitPrice: objPacks[0]?.price.price,
                packageId: objPacks[0]?.id,
            });
            return;
        }
        this.service.getPostPrice().then((res: any) => {
            if (res.status) {
                let arrayPacks = this.service.mappingStylePostPack(res.response.data);
                this.setState({
                    postPackage: arrayPacks,
                    unitPrice: arrayPacks[0]?.price.price,
                    packageId: arrayPacks[0]?.id,
                });
                localStorage.setItem('postPrice', JSON.stringify(arrayPacks));
                return;
            }
            let noti_id = `withdraw_${new Date().getTime()}`
            if (res.response.response.status === 401) {
                this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
        })
    }

    private getCategory(): void {
        this.service.getCategory().then((res: any) => {
            if (res.status) {
                this.setState({
                    categories: res.response.data
                });
                return;
            }
            let noti_id = `withdraw_${new Date().getTime()}`
            if (res.response.response.status === 401) {
                this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
        })
    }

    private onUploadFile(file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.service.onUploadMedia(file).then(res => {
                if (res.status) {
                    let url = res.response.file.result;
                    let objFiles = cloneDeep(this.state.images) as Array<any>;
                    objFiles.push({
                        uid: file.uid,
                        url: url
                    })
                    this.setState({
                        images: objFiles
                    })
                    resolve(true);
                } else {
                    let noti_id = `withdraw_${new Date().getTime()}`
                    if (res.response.response.status === 401) {
                        this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                        setTimeout(() => {
                            localStorage.removeItem('currentUser');
                            this.props.destroyMessage(noti_id);
                            CommonUtility.redirectTo('/login');
                        }, 3000);
                        return;
                    }
                    this.props.openMessage('error', `Upload image failed.`, 3);
                    reject();
                }
            })
        })
    }

    private onRemoveFile(file: any): Promise<any> {
        return new Promise(resolve => {
            let uid = file.uid;
            let objFile = cloneDeep(this.state.images);
            objFile = objFile?.filter(item => {
                return item.uid !== uid;
            });
            this.setState({
                images: objFile
            });
            resolve(true);
        })
    }

    private onRefreshBalance(userId: string, token: string): void {
        this.service.getUserInfoById(userId, token).then(res => {
            let noti_id = `recharge_${new Date().getTime()}`
            if (res.status) {
                let newBalance = res.data.data.data.balance;
                let state = cloneDeep(this.state.currentUser);
                (state as any).balance = newBalance;
                localStorage.setItem('currentUser', JSON.stringify(state));
                this.setState({
                    currentUser: state
                })
            }
            if (res.response.response.status === 401) {
                this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
            this.props.openMessage('error', 'Đã xảy ra lỗi khi lấy số dư. Vui lòng tải lại trang và thử lại.', 3);
            return;
        })
    }

    private onRefreshBalanceClick(): void {
        this.service.getUserInfoById(this.state.currentUser?.id as string, this.state.currentUser?.token as string).then(res => {
            let noti_id = `recharge_${new Date().getTime()}`
            if (res.status) {
                let newBalance = res.data.data.data.balance;
                let state = cloneDeep(this.state.currentUser);
                (state as any).balance = newBalance;
                localStorage.setItem('currentUser', JSON.stringify(state));
                this.setState({
                    currentUser: state
                })
            }
            if (res.response.response.status === 401) {
                this.props.openMessage('info', 'Phiên đăng nhập đã hết hạn', undefined, noti_id);
                setTimeout(() => {
                    localStorage.removeItem('currentUser');
                    this.props.destroyMessage(noti_id);
                    CommonUtility.redirectTo('/login');
                }, 3000);
                return;
            }
            this.props.openMessage('error', 'Đã xảy ra lỗi khi lấy số dư. Vui lòng tải lại trang và thử lại.', 3);
            return;
        })
    }
}
