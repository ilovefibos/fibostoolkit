// Primary components
import CreateAccount from 'components/Features/CreateAccountForm';
import CreateProxy from 'components/Features/CreateProxyForm';
import ResignProxy from 'components/Features/ResignProxyForm';
import SetProxy from 'components/Features/SetProxyForm';
import RamForm from 'components/Features/RamForm';
import StakeForm from 'components/Features/StakeForm';
import Refund from 'components/Features/RefundForm';
import Transfer from 'components/Features/TransferForm';
import Withdrawl from 'components/Features/WithdrawlForm';
import Exchange from 'components/Features/ExchangeForm';
import SimplePermissions from 'components/Features/SimplePermissionsForm';
import ComplexPermissions from 'components/Features/ComplexPermissionsForm';
import LinkAuth from 'components/Features/LinkAuthForm';
import ClaimRewards from 'components/Features/ClaimRewardsForm';
import SmartTokenIssue from 'components/Features/SmartTokenIssueForm';
import SmartTokenTransfer from 'components/Features/SmartTokenTransferForm';
import SmartTokenExchange from 'components/Features/SmartTokenExchangeForm';
import SmartTokenDestroy from 'components/Features/SmartTokenDestroyForm';
import TokenCreate from 'components/Features/TokenCreateForm';

import BidName from 'components/Features/BidNameForm';
import Airgrab from 'components/Features/AirgrabForm';
import Donate from 'components/Features/DonateForm';
import VotingTable from 'containers/NetworkProducers';

// EOSIO FORUM
import ForumStatus from 'components/Features/ForumForms/Status';
import ForumPost from 'components/Features/ForumForms/Post';
import ForumProposal from 'components/Features/ForumForms/Propose';
import ForumVote from 'components/Features/ForumForms/Vote';

// MULTISIG - OFFLINE SIGN
import MultisigCreate from 'components/Features/Multisig/Create';
import MultisigSign from 'components/Features/Multisig/Sign';
import MultisigPush from 'components/Features/Multisig/Push';

// containers
import Network from 'containers/Network/Loadable';
import SearchAccount from 'containers/SearchAccount/Loadable';

// Pages
import GovernancePage from 'components/Pages/GovernancePage/Loadable';
import FeaturesPage from 'components/Pages/FeaturesPage/Loadable';

// external Features
import ProxyTable from 'containers/ProxyInfo';
import HorusPay from 'containers/HorusPay';

// @material-ui/icons
import {
  Dashboard,
  AccountBalance,
  Search,
  PersonAdd,
  AssignmentInd,
  AssignmentTurnedIn,
  Payment,
  SwapHoriz,
  DeveloperBoard,
  Forum,
  Favorite,
  Send,
  CloudDownload,
  Settings,
  BusinessCenter,
  VpnKey,
} from '@material-ui/icons';
import HorusIcon from 'components/Icons/Horus';
import ExchangeForm from "../components/Features/ExchangeForm";


