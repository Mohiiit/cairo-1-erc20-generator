use starknet::{ContractAddress, get_caller_address, get_execution_info};
#[starknet::interface]
trait IERC20Factory<TContractState> {
    fn deploy_new_token(
        ref self: TContractState,
        name: felt252,
        symbol: felt252,
        initial_supply: u256,
        recipient: ContractAddress
    );
}
#[starknet::contract]
mod ERC20Factory {
    use core::option::OptionTrait;
    use starknet::{
        ContractAddress, get_caller_address, ClassHash, class_hash_const, Felt252TryIntoClassHash
    };
    use starknet::syscalls::{deploy_syscall};
    use debug::PrintTrait;

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
            ref self: ContractState,
            name: felt252,
            symbol: felt252,
            initial_supply: u256,
            recipient: ContractAddress
        ) {
            let initial_supply_low = initial_supply.low;
            let initial_supply_high = initial_supply.high;
            let mut calldata = array![name, symbol, initial_supply_low.into(), initial_supply_high.into() ,recipient.into()];
            let (new_contract_address, _) = deploy_syscall(
                self.erc20_class_hash.read(), 0, calldata.span(), false
            )
                .expect('failed to deploy counter');

            new_contract_address.print();
        }
    }
}
