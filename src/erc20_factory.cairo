use starknet::{ContractAddress, get_caller_address, get_execution_info};
#[starknet::interface]
trait IERC20Factory<TContractState> {
    fn deploy_new_token(ref self: TContractState, initial_supply: u256, recipient: ContractAddress);
}
#[starknet::contract]
mod ERC20Factory {
    use core::option::OptionTrait;
    use starknet::{
        ContractAddress, get_caller_address, ClassHash, class_hash_const, Felt252TryIntoClassHash
    };
    use starknet::syscalls::{deploy_syscall};

    #[storage]
    struct Storage {
        erc20_class_hash: ClassHash
    }

    #[constructor]
    fn constructor(ref self: ContractState, class_hash: ClassHash) {
        self.erc20_class_hash.write(class_hash);
    }

    #[external(v0)]
    impl ERC20Factory of super::IERC20Factory<ContractState> {
        fn deploy_new_token(
            ref self: ContractState, initial_supply: u256, recipient: ContractAddress
        ) {
            // let class_hash: ClassHash = Felt252TryIntoClassHash::try_into('0x0444f1e0781b82c1af09fc82c01f21329f01ea2b9bc5ccedf2280a161a2a4982').unwrap();

            let mut calldata = array![initial_supply.try_into().unwrap(), recipient.into()];
            let (new_contract_address, _) = deploy_syscall(
                self.erc20_class_hash.read(), 0, calldata.span(), false
            )
                .expect('failed to deploy counter');
        }
    }
}