const dashRoutes = [
  { hide: true, path: '/networks', name: 'Network', component: Network },
  {
    path: '/home',
    name: 'Features',
    icon: Dashboard,
    component: FeaturesPage,
  },
  {
    path: '/donate',
    name: 'Donate',
    icon: Favorite,
    component: Donate,
  },
  // {
  //   path: '/governance',
  //   name: 'Governance',
  //   icon: AccountBalance,
  //   component: GovernancePage,
  // },
  // {
  //   path: '/horuspay',
  //   name: 'HorusPay',
  //   icon: HorusIcon,
  //   component: HorusPay,
  // },
  // {
  //   path: '/airgrab',
  //   name: 'Airgrab Tokens',
  //   icon: CloudDownload,
  //   component: Airgrab,
  // },
  {
    path: '/search',
    name: 'Find Accounts',
    icon: Search,
    component: SearchAccount,
  },
  {
    path: '/account/create',
    name: 'Create Account',
    icon: PersonAdd,
    component: CreateAccount,
  },
  {
    path: '/transfer',
    name: 'Transfer FO or EOS',
    icon: Payment,
    component: Transfer,
  },
  {
    path: '/exchange',
    name: 'Exchange FO or EOS',
    icon: SwapHoriz,
    component: Exchange,
  },
  {
    path: '/withdrawl',
    name: 'Withdrawl EOS',
    icon: Send,
    component: Withdrawl,
  },
  {
    collapse: true,
    path: '/account',
    name: 'Manage Account',
    state: 'openAccount',
    icon: AssignmentInd,
    views: [
      {
        path: '/account/delegate',
        name: 'Manage Stake',
        mini: 'MS',
        component: StakeForm,
      },
      {
        path: '/account/ram',
        name: 'Manage RAM',
        mini: 'MR',
        component: RamForm,
      },
      {
        path: '/account/permissions',
        name: 'Manage Permissions',
        mini: 'P',
        component: SimplePermissions,
      },
      {
        path: '/account/advanced',
        name: 'Advanced Permissions',
        mini: 'AP',
        component: ComplexPermissions,
      },
      {
        path: '/account/linkauth',
        name: 'Link Auth',
        mini: 'LA',
        component: LinkAuth,
      },
      {
        path: '/account/refund',
        name: 'Refund Stake',
        mini: 'RS',
        component: Refund,
      },
    ],
  },
  {
    collapse: true,
    path: '/smarttoken',
    name: 'Manage Smart Token',
    state: 'openSmartToken',
    icon: BusinessCenter,
    views: [
      {
        path: '/smarttoken/create',
        name: 'Create Smart Token',
        mini: 'CST',
        component: TokenCreate,
      },
      {
        path: '/smarttoken/issue',
        name: 'Issue Smart Token',
        mini: 'IST',
        component: SmartTokenIssue,
      },
      {
        path: '/smarttoken/exchange',
        name: 'Exchange Smart Token',
        mini: 'EST',
        component: SmartTokenExchange,
      },
      {
        path: '/smarttoken/transfer',
        name: 'Transfer Smart Token',
        mini: 'TST',
        component: SmartTokenTransfer,
      },
      {
        path: '/smarttoken/destroy',
        name: 'Destroy Smart Token',
        mini: 'DST',
        component: SmartTokenDestroy,
      },
    ],
  },
  {
    collapse: true,
    path: '/vote',
    name: 'Manage Voting',
    state: 'openVote',
    icon: AssignmentTurnedIn,
    views: [
      {
        path: '/vote/producers',
        name: 'Vote Producers',
        mini: 'VP',
        component: VotingTable,
      },
      // {
      //   path: '/vote/proxies',
      //   name: 'Proxy Information',
      //   mini: 'PI',
      //   component: ProxyTable,
      // },
      {
        path: '/vote/setproxy',
        name: 'Set Proxy',
        mini: 'SP',
        component: SetProxy,
      },
      {
        path: '/vote/createproxy',
        name: 'Create Proxy',
        mini: 'CP',
        component: CreateProxy,
      },
      {
        path: '/vote/resignproxy',
        name: 'Resign Proxy',
        mini: 'RP',
        component: ResignProxy,
      },
    ],
  },
  {
    collapse: true,
    path: '/community',
    name: 'Community Features',
    state: 'openCommunity',
    icon: Forum,
    views: [
      // {
      //   path: '/community/forum/status',
      //   name: 'Forum Status',
      //   mini: 'FS',
      //   component: ForumStatus,
      // },
      // {
      //   path: '/community/forum/post',
      //   name: 'Forum Post',
      //   mini: 'FP',
      //   component: ForumPost,
      // },
      // {
      //   path: '/community/forum/proposal',
      //   name: 'Forum Proposal',
      //   mini: 'Pr',
      //   component: ForumProposal,
      // },
      // {
      //   path: '/community/forum/vote',
      //   name: 'Forum Vote',
      //   mini: 'FV',
      //   component: ForumVote,
      // },
      {
        path: '/community/bidname',
        name: 'Premium Names',
        mini: 'PN',
        component: BidName,
      },
    ],
  },
  {
    collapse: true,
    path: '/multisig',
    name: 'Multisig Transactions',
    state: 'openMultisig',
    icon: VpnKey,
    views: [
      {
        path: '/multisig/create',
        name: 'Create Transaction',
        mini: 'CT',
        component: MultisigCreate,
      },
      {
        path: '/multisig/sign',
        name: 'Sign Transaction',
        mini: 'ST',
        component: MultisigSign,
      },
      {
        path: '/multisig/push',
        name: 'Push Transaction',
        mini: 'PT',
        component: MultisigPush,
      },
    ],
  },
  {
    collapse: true,
    path: '/block-producer',
    name: 'Block Producer',
    state: 'openBlockProducer',
    icon: DeveloperBoard,
    views: [
      {
        path: '/block-producer/claim-rewards',
        name: 'Claim Rewards',
        mini: 'CR',
        component: ClaimRewards,
      },
    ],
  },
  { redirect: true, path: '/', pathTo: '/home', name: 'Home' },
  { redirect: true, path: '/account/buyram', pathTo: '/account/ram', name: 'Buy RAM' },
  { redirect: true, path: '/account/sellram', pathTo: '/account/ram', name: 'Sell RAM' },
];
export default dashRoutes;
