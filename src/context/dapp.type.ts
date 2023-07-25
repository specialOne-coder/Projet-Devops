export type DappContextType = {
    magicPkh: string;
    beaconPkh: string;
    connect: (type: string, wallet: string) => void;
    disconnect: (type: string, wallet: string) => void;
};

export interface DappProviderProps {
    children: React.ReactNode
}
