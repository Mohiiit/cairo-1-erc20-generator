import { useContract, useAccount, useNetwork, useContractWrite } from "@starknet-react/core";
import { useMemo } from "react";

const testAddress = "0x019e04d260470125f759e06d8b38a1bf96a11a71416418ecc49eee7f353afae5";

const abi = [
    {
      "type": "impl",
      "name": "ERC20Factory",
      "interface_name": "cairo_1_erc20_generator::erc20_factory::IERC20Factory"
    },
    {
      "type": "struct",
      "name": "core::integer::u256",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "type": "interface",
      "name": "cairo_1_erc20_generator::erc20_factory::IERC20Factory",
      "items": [
        {
          "type": "function",
          "name": "deploy_new_token",
          "inputs": [
            {
              "name": "name",
              "type": "core::felt252"
            },
            {
              "name": "symbol",
              "type": "core::felt252"
            },
            {
              "name": "initial_supply",
              "type": "core::integer::u256"
            },
            {
              "name": "recipient",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "type": "event",
      "name": "cairo_1_erc20_generator::erc20_factory::ERC20Factory::Event",
      "kind": "enum",
      "variants": []
    }
  ]

  export default function CreateToken() {
    const { address } = useAccount();
	const { chain } = useNetwork();
    const { contract } = useContract({ abi: abi, address: testAddress })

    const calls = useMemo(() => {
		if (!address || !contract) return [];
		return contract.populateTransaction["deploy_new_token"]("testing", "someSYM", 100000, address);
	}, [contract, address]);

    // const calls = useMemo(() => {
    //     const tx = {
    //       contractAddress: '0x019e04d260470125f759e06d8b38a1bf96a11a71416418ecc49eee7f353afae5',
    //       entrypoint: 'deploy_new_tokrn',
    //       calldata: ["testing", "someSYM", 100000, address]
    //     };
    //     return Array(count).fill(tx);
    //   }, [address, ]);

    const {
		writeAsync,
		data, isLoading, error, refetch 
	} = useContractWrite({
		calls,
	});


    return (
        <div>
            {contract?.address}
            <button onClick={() => writeAsync()}>Mint me a test token</button>
			<p>status: {isLoading && <div>Submitting...</div>}</p>
            <p>status: {error && <div>error hre... {error.message}</div>}</p>
			<p>hash: {data?.transaction_hash}</p>
        </div>
    )
}
