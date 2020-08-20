// Primary components
import CreateAccount from 'components/Features/CreateAccountForm';
import CreateProxy from 'components/Features/CreateProxyForm';
import ResignProxy from 'components/Features/ResignProxyForm';
import SetProxy from 'components/Features/SetProxyForm';
import Ram from 'containers/Ram';
import StakeForm from 'components/Features/StakeForm';
import Refund from 'components/Features/RefundForm';
import ClaimBonus from 'components/Features/ClaimBonusForm';
import Transfer from 'components/Features/TransferForm';
import Withdrawl from 'components/Features/WithdrawlForm';
import Exchange from 'containers/Exchange';
import SimplePermissions from 'components/Features/SimplePermissionsForm';
import ComplexPermissions from 'components/Features/ComplexPermissionsForm';
import LinkAuth from 'components/Features/LinkAuthForm';
import ClaimRewards from 'components/Features/ClaimRewardsForm';
import ProducerJson from 'components/Features/ProducerJsonForm';
import CrossEthForm from 'components/Features/CrossEthForm';
import SmartTokenIssue from 'components/Features/SmartTokenIssueForm';
import SmartTokenRetire from 'components/Features/SmartTokenRetireForm';
import SmartTokenClose from 'components/Features/SmartTokenCloseForm';
import SmartTokenTransfer from 'components/Features/SmartTokenTransferForm';
import SmartTokenExchange from 'components/Features/SmartTokenExchangeForm';
import SmartTokenDestroy from 'components/Features/SmartTokenDestroyForm';
import SmartTokenLock from 'components/Features/SmartTokenLockForm';
import SmartTokenUnLock from 'components/Features/SmartTokenUnlockForm';
import SmartTokenSetPosition from 'components/Features/SmartTokenSetPositionForm';
import SmartTokenShare from 'components/Features/SmartTokenShareForm';
import TokenCreate from 'components/Features/TokenCreateForm';
import ContractWalletTransfer from 'components/Features/ContractWalletTransferForm';
import ContractWalletRecharge from 'components/Features/ContractWalletRechargeForm';
import ContractWalletExtract from 'components/Features/ContractWalletExtractForm';

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
import Network from 'containers/Network';
import SearchAccount from 'containers/SearchAccount';

// Pages
import GovernancePage from 'components/Pages/GovernancePage';
import FeaturesPage from 'components/Pages/FeaturesPage';

// external Features
import ProxyTable from 'containers/ProxyInfo';
import HorusPay from 'containers/HorusPay';

// @material-ui/icons

import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Payment from '@material-ui/icons/Payment';
import DeveloperBoard from '@material-ui/icons/DeveloperBoard';
import Favorite from '@material-ui/icons/Favorite';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import Send from '@material-ui/icons/Send';
import Cached from '@material-ui/icons/Cached';
import Forum from '@material-ui/icons/Forum';
import VpnKey from '@material-ui/icons/VpnKey';

import HorusIcon from 'components/Icons/Horus';
import ExchangeForm from "../components/Features/ExchangeForm";
import CrossForm from '../components/Features/CrossForm';
import DexForm from '../components/Features/DexForm';
import { AccountBalance, Looks, Sync } from '@material-ui/icons';


