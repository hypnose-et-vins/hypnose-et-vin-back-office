import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { messageList, createMessage, showMessage } from './contact/Contact';
import { userList, showUser, createUser, userEdit } from './user/user';
import { sponsorsList, createSponsor, showSponsors } from './sponsors/Sponsors';
import { wineList, createWine, showWine, wineEdit } from './Wine/Wine';
import { faqList, createFaq, showFaq, faqEdit } from './faq/Faq';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
    authProvider={authProvider}
  >
    <Resource
      options={{ label: 'Messages' }}
      name="contact"
      list={messageList}
      create={createMessage}
      show={showMessage}
      icon={EmailIcon}
    />
    <Resource
      options={{ label: 'Users' }}
      name="users"
      list={userList}
      create={createUser}
      show={showUser}
      edit={userEdit}
      icon={PersonIcon}
    />
    <Resource
      name="sponsors"
      list={sponsorsList}
      create={createSponsor}
      show={showSponsors}
      icon={BusinessCenterIcon}
    />
    <Resource
      options={{ label: 'Wines' }}
      name="products"
      list={wineList}
      create={createWine}
      show={showWine}
      edit={wineEdit}
      icon={LocalBarIcon}
    />
    <Resource
      options={{ label: 'Faq' }}
      name="faq"
      list={faqList}
      create={createFaq}
      show={showFaq}
      edit={faqEdit}
      icon={LiveHelpIcon}
    />
  </Admin>
);

export default App;
