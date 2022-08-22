import { ethers } from "ethers";

import Contrats from "./contract.json";

const supportChainId = 1666600000;

const RPCS = {
    1666600000: "https://api.harmony.one/",
}

const providers = {
    1666600000: new ethers.providers.JsonRpcProvider(RPCS[1666600000]),
    // 417: new ethers.providers.JsonRpcProvider(RPCS[417]),
    // 1337: new ethers.providers.JsonRpcProvider(RPCS[1337]),
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337])
}

// const portalContract = new ethers.Contract(Contrats.portalcontract.address, Contrats.portalcontract.abi, providers[supportChainId]);

export {
    supportChainId,
    // portalContract,
    providers,
    Contrats
}