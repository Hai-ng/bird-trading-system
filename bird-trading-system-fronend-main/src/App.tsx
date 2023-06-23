import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { CreatePostPage } from './components/CreatePostPage/CreatePostPage';
import { NotFoundPage } from './components/CommonComponents/NotFoundPage';
import { DetailPostPage } from './components/DetailPostPage/DetailPostPage';
import { BirdPage } from './components/BirdPage/BirdPage';
import { BirdCagePage } from './components/BirdCagePage/BirdCagePage';
import { AccessoryPage } from './components/AccessoryPage/AccessoryPage';
import { BirdDetailPage } from './components/BirdPage/BirdDetailPage/BirdDetailPage';
import { PricePage } from './components/PricePage/PricePage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { AccessoryDetailPage } from './components/AccessoryPage/AccessoryDetailPage/AccessoryDetailPage';
import { BirdCageDetailPage } from './components/BirdCagePage/BirdCageDetailPage/BirdCageDetailPage';
import { TermsOfAgreementPage } from './components/TermsOfAgreementPage/TermsOfAgreementPage';
import { RulePage } from './components/RulePage/Rulepage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import { RechargePage } from './components/RechargePage/RechargePage';
import { WithdrawPage } from './components/WithdrawPage/WithdrawPage';
import { AdminPage } from './components/AdminPage/AdminPage';
import { UserPage } from './components/UserPage/UserPage';
import { ComplainPage } from './components/ComplainPage/ComplainPage';
import { ProcedurePage } from './components/ProcedurePage/ProcedurePage';
import { PostsHistory } from './components/PostsHistory/PostsHistory';
import { NewsPage } from './components/NewsPage/NewsPage';
import { PostHistoryDetailPage } from './components/PostsHistory/PostHistoryDetail/PostHistoryDetail';
import { CreateBannerPage } from './components/CreateBannerPage/CreateBannerPage';
import { TransactionHistory } from './components/TransactionHistoryPage/TransactionHistory';


function App(): JSX.Element {
  const [messageApi, contextMessageHolder] = message.useMessage();

  const openMessage = (type: NoticeType, message: string, duration: number = 300, key: string = `message_${new Date().getTime()}`) => {
    messageApi.open({
      content: message,
      type: type,
      duration: duration,
      key: key
    });
  };

  const destroyMessage = (key: string) => {
    messageApi.destroy(key);
  }

  if (localStorage.getItem('postPrice')) {
    localStorage.removeItem('postPrice')
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/home' render={(props) => <HomePage {...props} />} />
          <Route path='/posting' render={(props) => <CreatePostPage openMessage={openMessage} destroyMessage={destroyMessage} {...props} />} />
          <Route path='/createBanner' render={(props) => <CreateBannerPage openMessage={openMessage} destroyMessage={destroyMessage} {...props} />} />
          <Route path='/post/:id' render={(props) => <DetailPostPage {...props} />} />
          <Route exact path='/bird' render={(props) => <BirdPage {...props} />} />
          <Route exact path='/accessory' render={(props) => <AccessoryPage {...props} />} />
          <Route path='/accessory/:id' render={(props) => <AccessoryDetailPage {...props} />} />
          <Route path='/bird/:id' render={(props) => <BirdDetailPage {...props} />} />
          <Route exact path='/birdcage' render={(props) => <BirdCagePage {...props} />} />
          <Route path='/birdcage/:id' render={(props) => <BirdCageDetailPage {...props} />} />
          <Route path='/login' render={(props) => <LoginPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route path='/register' render={(props) => <RegisterPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} {...props} />} />
          <Route path='/price' render={(props) => <PricePage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route path='/rule' render={(props) => <RulePage {...props} />} />
          <Route path='/privacyPolicy' render={(props) => <PrivacyPolicyPage {...props} />} />
          <Route path='/agreement' render={(props) => <TermsOfAgreementPage {...props} />} />
          <Route path='/complain' render={(props) => <ComplainPage {...props} />} />
          <Route path='/procedure' render={(props) => <ProcedurePage {...props} />} />
          <Route path='/recharge' render={(props) => <RechargePage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route path='/withdraw' render={(props) => <WithdrawPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route path='/admin' render={(props) => <AdminPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route path='/userpage' render={(props) => <UserPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route exact path='/postHistory' render={(props) => <PostsHistory {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route exact path='/news' render={(props) => <NewsPage {...props} />} />
          <Route path='/postHistory/:id' render={(props) => <PostHistoryDetailPage {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />
          <Route exact path='/transactionHistory' render={(props) => <TransactionHistory {...props} openMessage={openMessage} destroyMessage={destroyMessage} />} />

          {/* để routing trên 2 cái này */}
          <Route path='/' render={() => <Redirect to="/home" />} />
          <Route path='*' render={() => <NotFoundPage />} />
        </Switch>
        {contextMessageHolder}
      </BrowserRouter>
    </>

  );
}

export default App;