const dashRoutes = [
  { hide: true, path: '/networks', name: 'Network', component: Network },
  {
    path: '/home',
    name: 'Features',
    messageId: 'features',
    icon: Dashboard,
    component: FeaturesPage,
  },
  {
    path: '/donate',
    name: 'Donate',
    messageId: 'donate',
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
    messageId: 'findAccounts',
    icon: Search,
    component: SearchAccount,
  },
  {
    path: '/account/create',
    name: 'Create Account',
    messageId: 'createAccount',
    icon: PersonAdd,
    component: CreateAccount,
  },
  {
    path: '/transfer',
    name: 'Transfer FO or EOS',
    messageId: 'transferFoOrEos',
    icon: Payment,
    component: Transfer,
  },
  // {
  //   path: '/exchange',
  //   name: 'Exchange FO or EOS',
  //   messageId: 'exchangeFoOrEos',
  //   icon: SwapHoriz,
  //   component: Exchange,
  // },
  // {
  //   path: '/withdrawl',
  //   name: 'Withdrawl EOS',
  //   messageId: 'withdrawlEos',
  //   icon: Send,
  //   component: Withdrawl,
  // },
  {
    path: '/dex',
    name: 'Offical Dex',
    messageId: 'officalDex',
    icon: AccountBalance,
    component: DexForm,
  },
  {
    path: '/cross',
    name: 'Offical Cross Chain',
    messageId: 'officalCrossChain',
    icon: Looks,
    component: CrossForm,
  },
  {
    collapse: true,
    path: '/account',
    name: 'Manage Account',
    messageId: 'manageAccount',
    state: 'openAccount',
    icon: AssignmentInd,
    views: [
      {
        path: '/account/delegate',
        name: 'Manage Stake',
        messageId: 'manageStake',
        mini: 'MS',
        component: StakeForm,
      },
      {
        path: '/account/ram',
        name: 'Manage RAM',
        messageId: 'manageRam',
        mini: 'MR',
        component: Ram,
      },
      {
        path: '/account/permissions',
        name: 'Manage Permissions',
        messageId: 'managePermissions',
        mini: 'P',
        component: SimplePermissions,
      },
      {
        path: '/account/advanced',
        name: 'Advanced Permissions',
        messageId: 'advancedPermissions',
        mini: 'AP',
        component: ComplexPermissions,
      },
      {
        path: '/account/linkauth',
        name: 'Link Auth',
        messageId: 'linkAuth',
        mini: 'LA',
        component: LinkAuth,
      },
      {
        path: '/account/refund',
        name: 'Refund Stake',
        messageId: 'refundStake',
        mini: 'RS',
        component: Refund,
      },
      {
        path: '/account/claimbonus',
        name: 'Claim Bonus',
        messageId: 'claimBonus',
        mini: 'CB',
        component: ClaimBonus,
      },
    ],
  },
  {
    collapse: true,
    path: '/smarttoken',
    name: 'Manage Smart Token',
    messageId: 'manageSmartToken',
    state: 'openSmartToken',
    icon: BusinessCenter,
    views: [
      {
        path: '/smarttoken/create',
        name: 'Create Smart Token',
        messageId: 'createSmartToken',
        mini: 'CST',
        component: TokenCreate,
      },
      {
        path: '/smarttoken/setposition',
        name: 'Set Position Smart Token',
        messageId: 'setPositionSmartToken',
        mini: 'SPST',
        component: SmartTokenSetPosition,
      },
      {
        path: '/smarttoken/transfer',
        name: 'Transfer Smart Token',
        messageId: 'transferSmartToken',
        mini: 'TST',
        component: SmartTokenTransfer,
      },
      {
        path: '/smarttoken/exchange',
        name: 'Exchange Smart Token',
        messageId: 'exchangeSmartToken',
        mini: 'EST',
        component: SmartTokenExchange,
      },
      {
        path: '/smarttoken/issue',
        name: 'Issue Smart Token',
        messageId: 'issueSmartToken',
        mini: 'IST',
        component: SmartTokenIssue,
      },
      {
        path: '/smarttoken/share',
        name: 'Share Smart Token',
        messageId: 'shareSmartToken',
        mini: 'SST',
        component: SmartTokenShare,
      },
      {
        path: '/smarttoken/retire',
        name: 'Retire Smart Token',
        messageId: 'retireSmartToken',
        mini: 'RST',
        component: SmartTokenRetire,
      },
      {
        path: '/smarttoken/lock',
        name: 'Lock Smart Token',
        messageId: 'lockSmartToken',
        mini: 'LST',
        component: SmartTokenLock,
      },
      {
        path: '/smarttoken/unlock',
        name: 'Unlock Smart Token',
        messageId: 'unlockSmartToken',
        mini: 'UST',
        component: SmartTokenUnLock,
      },
      {
        path: '/smarttoken/destroy',
        name: 'Destroy Smart Token',
        messageId: 'destroySmartToken',
        mini: 'DST',
        component: SmartTokenDestroy,
      },
      {
        path: '/smarttoken/close',
        name: 'Close Smart Token',
        messageId: 'closeSmartToken',
        mini: 'CST',
        component: SmartTokenClose,
      },
    ],
  },
  {
    collapse: true,
    path: '/contractwallet',
    name: 'Manage Contract Wallet',
    messageId: 'manageContractWallet',
    state: 'openContractWallet',
    icon: AccountBalanceWallet,
    views: [
      {
        path: '/contractwallet/recharge',
        name: 'Contract Wallet Recharge',
        messageId: 'contractWalletRecharge',
        mini: 'RCA',
        component: ContractWalletRecharge,
      },
      {
        path: '/contractwallet/extract',
        name: 'Contract Wallet Extract',
        messageId: 'contractWalletExtract',
        mini: 'ECA',
        component: ContractWalletExtract,
      },
      {
        path: '/contractwallet/transfer',
        name: 'Contract Wallet Transfer',
        messageId: 'contractWalletTransfer',
        mini: 'TCA',
        component: ContractWalletTransfer,
      },
    ],
  },
  {
    collapse: true,
    path: '/vote',
    name: 'Manage Voting',
    messageId: 'manageVoting',
    state: 'openVote',
    icon: AssignmentTurnedIn,
    views: [
      {
        path: '/vote/producers',
        name: 'Vote Producers',
        messageId: 'voteProducers',
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
        messageId: 'setProxy',
        mini: 'SP',
        component: SetProxy,
      },
      {
        path: '/vote/createproxy',
        name: 'Create Proxy',
        messageId: 'createProxy',
        mini: 'CP',
        component: CreateProxy,
      },
      {
        path: '/vote/resignproxy',
        name: 'Resign Proxy',
        messageId: 'resignProxy',
        mini: 'RP',
        component: ResignProxy,
      },
    ],
  },
  {
    collapse: true,
    path: '/community',
    name: 'Community Features',
    messageId: 'communityFeatures',
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
        messageId: 'premiumNames',
        mini: 'PN',
        component: BidName,
      },
    ],
  },
  {
    collapse: true,
    path: '/multisig',
    name: 'Multisig Transactions',
    messageId: 'multisigTransactions',
    state: 'openMultisig',
    icon: VpnKey,
    views: [
      {
        path: '/multisig/create',
        name: 'Create Transaction',
        messageId: 'createTransaction',
        mini: 'CT',
        component: MultisigCreate,
      },
      {
        path: '/multisig/sign',
        name: 'Sign Transaction',
        messageId: 'signTransaction',
        mini: 'ST',
        component: MultisigSign,
      },
      {
        path: '/multisig/push',
        name: 'Push Transaction',
        messageId: 'pushTransaction',
        mini: 'PT',
        component: MultisigPush,
      },
    ],
  },
  {
    collapse: true,
    path: '/block-producer',
    name: 'Block Producer',
    messageId: 'blockProducer',
    state: 'openBlockProducer',
    icon: DeveloperBoard,
    views: [
      {
        path: '/block-producer/claim-rewards',
        name: 'Claim Rewards',
        messageId: 'claimRewards',
        mini: 'CR',
        component: ClaimRewards,
      },
      {
        path: '/block-producer/set-producer-json',
        name: 'Set Producer Json',
        messageId: 'setProducerJson',
        mini: 'SPJ',
        component: ProducerJson,
      },
    ],
  },
  { redirect: true, path: '/', pathTo: '/home', name: 'Home' },
  { redirect: true, path: '/account/buyram', pathTo: '/account/ram', name: 'Buy RAM' },
  { redirect: true, path: '/account/sellram', pathTo: '/account/ram', name: 'Sell RAM' },
];
export default dashRoutes;
