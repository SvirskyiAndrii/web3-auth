// export interface IWeb3NeyraAuth {
//   apiConfigs: any;
//   history: any;
//   onboard: any;
//   savePubKey: any;
//   setSignatureError: any;
//   setIsConnecting: any;
//   signMessage: any;
//   handlers: any;
//   callback: any;
// }

export interface IWeb3NeyraAuth {
  apiConfigs: {
    API_SIGN_IN_METAMASK: string;
    REACT_APP_UNSTOPPABLE_CLIENT_ID: string;
    API_AUTH: string;
  };
  history: any;
  onboard: {
    connect?: () => Promise<WalletConnection[]>;
    disconnect?: (wallet: WalletConnection) => void;
    wallet?: WalletConnection;
    account?: string;
  };
  savePubKey: (address: string, publicKey: string) => void;
  setSignatureError: (error: string) => void;
  signMessage: (
    setError: (error: string) => void,
    provider: any
  ) => Promise<SignedMessage>;
  handlers: string[];
  callback: Callback;
}
type CallbackTypeNames =
  | 'onSuccess'
  | 'onError'
  | 'handleSignUp'
  | 'addNotification';
type Callback = ({
  type,
  params,
}: {
  type: CallbackTypeNames;
  params: any;
}) => void;
interface WalletConnection {
  provider: any;
  label: string;
  accounts: {
    address: string;
  }[];
}

interface SignedMessage {
  signature: string;
}
