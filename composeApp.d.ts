type Nullable<T> = T | null | undefined
export declare function main(): void;
export declare function connectionLost(message: Nullable<string>): void;
export declare function messageArrived(topic: Nullable<string>, message: Nullable<string>): void;
export declare function connectComplete(): void;