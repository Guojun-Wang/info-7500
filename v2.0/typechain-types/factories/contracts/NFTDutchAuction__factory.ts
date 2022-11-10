/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NFTDutchAuction,
  NFTDutchAuctionInterface,
} from "../../contracts/NFTDutchAuction";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bid",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_erc721TokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_nftTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numBlocksAuctionOpen",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_offerPriceDecrement",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600f81526020017f4e4654447574636841756374696f6e00000000000000000000000000000000008152506040518060400160405280600381526020017f4e4654000000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000324565b508060019081620000a1919062000324565b5050506200040b565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200012c57607f821691505b602082108103620001425762000141620000e4565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001ac7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200016d565b620001b886836200016d565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000205620001ff620001f984620001d0565b620001da565b620001d0565b9050919050565b6000819050919050565b6200022183620001e4565b6200023962000230826200020c565b8484546200017a565b825550505050565b600090565b6200025062000241565b6200025d81848462000216565b505050565b5b8181101562000285576200027960008262000246565b60018101905062000263565b5050565b601f821115620002d4576200029e8162000148565b620002a9846200015d565b81016020851015620002b9578190505b620002d1620002c8856200015d565b83018262000262565b50505b505050565b600082821c905092915050565b6000620002f960001984600802620002d9565b1980831691505092915050565b6000620003148383620002e6565b9150826002028217905092915050565b6200032f82620000aa565b67ffffffffffffffff8111156200034b576200034a620000b5565b5b62000357825462000113565b6200036482828562000289565b600060209050601f8311600181146200039c576000841562000387578287015190505b62000393858262000306565b86555062000403565b601f198416620003ac8662000148565b60005b82811015620003d657848901518255600182019150602085019450602081019050620003af565b86831015620003f65784890151620003f2601f891682620002e6565b8355505b6001600288020188555050505b505050505050565b61340f806200041b6000396000f3fe6080604052600436106100fe5760003560e01c80634bb278f311610095578063a22cb46511610064578063a22cb46514610326578063b88d4fde1461034f578063c87b56dd14610378578063e985e9c5146103b5578063f92ad219146103f2576100fe565b80634bb278f31461026a5780636352211e1461028157806370a08231146102be57806395d89b41146102fb576100fe565b80631998aeef116100d15780631998aeef146101d157806323b872dd146101ef578063278ecde11461021857806342842e0e14610241576100fe565b806301ffc9a71461010357806306fdde0314610140578063081812fc1461016b578063095ea7b3146101a8575b600080fd5b34801561010f57600080fd5b5061012a600480360381019061012591906120e6565b61041b565b604051610137919061212e565b60405180910390f35b34801561014c57600080fd5b506101556104fd565b60405161016291906121d9565b60405180910390f35b34801561017757600080fd5b50610192600480360381019061018d9190612231565b61058f565b60405161019f919061229f565b60405180910390f35b3480156101b457600080fd5b506101cf60048036038101906101ca91906122e6565b6105d5565b005b6101d96106ec565b6040516101e6919061229f565b60405180910390f35b3480156101fb57600080fd5b5061021660048036038101906102119190612326565b610891565b005b34801561022457600080fd5b5061023f600480360381019061023a9190612231565b6108f1565b005b34801561024d57600080fd5b5061026860048036038101906102639190612326565b610a62565b005b34801561027657600080fd5b5061027f610a82565b005b34801561028d57600080fd5b506102a860048036038101906102a39190612231565b610c8a565b6040516102b5919061229f565b60405180910390f35b3480156102ca57600080fd5b506102e560048036038101906102e09190612379565b610d10565b6040516102f291906123b5565b60405180910390f35b34801561030757600080fd5b50610310610dc7565b60405161031d91906121d9565b60405180910390f35b34801561033257600080fd5b5061034d600480360381019061034891906123fc565b610e59565b005b34801561035b57600080fd5b5061037660048036038101906103719190612571565b610e6f565b005b34801561038457600080fd5b5061039f600480360381019061039a9190612231565b610ed1565b6040516103ac91906121d9565b60405180910390f35b3480156103c157600080fd5b506103dc60048036038101906103d791906125f4565b610f39565b6040516103e9919061212e565b60405180910390f35b3480156103fe57600080fd5b5061041960048036038101906104149190612634565b610fcd565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104e657507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806104f657506104f5826111e2565b5b9050919050565b60606000805461050c906126de565b80601f0160208091040260200160405190810160405280929190818152602001828054610538906126de565b80156105855780601f1061055a57610100808354040283529160200191610585565b820191906000526020600020905b81548152906001019060200180831161056857829003601f168201915b5050505050905090565b600061059a8261124c565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006105e082610c8a565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610650576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064790612781565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661066f611297565b73ffffffffffffffffffffffffffffffffffffffff16148061069e575061069d81610698611297565b610f39565b5b6106dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d490612813565b60405180910390fd5b6106e7838361129f565b505050565b6000600f60009054906101000a900460ff161561073e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107359061287f565b60405180910390fd5b600b5460095461074e91906128ce565b431061078f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107869061294e565b60405180910390fd5b43600b546009546107a091906128ce565b6107aa919061296e565b600c546107b791906129a2565b600a546107c491906128ce565b341015610806576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fd90612a56565b60405180910390fd5b6001600f60006101000a81548160ff02191690831515021790555033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600e81905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6108a261089c611297565b82611358565b6108e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d890612ae8565b60405180910390fd5b6108ec8383836113ed565b505050565b600f60009054906101000a900460ff16610940576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093790612b54565b60405180910390fd5b600f60019054906101000a900460ff1615610990576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098790612bc0565b60405180910390fd5b6000819050600e548111156109da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d190612c52565b60405180910390fd5b6001600f60016101000a81548160ff021916908315150217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610a5d573d6000803e3d6000fd5b505050565b610a7d83838360405180602001604052806000815250610e6f565b505050565b600f60009054906101000a900460ff16610ad1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac890612b54565b60405180910390fd5b600f60019054906101000a900460ff1615610b21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1890612cbe565b60405180910390fd5b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba890612d50565b60405180910390fd5b6001600f60016101000a81548160ff021916908315150217905550600660029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600e549081150290604051600060405180830381858888f19350505050158015610c36573d6000803e3d6000fd5b50610c88600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600d54610891565b565b600080610c96836116e6565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d07576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cfe90612dbc565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7790612e4e565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060018054610dd6906126de565b80601f0160208091040260200160405190810160405280929190818152602001828054610e02906126de565b8015610e4f5780601f10610e2457610100808354040283529160200191610e4f565b820191906000526020600020905b815481529060010190602001808311610e3257829003601f168201915b5050505050905090565b610e6b610e64611297565b8383611723565b5050565b610e80610e7a611297565b83611358565b610ebf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb690612ae8565b60405180910390fd5b610ecb8484848461188f565b50505050565b6060610edc8261124c565b6000610ee66118eb565b90506000815111610f065760405180602001604052806000815250610f31565b80610f1084611902565b604051602001610f21929190612eaa565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000600660019054906101000a900460ff1615905080801561100157506001600660009054906101000a900460ff1660ff16105b806110305750611010306119d0565b15801561102f57506001600660009054906101000a900460ff1660ff16145b5b61106f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106690612f40565b60405180910390fd5b6001600660006101000a81548160ff021916908360ff16021790555080156110ad576001600660016101000a81548160ff0219169083151502179055505b83600a8190555082600b8190555081600c8190555033600660026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504360098190555084600d8190555085600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611180600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600d546119f3565b80156111da576000600660016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516111d19190612fb2565b60405180910390a15b505050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b61125581611c10565b611294576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161128b90612dbc565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661131283610c8a565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061136483610c8a565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806113a657506113a58185610f39565b5b806113e457508373ffffffffffffffffffffffffffffffffffffffff166113cc8461058f565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661140d82610c8a565b73ffffffffffffffffffffffffffffffffffffffff1614611463576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145a9061303f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036114d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114c9906130d1565b60405180910390fd5b6114df8383836001611c51565b8273ffffffffffffffffffffffffffffffffffffffff166114ff82610c8a565b73ffffffffffffffffffffffffffffffffffffffff1614611555576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161154c9061303f565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46116e18383836001611d77565b505050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611791576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117889061313d565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611882919061212e565b60405180910390a3505050565b61189a8484846113ed565b6118a684848484611d7d565b6118e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118dc906131cf565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606000600161191184611f04565b01905060008167ffffffffffffffff8111156119305761192f612446565b5b6040519080825280601f01601f1916602001820160405280156119625781602001600182028036833780820191505090505b509050600082602001820190505b6001156119c5578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816119b9576119b86131ef565b5b04945060008503611970575b819350505050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611a62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a599061326a565b60405180910390fd5b611a6b81611c10565b15611aab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aa2906132d6565b60405180910390fd5b611ab9600083836001611c51565b611ac281611c10565b15611b02576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611af9906132d6565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611c0c600083836001611d77565b5050565b60008073ffffffffffffffffffffffffffffffffffffffff16611c32836116e6565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b6001811115611d7157600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611ce55780600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611cdd919061296e565b925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614611d705780600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611d6891906128ce565b925050819055505b5b50505050565b50505050565b6000611d9e8473ffffffffffffffffffffffffffffffffffffffff16612057565b15611ef7578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611dc7611297565b8786866040518563ffffffff1660e01b8152600401611de9949392919061334b565b6020604051808303816000875af1925050508015611e2557506040513d601f19601f82011682018060405250810190611e2291906133ac565b60015b611ea7573d8060008114611e55576040519150601f19603f3d011682016040523d82523d6000602084013e611e5a565b606091505b506000815103611e9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e96906131cf565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611efc565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611f62577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611f5857611f576131ef565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611f9f576d04ee2d6d415b85acef81000000008381611f9557611f946131ef565b5b0492506020810190505b662386f26fc100008310611fce57662386f26fc100008381611fc457611fc36131ef565b5b0492506010810190505b6305f5e1008310611ff7576305f5e1008381611fed57611fec6131ef565b5b0492506008810190505b612710831061201c576127108381612012576120116131ef565b5b0492506004810190505b6064831061203f5760648381612035576120346131ef565b5b0492506002810190505b600a831061204e576001810190505b80915050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6120c38161208e565b81146120ce57600080fd5b50565b6000813590506120e0816120ba565b92915050565b6000602082840312156120fc576120fb612084565b5b600061210a848285016120d1565b91505092915050565b60008115159050919050565b61212881612113565b82525050565b6000602082019050612143600083018461211f565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612183578082015181840152602081019050612168565b60008484015250505050565b6000601f19601f8301169050919050565b60006121ab82612149565b6121b58185612154565b93506121c5818560208601612165565b6121ce8161218f565b840191505092915050565b600060208201905081810360008301526121f381846121a0565b905092915050565b6000819050919050565b61220e816121fb565b811461221957600080fd5b50565b60008135905061222b81612205565b92915050565b60006020828403121561224757612246612084565b5b60006122558482850161221c565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006122898261225e565b9050919050565b6122998161227e565b82525050565b60006020820190506122b46000830184612290565b92915050565b6122c38161227e565b81146122ce57600080fd5b50565b6000813590506122e0816122ba565b92915050565b600080604083850312156122fd576122fc612084565b5b600061230b858286016122d1565b925050602061231c8582860161221c565b9150509250929050565b60008060006060848603121561233f5761233e612084565b5b600061234d868287016122d1565b935050602061235e868287016122d1565b925050604061236f8682870161221c565b9150509250925092565b60006020828403121561238f5761238e612084565b5b600061239d848285016122d1565b91505092915050565b6123af816121fb565b82525050565b60006020820190506123ca60008301846123a6565b92915050565b6123d981612113565b81146123e457600080fd5b50565b6000813590506123f6816123d0565b92915050565b6000806040838503121561241357612412612084565b5b6000612421858286016122d1565b9250506020612432858286016123e7565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61247e8261218f565b810181811067ffffffffffffffff8211171561249d5761249c612446565b5b80604052505050565b60006124b061207a565b90506124bc8282612475565b919050565b600067ffffffffffffffff8211156124dc576124db612446565b5b6124e58261218f565b9050602081019050919050565b82818337600083830152505050565b600061251461250f846124c1565b6124a6565b9050828152602081018484840111156125305761252f612441565b5b61253b8482856124f2565b509392505050565b600082601f8301126125585761255761243c565b5b8135612568848260208601612501565b91505092915050565b6000806000806080858703121561258b5761258a612084565b5b6000612599878288016122d1565b94505060206125aa878288016122d1565b93505060406125bb8782880161221c565b925050606085013567ffffffffffffffff8111156125dc576125db612089565b5b6125e887828801612543565b91505092959194509250565b6000806040838503121561260b5761260a612084565b5b6000612619858286016122d1565b925050602061262a858286016122d1565b9150509250929050565b600080600080600060a086880312156126505761264f612084565b5b600061265e888289016122d1565b955050602061266f8882890161221c565b94505060406126808882890161221c565b93505060606126918882890161221c565b92505060806126a28882890161221c565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806126f657607f821691505b602082108103612709576127086126af565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061276b602183612154565b91506127768261270f565b604082019050919050565b6000602082019050818103600083015261279a8161275e565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006127fd603d83612154565b9150612808826127a1565b604082019050919050565b6000602082019050818103600083015261282c816127f0565b9050919050565b7f54686520636f6d6d6f6469747920686173206265656e20626f75676874000000600082015250565b6000612869601d83612154565b915061287482612833565b602082019050919050565b600060208201905081810360008301526128988161285c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006128d9826121fb565b91506128e4836121fb565b92508282019050808211156128fc576128fb61289f565b5b92915050565b7f6f7574206f6620626c6f636b206e756d62657200000000000000000000000000600082015250565b6000612938601383612154565b915061294382612902565b602082019050919050565b600060208201905081810360008301526129678161292b565b9050919050565b6000612979826121fb565b9150612984836121fb565b925082820390508181111561299c5761299b61289f565b5b92915050565b60006129ad826121fb565b91506129b8836121fb565b92508282026129c6816121fb565b915082820484148315176129dd576129dc61289f565b5b5092915050565b7f596f75722076616c7565206973206c6f776572207468616e207265736572766560008201527f5072696365000000000000000000000000000000000000000000000000000000602082015250565b6000612a40602583612154565b9150612a4b826129e4565b604082019050919050565b60006020820190508181036000830152612a6f81612a33565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612ad2602d83612154565b9150612add82612a76565b604082019050919050565b60006020820190508181036000830152612b0181612ac5565b9050919050565b7f7468652061756374696f6e20697320676f696e67000000000000000000000000600082015250565b6000612b3e601483612154565b9150612b4982612b08565b602082019050919050565b60006020820190508181036000830152612b6d81612b31565b9050919050565b7f7468652061756374696f6e206861732073746f70706564000000000000000000600082015250565b6000612baa601783612154565b9150612bb582612b74565b602082019050919050565b60006020820190508181036000830152612bd981612b9d565b9050919050565b7f726566756e64206d757374206c6f776572207468616e2077696e6e696e67426960008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b6000612c3c602183612154565b9150612c4782612be0565b604082019050919050565b60006020820190508181036000830152612c6b81612c2f565b9050919050565b7f7468652061756374696f6e206861732066696e616c697a656400000000000000600082015250565b6000612ca8601983612154565b9150612cb382612c72565b602082019050919050565b60006020820190508181036000830152612cd781612c9b565b9050919050565b7f73656e6465722041646472657373206f73206e6f7420657175616c20746f207760008201527f696e6e6572416464726573730000000000000000000000000000000000000000602082015250565b6000612d3a602c83612154565b9150612d4582612cde565b604082019050919050565b60006020820190508181036000830152612d6981612d2d565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000612da6601883612154565b9150612db182612d70565b602082019050919050565b60006020820190508181036000830152612dd581612d99565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612e38602983612154565b9150612e4382612ddc565b604082019050919050565b60006020820190508181036000830152612e6781612e2b565b9050919050565b600081905092915050565b6000612e8482612149565b612e8e8185612e6e565b9350612e9e818560208601612165565b80840191505092915050565b6000612eb68285612e79565b9150612ec28284612e79565b91508190509392505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612f2a602e83612154565b9150612f3582612ece565b604082019050919050565b60006020820190508181036000830152612f5981612f1d565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000612f9c612f97612f9284612f60565b612f77565b612f6a565b9050919050565b612fac81612f81565b82525050565b6000602082019050612fc76000830184612fa3565b92915050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000613029602583612154565b915061303482612fcd565b604082019050919050565b600060208201905081810360008301526130588161301c565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006130bb602483612154565b91506130c68261305f565b604082019050919050565b600060208201905081810360008301526130ea816130ae565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000613127601983612154565b9150613132826130f1565b602082019050919050565b600060208201905081810360008301526131568161311a565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006131b9603283612154565b91506131c48261315d565b604082019050919050565b600060208201905081810360008301526131e8816131ac565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000613254602083612154565b915061325f8261321e565b602082019050919050565b6000602082019050818103600083015261328381613247565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b60006132c0601c83612154565b91506132cb8261328a565b602082019050919050565b600060208201905081810360008301526132ef816132b3565b9050919050565b600081519050919050565b600082825260208201905092915050565b600061331d826132f6565b6133278185613301565b9350613337818560208601612165565b6133408161218f565b840191505092915050565b60006080820190506133606000830187612290565b61336d6020830186612290565b61337a60408301856123a6565b818103606083015261338c8184613312565b905095945050505050565b6000815190506133a6816120ba565b92915050565b6000602082840312156133c2576133c1612084565b5b60006133d084828501613397565b9150509291505056fea26469706673582212205f5599749e0b9d688973b0be10ac0c7c5cc85951d1dcb8f623d8590a012e2d4064736f6c63430008110033";

type NFTDutchAuctionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTDutchAuctionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTDutchAuction__factory extends ContractFactory {
  constructor(...args: NFTDutchAuctionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTDutchAuction> {
    return super.deploy(overrides || {}) as Promise<NFTDutchAuction>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NFTDutchAuction {
    return super.attach(address) as NFTDutchAuction;
  }
  override connect(signer: Signer): NFTDutchAuction__factory {
    return super.connect(signer) as NFTDutchAuction__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTDutchAuctionInterface {
    return new utils.Interface(_abi) as NFTDutchAuctionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTDutchAuction {
    return new Contract(address, _abi, signerOrProvider) as NFTDutchAuction;
  }
}
