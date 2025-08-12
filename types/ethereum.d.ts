import { Eip1193Provider } from 'ethers';

declare global {
  interface Window {
    ethereum: Eip1193Provider & {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: Function) => void;
      removeListener: (event: string, callback: Function) => void;
      selectedAddress: string | null;
      isMetaMask?: boolean;
    };
  }
}
